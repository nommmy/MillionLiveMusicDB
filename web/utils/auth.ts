import jwt from "jsonwebtoken";

let cachedToken: string | null = null;
let tokenExpiration = 0;

export const getAppleMusicToken = (): string => {
  if (cachedToken && Date.now() < tokenExpiration) {
    return cachedToken;
  }

  const teamId = process.env.APPLE_MUSIC_TEAM_ID!;
  const keyId = process.env.APPLE_MUSIC_KEY_ID!;
  const privateKey = process.env.APPLE_MUSIC_PRIVATE_KEY!.replace(
    /\\n/g,
    "\n"
  );

  const now = Math.floor(Date.now() / 1000);
  const exp = now + 60 * 60 * 24 * 180; // 180日

  const token = jwt.sign({ iss: teamId, iat: now, exp }, privateKey, {
    algorithm: "ES256",
    header: {
      alg: "ES256",
      kid: keyId,
    },
  });

  cachedToken = token;
  tokenExpiration = exp * 1000;

  return token;
};
