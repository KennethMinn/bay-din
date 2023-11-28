"use client";

import Detail from "@/components/Detail";
import useDebounce from "@/hooks/useDebounce";
// import Questions from "@/components/Questions";
import { Question } from "@/types";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const testAdd = async (question: any) => {
  return await axios.post("http://localhost:3001/questions", question);
};

const InfiniteScroll = () => {
  const { ref, inView } = useInView();
  console.log(inView);

  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const debouncedSearchTerm = useDebounce(search, 1000);

  const fetchQuestions = async ({ pageParam = 1 }) => {
    const res = await axios.get(
      `http://localhost:3001/questions?_limit=10&_page=${pageParam}&q=${search}`
    );
    return await res.data;
  };

  const {
    data,
    isLoading,
    isFetchingNextPage,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<Question[]>(
    ["questions", debouncedSearchTerm],
    fetchQuestions,
    {
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < 6) return pages.length + 1;
        return undefined;
      },
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (isLoading)
    return <h1 className=" text-center font-bold text-xl">Loading...</h1>;

  return (
    <div className=" mt-3 flex justify-center">
      <div className=" text-center">
        <h1 className=" font-bold text-5xl">မင်းသိင်္ခ</h1>
        <h3 className=" font-semibold text-2xl mt-3">လက်ထောက်ဗေဒင်</h3>
        <h1 className=" font-semibold text-xl mt-7">
          သိလိုသောမေးခွန်းအားရှာဖွေပါ…
        </h1>
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          className=" border-2 py-2 outline-none ps-4 mt-5 mb-10 rounded-md w-[300px] md:w-[800px]"
          placeholder="search..."
        />
        {data?.pages.map((questions, i) => (
          <div key={i} className=" flex justify-center">
            <Link href={"/"} className="">
              {questions.map((q) => (
                <div
                  key={q.questionNo}
                  className=" flex items-center w-[300px] md:w-[800px] border-2 py-4 mb-3"
                >
                  <h1 className=" border-r-2 w-[50px]">{q.questionNo}</h1>
                  <h1 className=" px-3">{q.questionName}</h1>
                </div>
              ))}
            </Link>
          </div>
        ))}
        <div ref={ref} />
        {isFetchingNextPage && <div className=" text-5xl">Loading...</div>}
      </div>
    </div>
  );
};

export default InfiniteScroll;
