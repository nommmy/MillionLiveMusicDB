const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
app.use(express.json());

function generateToken() {
  const teamId = process.env.APPLE_MUSIC_TEAM_ID;
  const keyId = process.env.APPLE_MUSIC_KEY_ID;
  const privateKey = process.env.APPLE_MUSIC_PRIVATE_KEY.replace(/\\n/g, "\n");

  const now = Math.floor(Date.now() / 1000);
  return jwt.sign({ iss: teamId, iat: now, exp: now + 60 * 60 * 24 * 180 }, privateKey, {
    algorithm: "ES256",
    header: { alg: "ES256", kid: keyId },
  });
}

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/request", async (req, res) => {
  try {
    const { endpoint } = req.body;
    const token = generateToken();
    const response = await fetch(`https://api.music.apple.com${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    res.json({ status: response.status, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Apple Music Sandbox running on http://localhost:3000");
});
