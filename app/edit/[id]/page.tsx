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
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editBB, getDetailData } from "@/app/actions/postAction";
import { BBDataType } from "@/app/types/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  const [bbDetailData, setBbDetailData] = useState<BBDataType>(null);
  //form初期値設定
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      title: "",
      content: "",
    },
  });

  //post情報取得;
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDetailData(params.Id);
      console.log("log: ", data);
      setBbDetailData(data);
    };
    fetchData();
  }, [params.Id]);

  // Form初期値を設定
  useEffect(() => {
    if (bbDetailData) {
      form.reset({
        username: bbDetailData.username,
        title: bbDetailData.title,
        content: bbDetailData.content,
      });
    }
  }, [bbDetailData, form]);

  //Loding画面
  if (!bbDetailData) {
    return (
      <div>
        <div className="font-bold text-2xl text-black text-center pt-32">
          Loading...
        </div>
      </div>
    );
  }

  //テスト用
  // const pageNumber: number = params.Id;
  // console.log(pageNumber);

  async function onSubmit(value: z.infer<typeof formSchema>) {
    const { username, title, content } = value;
    const editId = params.Id;
    console.log(editId, username, title, content);
    editBB(editId, { username, title, content });
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
