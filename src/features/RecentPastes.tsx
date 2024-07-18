"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Submission } from "@/app/types/post";

type Recent = {
  id: string;
  submission: Submission;
};

export default function RecentPastes() {
  const { data, error, isLoading, ...rest } = useQuery({
    queryKey: ["get-history"],
    queryFn: () => {
      const history: string | null = window.localStorage.getItem("history");

      if (history) {
        return fetchRecentsFromIds(JSON.parse(history));
      }

      return [];
    },
    enabled: typeof window !== "undefined",
  });

  const fetchRecentsFromIds = async (ids: string[]) => {
    const idString = ids.join(",");

    let res = await fetch("/api/getMany?ids=" + idString);
    let { responses } = await res.json();

    // given array of id strings, remove from localstorage the responses dont exist in the array
    localStorage.setItem(
      "history",
      JSON.stringify(responses.map((r: Recent) => r.id))
    );

    return responses;
  };

  if (isLoading || !data) {
    return (
      <aside className="w-48">
        <div className="w-full border-none mb-2 font-sans text-gray-700 rounded-lg transition-all bg-white p-4 px-6 active:outline-none active:shadow-lg focus:shadow-lg focus-visible:outline-none">
          <h2>History</h2>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-48">
      <div className="w-full border-none mb-2 font-sans text-gray-700 rounded-lg transition-all bg-white p-4 px-6 active:outline-none active:shadow-lg focus:shadow-lg focus-visible:outline-none">
        <h2>History</h2>
      </div>

      {data.map((recent: Recent) => (
        <Link
          key={recent.id}
          href={`${window.location.origin}/p/${recent.id}`}
          className="flex flex-col hover:translate-y-[-0.25rem] hover:shadow-md hover:bg-purple-100 w-full border-none mb-2 font-sans text-gray-700 rounded-lg transition-all bg-white p-4 px-6 active:shadow-lg focus-visible:outline-none focus:translate-y-[-0.25rem] focus:shadow-md focus:bg-purple-100"
        >
          <p className="font-mono bg-gray-800 px-2 py-1 text-sm rounded text-white">
            {recent.id}
          </p>
          {recent.submission.timestamp ? (
            <p className="font-mono  px-2 py-1 text-xs  text-gray-400">
              {recent.submission.timestamp}
            </p>
          ) : null}
          <p className="font-mono py-1 text-xs rounded max-h-16 overflow-hidden whitespace-pre text-ellipsis">
            {recent.submission.text}
          </p>
        </Link>
      ))}
    </aside>
  );
}
