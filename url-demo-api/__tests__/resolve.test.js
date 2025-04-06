import request from "supertest";
import express from "express";
import { createClient } from "redis";
import resolveRouter from "../routes/resolve.js";

let app, client, RedisStore, URLShortener;

beforeAll(async () => {
  const redisStoreModule = await import(
    "file:///Users/drew/Desktop/url-shortener/dist/esm/stores/redisStore.js"
  );
  const urlShortenerModule = await import(
    "file:///Users/drew/Desktop/url-shortener/dist/esm/index.js"
  );

  RedisStore = redisStoreModule.RedisStore;
  URLShortener = urlShortenerModule.URLShortener;

  client = createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
    password: process.env.REDIS_PASSWORD,
    username: process.env.REDIS_USERNAME,
  });

  await client.connect();

  const shortener = new URLShortener("https://sho.rt", new RedisStore(client));

  app = express();
  app.use(express.json());
  app.use("/resolve", resolveRouter(shortener));

  // create a test alias
  await shortener.shorten("https://example.com/resolve", {
    alias: "jest-resolve",
    expiresIn: "1h",
  });
});

afterAll(async () => {
  await client.quit();
});

describe("GET /resolve/:alias", () => {
  it("resolves a known alias", async () => {
    const res = await request(app).get("/resolve/jest-resolve");
    expect(res.statusCode).toBe(200);
    expect(res.body.resolvedUrl).toBe("https://example.com/resolve");
  });

  it("returns 404 for unknown alias", async () => {
    const res = await request(app).get("/resolve/non-existent-alias");
    expect(res.statusCode).toBe(404);
  });
});
