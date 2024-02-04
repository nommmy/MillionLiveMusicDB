export const siteName = "MILLIONLIVE MUSIC DB";
export const description =
  "THE IDOLM@STER MILLIONLIVE!の楽曲とキャラクターの魅力を知るための非公式ファンサイトです。バラエティ豊かな楽曲を試聴したりキャラクターのプロフィールやイラストを閲覧したりすることができます。";
export const url = "https://www.millionlive-music-db.com";

export const openGraphMeta = {
  title: siteName,
  description: description,
  siteName: siteName,
  images: [
    "https://aupeferaibudquqmgdne.supabase.co/storage/v1/object/public/MillionLiveImageBucket/opengraph-image.png",
  ],
  url: url,
  locale: "ja_JP",
  type: "website",
};

export const twitterMeta = {
  card: "summary",
  title: siteName,
  description,
  creator: "@millionlive2",
};
