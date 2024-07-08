import { NextResponse } from "next/server";
import redis from "@/utils/redis";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    if (!formData.get("c")) {
      throw Error("you fucked up, son");
    }

    const id = Math.random().toString(16).replace(".", "");

    const link = `https://type.st/p/${id}\n`;

    const c = formData.get("c");

    if (!c) {
      console.error(formData);
      throw Error(
        "man I don't even know why this happened, check the logs homie"
      );
    }

    let text = "";

    if (typeof c === "string") {
      text = c;
    }

    if (c instanceof File) {
      const file: File = c as File;
      text = await file.text();
    }

    await redis.set(id, text);

    if (formData.get("internal")) {
      return Response.redirect(link);
    }

    return new NextResponse(link);
  } catch (err: any) {
    console.error(err);
    return new NextResponse(err.message, { status: 400 });
  }
}
