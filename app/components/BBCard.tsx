import React from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { BBDataType } from "../types/types";

interface bbDataProps {
  bbData: BBDataType;
}

const BBCard = ({bbData}: bbDataProps) => {
  const { id, title, content, createdAt, username } = bbData;


  return (
    <div>
      <Card className="text-black">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {username}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {content}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={`/posts/${id}`} className="text-blue-500">
            Read More
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BBCard;
