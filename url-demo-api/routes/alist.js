// routes/alist.js
import express from "express";

export default function alistRouter(shortener) {
  const router = express.Router();

  // GET /list => returns { active: {}, expired: {} }
  router.get("/", async (req, res) => {
    try {
      // Grab all aliases from the store
      const all = await shortener.store.list();
      if (!all) {
        // In case store.list() is null or undefined, just return empty sets
        return res.json({ active: {}, expired: {} });
      }

      // Current timestamp
      const now = Date.now();

      const active = {};
      const expired = {};

      // Split them into active or expired
      for (const [alias, entry] of Object.entries(all)) {
        if (entry.expiresAt && now > entry.expiresAt) {
          expired[alias] = entry;
        } else {
          active[alias] = entry;
        }
      }

      // Return them separately
      return res.json({ active, expired });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}
