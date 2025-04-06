import request from "supertest";
import express from "express";
import { createClient } from "redis";
import shortenRouter from "../routes/shorten.js";

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
  app.use("/shorten", shortenRouter(shortener));
});

afterAll(async () => {
  await client.quit();
});

describe("POST /shorten", () => {
  it("shortens a valid URL", async () => {
    const res = await request(app).post("/shorten").send({
      url: "https://example.com/test",
      alias: "test-shorten",
      expiresIn: "24h",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.shortUrl).toBe("https://sho.rt/test-shorten");
  });

  it("returns 400 if url is missing", async () => {
    const res = await request(app).post("/shorten").send({});
    expect(res.statusCode).toBe(400);
  });
});
