import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { Id: string } }
) {
  const bbId = params.Id;
  const bbDetailData = await prisma.post.findUnique({
    where: {
      id: parseInt(bbId),
    },
  }); //投稿が膨大になった時には改修必要
  return NextResponse.json(bbDetailData);
}
