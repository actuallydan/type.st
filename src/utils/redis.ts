import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "https://us1-pleasing-mule-42122.upstash.io",
  token: process.env.UPSTASH_TOKEN || "",
});

export default redis;
