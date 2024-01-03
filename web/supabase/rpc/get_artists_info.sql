CREATE OR REPLACE FUNCTION get_artists_info(artist_ids text[])
RETURNS TABLE (
    artist_id varchar,
    character_name varchar,
    image_6th text,
    image_favorite text,
    image_uniform text,
    color varchar,
    unique_flg boolean
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        mc.artist_id,
        mc.character_name,
        mc.image_6th,
        mc.image_favorite,
        mc.image_uniform,
        mc.color,
        mc.unique_flg
    FROM 
        mst_characters mc
        LEFT JOIN
        mst_units mu ON mc.artist_id = mu.character_id
    WHERE 
        mc.character_name IN (SELECT tmp.character_name FROM mst_characters tmp WHERE tmp.artist_id = ANY(artist_ids))
        OR 
        mu.unit_id = ANY(artist_ids)
    GROUP BY
        mc.artist_id;
END;
$$ LANGUAGE plpgsql;
