"use client";
import { useParams } from "next/navigation";
import React from "react";
import AllNews from "../../../../../public/main.json";
import SingleNews from "@/components/SingleNews";
import { Article } from "@/types";
const SingleEntertainmentPage = () => {
  const { id } = useParams();
  const news = AllNews.filter(
    (content) => content.article_id === id
  ) as Article[];
  return (
    <div>
      <SingleNews news={news[0]} />
    </div>
  );
};

export default SingleEntertainmentPage;
