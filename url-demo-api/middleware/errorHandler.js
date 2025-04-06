export function errorHandler(err, req, res, next) {
  console.error("❌ Error:", err.message);

  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  res.status(status).json({ error: message });
}
