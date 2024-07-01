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
  return Response.json(bbDetailData);
}

export async function DELETE(
  req: Request,
  { params }: { params: { Id: string } }
) {
  const bbId = params.Id;
  try {
    await prisma.post.delete({
      where: {
        id: parseInt(bbId),
      },
    });
    console.log("log: delete OK");
  } catch (error) {
    console.error("log: delete error");
  }
}
