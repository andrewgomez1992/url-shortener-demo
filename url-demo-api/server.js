import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createClient } from "redis";
import { RedisStore } from "@the-node-forge/url-shortener/stores/redisStore.js";
import { URLShortener } from "@the-node-forge/url-shortener";
import shortenRouter from "./routes/shorten.js";
import resolveRouter from "./routes/resolve.js";
import alistRouter from "./routes/alist.js";
import deleteAlias from "./routes/deleteAlias.js";
import { errorHandler } from "./middleware/errorHandler.js";

import dotenv from "dotenv";
dotenv.config();

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
await redisClient.connect();

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

// ✅ The missing route:
app.get("/ping", (req, res) => {
  // If we got this far, Redis is connected
  res.status(200).json({ ok: true, message: "Redis is connected!" });
});

app.listen(3001, () =>
  console.log("🚀 Server running at http://localhost:3001")
);
