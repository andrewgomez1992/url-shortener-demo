const express = require("express");

const alistRouter = (shortener) => {
  const router = express.Router();

  // GET /list => returns { active: {}, expired: {} }
  router.get("/", async (req, res) => {
    try {
      const all = await shortener.store.list();
      if (!all) {
        return res.json({ active: {}, expired: {} });
      }

      const now = Date.now();
      const active = {};
      const expired = {};

      for (const [alias, entry] of Object.entries(all)) {
        if (entry.expiresAt && now > entry.expiresAt) {
          expired[alias] = entry;
        } else {
          active[alias] = entry;
        }
      }

      res.json({ active, expired });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};

module.exports = alistRouter;
