import express from "express";

export default function shortenRouter(shortener) {
  const router = express.Router();

  /**
   * POST /shorten
   * Body: { url: string, alias?: string, expiresIn?: string, override?: boolean }
   * Response: { shortUrl: string }
   */
  router.post("/", async (req, res) => {
    const { url, alias, expiresIn, override } = req.body; // Extract override from body

    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: 'Missing or invalid "url" field.' });
    }

    try {
      const shortUrl = await shortener.shorten(url, {
        alias,
        expiresIn,
        override,
      });
      res.json({ shortUrl });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}
