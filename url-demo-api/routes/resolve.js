const express = require("express");

const resolveRouter = (shortener) => {
  const router = express.Router();

  /**
   * GET /resolve/:alias
   * Response: { resolvedUrl: string } | 404 if not found or expired
   */
  router.get("/:alias", async (req, res) => {
    const { alias } = req.params;

    try {
      const resolvedUrl = await shortener.resolve(alias);

      if (!resolvedUrl) {
        return res.status(404).json({ error: "Alias not found or expired." });
      }

      res.json({ resolvedUrl });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};

module.exports = resolveRouter;
