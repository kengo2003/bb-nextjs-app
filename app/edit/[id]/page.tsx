"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { editBB, getDetailData } from "@/app/actions/postAction";
import { BBDataType } from "@/app/types/types";

export const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "ユーザー名は2文字以上で入力してください" }),
  title: z
    .string()
    .min(2, { message: "タイトルは2文字以上で入力してください" }),
  content: z
    .string()
    .min(10, { message: "本文は10文字以上で入力してください" })
    .max(100, { message: "本文は100字以内で入力してください" }),
});

const EditPage = ({ params }: { params: { Id: number } }) => {
  //post情報取得
  const [bbDetailData, setBbDetailData] = useState<BBDataType | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDetailData(params.Id);
      setBbDetailData(data);
    };
    fetchData();
  }, [params.Id]);

  //Loding画面テスト用
  if (!bbDetailData) {
    return <div>Loading...</div>;
  }
  const { id, title, content, username } = bbDetailData;
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //設定する
      username: username,
      title: title,
      content: content,
    },
  });

  async function onSubmit(value: z.infer<typeof formSchema>) {
    const { username, title, content } = value;
    editBB({ username, title, content });
  }

  return (
    <div className="mt-10">
      <h1 className="text-4xl font-bold text-center py-6">編集画面</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 w-full lg:w-1/2 px-7 mx-auto"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ユーザー名</FormLabel>
                <FormControl>
                  <Input placeholder="ユーザー名" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>タイトル</FormLabel>
                <FormControl>
                  <Input placeholder="タイトル" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>本文</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="投稿内容"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-right">
            <Button type="submit" className="bg-green-600">
              保存
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditPage;
