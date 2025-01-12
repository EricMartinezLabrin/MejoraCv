import React from "react";
import ShowStatusIcon from "@/components/ShowStatusIcon";
import Rating from "@/components/Rating";
import ShowMore from "./show-more";

export default function Check(props: any) {
  const { blur, checked } = props;
  const { score, title, comments } = checked;
  return (
    <div
      className={`max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-[23rem] ${blur} hover:scale-105 transition-transform duration-300 ease-in-out`}
    >
      <div className="grid gap-4">
        <ShowStatusIcon score={score} />
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      </div>
      <div>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 max-h-36 overflow-hidden whitespace-normal text-ellipsis">
          {comments}
        </p>
      </div>
      <div className="inline-flex font-medium items-center text-blue-600 hover:underline">
        {score && <Rating props={{ score }} />}
      </div>
      {/* <ShowMore /> */}
    </div>
  );
}
