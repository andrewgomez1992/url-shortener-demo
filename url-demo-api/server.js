const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { createClient } = require("redis");
const { RedisStore, URLShortener } = require("@the-node-forge/url-shortener");
const shortenRouter = require("./routes/shorten");
const resolveRouter = require("./routes/resolve");
const alistRouter = require("./routes/alist");
const deleteAlias = require("./routes/deleteAlias");
const { errorHandler } = require("./middleware/errorHandler");

require("dotenv").config();

const app = express();

// ✅ Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(errorHandler);

// ✅ Redis Cloud connection using socket + credentials
const redisClient = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

redisClient.on("error", (err) => console.error("❌ Redis Client Error:", err));

redisClient.connect().then(() => {
  // ✅ Setup URLShortener with RedisStore
  const shortener = new URLShortener(
    "https://sho.rt",
    new RedisStore(redisClient)
  );

  // ✅ Routes
  app.use("/shorten", shortenRouter(shortener));
  app.use("/resolve", resolveRouter(shortener));
  app.use("/list", alistRouter(shortener));
  app.use("/delete", deleteAlias(shortener));

  app.get("/", (req, res) => {
    res.send("✅ Redis URL Shortener API is running");
  });

  app.get("/ping", (req, res) => {
    res.status(200).json({ ok: true, message: "Redis is connected!" });
  });

  app.listen(3001, () =>
    console.log("🚀 Server running at http://localhost:3001")
  );
});
