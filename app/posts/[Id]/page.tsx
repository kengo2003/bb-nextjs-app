import { BBDataType } from "@/app/types/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

async function getDetailData(id: number) {
  const response = await fetch(`http://localhost:3000/api/post/${id}`, {
    cache: "no-store",
  });

  const bbDetailData: BBDataType = await response.json();

  return bbDetailData;
}

const DetailPage = async ({ params }: { params: { Id: number } }) => {
  const bbDetailData = await getDetailData(params.Id);
  const { title, content, username } = bbDetailData;
  return (
    <div className="mx-auto max-w-4xl p-10 border border-gray-300 bg-white  text-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-700">{username}</p>
      </div>

      <div className="mb-8">
        <p className="text-gray-900">{content}</p>
      </div>
      <div className="w-full flex">
        <div className="w-full">
          <Link href={"/"}>
            <Button className="w-1/4 bg-blue-500">戻る</Button>
          </Link>
        </div>
        <div className="w-full text-right">
          <Link href={"/edit"}>
            <Button className="w-1/4">編集</Button>
          </Link>
          <Link href={"/delete"}>
            <Button className="ml-8 w-1/4 bg-red-600 border border-slate-500">
              削除
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
