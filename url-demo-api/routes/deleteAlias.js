const express = require("express");

const deleteRouter = (shortener) => {
  const router = express.Router();

  router.delete("/:alias", async (req, res) => {
    const { alias } = req.params;
    console.log("Deleting alias:", alias);

    try {
      const item = await shortener.store.get(alias);
      if (!item) {
        return res.status(404).json({ error: "Alias not found" });
      }

      await shortener.store.delete(alias);
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};

module.exports = deleteRouter;
