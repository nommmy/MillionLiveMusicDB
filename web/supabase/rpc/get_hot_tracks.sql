-- 前提：
-- ・キャラ詳細画面のパスはアーティストIDでdynamic routing
-- ・spotifyのキャラ名に表記ユレがあり、表記が違うとidも異なる
-- ・これによりtrack情報に付随するアーティストIDもぶれがあり、そのまま使うと同一人物のキャラ詳細ページが異なるIDで２つ存在することになりSEOに影響
-- ・以下クエリは表記ゆれがある場合に、一意に定めた正しい方にIDを変換する処理を行っている
-- ・trackに付随するアーティストIDがtext[]型であるためちょっとややこしいことをやっている

CREATE OR REPLACE FUNCTION get_hot_tracks (limits integer) RETURNS TABLE (
  track_id varchar,
  track_name varchar,
  preview_url text,
  artist_names varchar[],
  artist_ids varchar[],
  album_name text,
  album_image_url text,
  artists json
) AS $$
BEGIN
    RETURN QUERY
    -- mcu:
    -- ユニット情報とキャラ情報を結合し、ユニットIDを取得
    -- trackのアーティストIDにキャラのIDではなく、ユニットとしてのIDが入っていることがあるため。completed_tracksではunique_flgがfalseのやつはもうないのでこの時点で絞ってOK
    -- character_self_mapping:
    -- 名前一致するもので変換表作成、unique_flgがtrueのものを正とする
    -- tmp_mt:
    -- 変換表とtrackのアーティストIDを結合させて、変換先があるやつはそっちを採用。unnestで配列を行にバラす
    -- completed_tracks:
    -- バラしたやつをtrack_idでgroup byして再度集計。minしたときなぜかvarcharがtext型になったりしたから変換
    WITH mcu AS (
        select mc.artist_id, mc.character_name, mc.image_6th, mc.image_favorite, mc.image_uniform, mc.color, mc.unique_flg, mu.unit_id
        from mst_characters mc left join mst_units mu ON mc.artist_id = mu.character_id
        where mc.unique_flg is true
    ), character_self_mapping AS (
        select tmp_from.artist_id as artist_id_from, tmp_to.artist_id as artist_id_to
        from mst_characters tmp_from join mst_characters tmp_to on tmp_from.character_name = tmp_to.character_name
        where tmp_from.unique_flg is false and tmp_to.unique_flg is true
    ), tmp_mt AS (
    select
      mst_tracks.track_id, mst_tracks.track_name, mst_tracks.preview_url, mst_tracks.artist_names, mst_tracks.album_id, mst_tracks.popularity,
      ARRAY[
            CASE
                WHEN character_self_mapping.artist_id_to IS NULL THEN artist_id
                ELSE character_self_mapping.artist_id_to
            END
        ] as artist_ids
      from
        mst_tracks, unnest(mst_tracks.artist_ids) as artist_id
        left join character_self_mapping on artist_id = character_self_mapping.artist_id_from
    ),completed_tracks AS (
        select 
            tmp_mt.track_id, 
            CAST(min(tmp_mt.track_name) AS character varying) as track_name, 
            min(tmp_mt.preview_url) as preview_url, 
            CAST(min(tmp_mt.artist_names) AS character varying[]) as artist_names, 
            min(tmp_mt.album_id) as album_id, 
            min(tmp_mt.popularity) as popularity, 
            array_agg(artist_ids_all) as artist_ids 
        from tmp_mt, unnest(tmp_mt.artist_ids) as artist_ids_all 
        group by tmp_mt.track_id
    )
    SELECT 
        mt.track_id, 
        mt.track_name, 
        mt.preview_url,
        mt.artist_names,
        mt.artist_ids,
        ma.name as album_name, 
        ma.album_image_url,
        artists.artists
    FROM 
        completed_tracks mt
        LEFT JOIN
        mst_albums ma ON mt.album_id = ma.album_id
        LEFT JOIN
        lateral (
            select json_agg(artists_attr) as artists
            from (
                select artist_id, min(character_name) as character_name, min(image_6th) as image_6th, min(image_favorite) as image_favorite, min(image_uniform) as image_uniform, min(color) as color
                from unnest(mt.artist_ids) as artist_id_all
                join mcu ON mcu.artist_id = artist_id_all or mcu.unit_id = artist_id_all
                group by artist_id
            ) as artists_attr
        ) as artists ON true
    ORDER BY mt.popularity desc
    LIMIT limits;
END;
$$ LANGUAGE plpgsql;