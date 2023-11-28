// "use client";

// import { Question } from "@/types";
// import Link from "next/link";
// import React, { ChangeEvent, useState } from "react";
// import { InfiniteData } from "@tanstack/react-query";

// interface QuestionsProps {
//   questions: InfiniteData<Question[]> | undefined;
// }

// const Questions = ({ questions }: QuestionsProps) => {
//   if (!questions) return;

//   return (
//     <>
//       <input
//         onChange={() => {}}
//         type="text"
//         className=" border-2 py-2 outline-none ps-4 mt-5 mb-10 rounded-md w-[800px]"
//         placeholder="search..."
//       />
//       <Link href={"/"}>
//         {questions.map((q) => (
//           <div
//             key={q.questionNo}
//             className=" flex border-2 py-4 border-collapse mb-3"
//           >
//             <h1 className=" border-r-2 w-[50px]">{q.questionNo}</h1>
//             <h1 className=" px-3">{q.questionName}</h1>
//           </div>
//         ))}
//       </Link>
//       <div className=" flex gap-3 justify-center mt-8 mb-4">
//         <button
//           onClick={() => {}}
//           className=" border-2 border-solid rounded-md py-2 px-5 cursor-pointer"
//         >
//           Prev
//         </button>
//         <button
//           onClick={() => {}}
//           className=" rounded-md bg-black text-white py-2 px-5 cursor-pointer"
//         >
//           Next
//         </button>
//       </div>
//     </>
//   );
// };

// export default Questions;
