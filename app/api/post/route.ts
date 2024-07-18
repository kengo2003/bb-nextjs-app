import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

//ここをgetDetailDataに移行する
export async function GET(req: Request) {
  const bbPosts = await prisma.post.findMany(); //投稿が膨大になった時には改修必要
  return NextResponse.json(bbPosts);
}
