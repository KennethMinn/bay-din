"use client";

import Questions from "@/app/test/page";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ data }: any) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const selectedPage = searchParams.get("page") || "1";

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data?.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % data?.length;
    setItemOffset(newOffset);
  };
  return (
    <>
      <div className=" flex justify-center mt-5 h-[600px]">
        <div className=" flex flex-col gap-5 items-center">
          {currentItems?.map((data: any) => (
            <div key={data.questionName}>{data.questionName}</div>
          ))}
        </div>
      </div>
      <ReactPaginate
        className="flex justify-center items-center mt-6 gap-4"
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        onClick={(e) =>
          console.log(e.nextSelectedPage && e.nextSelectedPage + 1)
        }
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName=" border px-2 py-1 text rounded-sm"
        activeClassName=" bg-black text-white"
        previousClassName=" border px-2 py-1"
        nextClassName="border px-2 py-1"
      />
    </>
  );
};

export default Pagination;
