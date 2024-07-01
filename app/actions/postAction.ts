"use server";

import { z } from "zod";
import { formSchema } from "../posts/create/page";
import prisma from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { BBDataType } from "../types/types";

//投稿詳細取得
export const getDetailData = async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/post/${id}`, {
    cache: "no-store",
  });
  const bbDetailData = await response.json();
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
  editId: number,
  { username, title, content }: z.infer<typeof formSchema>
) => {
  try {
    await prisma.post.update({
      //DB処理書く
      where: {
        id: editId,
      },
      data: {
        username: username,
        title: title,
        content: content,
      },
    });
    console.log("log: edit done");
  } catch (error) {
    console.error("log: edit error");
  }

  revalidatePath("/");
  redirect("/");
};
