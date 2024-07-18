import { NextResponse } from "next/server";
import redis from "@/utils/redis";
import { Submission } from "@/app/types/post";

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

    const responses: { id: string; submission: Submission }[] = [];

    for (let id of ids) {
      let res = await redis.get(id);

      if (typeof res === "string") {
        // res can either be a stringified Submission or a string
        // if it's a string, push it as is, otherwise parse it
        try {
          const parsed = JSON.parse(res) as Submission;
          responses.push({ id, submission: parsed });
        } catch (err) {
          responses.push({ id, submission: { text: res, timestamp: null } });
        }
      }
    }

    return Response.json({ responses });
  } catch (err: any) {
    console.error(err);
    return new NextResponse(err.message, { status: 400 });
  }
}
