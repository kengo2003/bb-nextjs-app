"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BBDataType } from "@/app/types/types";
import { Button } from "@/components/ui/button";
import { getDetailData } from "@/app/actions/postAction";

const DetailPage = ({ params }: { params: { Id: number } }) => {
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

  //この削除処理もserverActionに
  const deleteBB = async () => {
    try {
      await fetch(`http://localhost:3000/api/post/${id}`, {
        method: "DELETE",
      });
      alert("正常に削除されました");
      window.location.href = "/";
    } catch (error) {
      alert("削除に失敗しました");
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-10 border border-gray-300 bg-white mt-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-700">{username}</p>
      </div>

      <div className="mb-8">
        <p className="text-gray-900">{content}</p>
      </div>
      <div className="w-full flex text-white">
        <div className="w-full">
          <Link href={"/"}>
            <Button className="w-1/4 bg-blue-500">戻る</Button>
          </Link>
        </div>
        <div className="w-full text-right">
          <Link href={`/edit/${id}`}>
            <Button className="w-1/4">編集</Button>
          </Link>
          <Button
            onClick={deleteBB}
            className="ml-8 w-1/4 bg-red-600 border border-slate-500"
          >
            削除
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
