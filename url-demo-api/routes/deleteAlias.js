import express from "express";

export default function deleteRouter(shortener) {
  const router = express.Router();

  router.delete("/:alias", async (req, res) => {
    const { alias } = req.params;
    console.log("Deleting alias:", alias);

    try {
      // Check if the alias exists first
      const item = await shortener.store.get(alias);
      if (!item) {
        return res.status(404).json({ error: "Alias not found" });
      }

      // If exists, delete it
      await shortener.store.delete(alias);
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}
