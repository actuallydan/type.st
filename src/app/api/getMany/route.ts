import { NextResponse } from "next/server";
import redis from "@/utils/redis";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idString = searchParams.get("ids");

    if (!idString) {
      throw Error("no ids to fetch");
    }

    const ids = idString.split(",");

    if (!ids.length) {
      throw Error("no ids to fetch");
    }

    const responses: { id: string; text: string }[] = [];

    for (let id of ids) {
      let res = await redis.get(id);

      if (typeof res === "string") {
        responses.push({ id, text: res });
      }
    }

    return Response.json({ responses });
  } catch (err: any) {
    console.error(err);
    return new NextResponse(err.message, { status: 400 });
  }
}
