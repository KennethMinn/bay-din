"use client";

import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const fetchQuestions = async () => {
  const res = await axios.get(`http://localhost:3001/questions`);
  return await res.data;
};

type QuestionType = {
  questionNo: number;
  questionName: string;
};

const Page = () => {
  const [page, setPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);
  const { data: questions } = useQuery<QuestionType[]>(
    ["paginated_questions", page],
    fetchQuestions
  );
  const indexOfLastPage = page + postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentPosts = questions?.slice(indexOfFirstPage, indexOfLastPage);
  const router = useRouter();
  const searchParams = useSearchParams();

  const onShowSizeChange = (_current: unknown, pageSize: any) => {
    setPostPerPage(pageSize);
  };

  const itemRender = (current: unknown, type: string, originalElement: any) => {
    if (type === "prev") {
      return <a href="">Prev</a>;
    }
    if (type === "next") {
      return <a href="">Next</a>;
    }
    return originalElement;
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params}`);
  }, [page, router, searchParams]);

  return (
    <>
      {/* <Pagination data={data} /> */}
      <div className=" flex mt-5 justify-center items-center">
        <div className=" flex flex-col gap-4">
          {currentPosts?.map((post) => (
            <div key={post.questionNo} className="">
              {post.questionName}
            </div>
          ))}
        </div>
      </div>
      <div className=" mt-4 flex justify-center">
        <Pagination
          onChange={(value) => {
            setPage(value);
          }}
          pageSize={postPerPage}
          total={questions?.length}
          current={page}
          showSizeChanger={false}
          className=""
          // showQuickJumper
          // onShowSizeChange={onShowSizeChange}
          itemRender={itemRender}
        />
      </div>
    </>
  );
};

export default Page;
