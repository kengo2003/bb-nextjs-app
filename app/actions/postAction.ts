"use server";

import { z } from "zod";
import { formSchema } from "../posts/create/page";
import prisma from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { BBDataType } from "@/app/types/types";

//全記事取得
export const getAllData = async () => {
  const bbData: BBDataType[] = await prisma.post.findMany();
  return bbData;
};

//投稿詳細取得
export const getDetailData = async (id: any) => {
  const bbDetailData = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return bbDetailData;
};

//新規投稿
export const postBB = async ({
  username,
  title,
  content,
}: z.infer<typeof formSchema>) => {
  await prisma.post.create({
    data: {
      username,
      title,
      content,
    },
  });

  revalidatePath("/");
  redirect("/");
};

//編集処理
export const editBB = async (
  editId: any,
  { username, title, content }: z.infer<typeof formSchema>
) => {
  try {
    await prisma.post.update({
      where: {
        id: parseInt(editId),
      },
      data: {
        username: username,
        title: title,
        content: content,
      },
    });
    console.log("log: edit done");
  } catch (error) {
    console.log(editId, { username, title, content });
    console.error("log: edit error");
  }

  revalidatePath("/");
  redirect("/");
};
