import { BBDataType } from "@/app/types/types";
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
  console.log(bbDetailData);//データ取得済
  return <div>DetailPage</div>;
};

export default DetailPage;
