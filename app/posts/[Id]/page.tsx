import { BBDataType } from "@/app/types/types";
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
    <div className="mx-auto max-w-4xl p-10 border border-gray-300 bg-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-700">{username}</p>
      </div>

      <div className="mb-8">
        <p className="text-gray-900">{content}</p>
      </div>

      <Link
        href={"/"}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
      >
        戻る
      </Link>
    </div>
  );
};

export default DetailPage;
