// routes/shorten.js
import express from "express";

export default function shortenRouter(shortener) {
  const router = express.Router();

  /**
   * POST /shorten
   * Body: { url: string, alias?: string, expiresIn?: string }
   * Response: { shortUrl: string }
   */
  router.post("/", async (req, res) => {
    const { url, alias, expiresIn } = req.body;

    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: 'Missing or invalid "url" field.' });
    }

    try {
      const shortUrl = await shortener.shorten(url, { alias, expiresIn });
      res.json({ shortUrl });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}
