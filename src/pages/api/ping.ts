import type { NextApiRequest, NextApiResponse } from "next";
import redis from "@/utils/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.body.text) {
    res.status(400).send("you fucked up, son");
  }

  const id = Math.random().toString(16).replace(".", "");

  const link = `https://type.st/p/${id}`;

  await redis.set(id, req.body.text);

  res.status(200).send(link);
  return;
}
