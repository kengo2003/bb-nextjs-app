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
  const bbDetailData: BBDataType = await response.json();
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
export const editBB = async ({
  username,
  title,
  content,
}: z.infer<typeof formSchema>) => {
  await prisma.post.create({
    //DB処理書く
    data: {
      username,
      title,
      content,
    },
  });

  revalidatePath("/");
  redirect("/");
};
