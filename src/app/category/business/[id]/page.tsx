"use client";
import React from "react";
import AllNews from "../../../../../public/main.json";
import { useParams } from "next/navigation";
import SingleNews from "@/components/SingleNews";
import { Article } from "@/types";
const SingleBusinessPage = () => {
  const { id } = useParams();
  const news = AllNews.filter(
    (content) => content.article_id === id
  ) as Article[];

  return (
    <>
      <SingleNews news={news[0]} />
    </>
  );
};

export default SingleBusinessPage;
