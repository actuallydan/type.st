"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

type Recent = {
  id: string;
  text: string;
};

export default function RecentPastes() {
  const { data, error, isLoading, ...rest } = useQuery({
    queryKey: ["get-history"],
    queryFn: () => {
      const history: string | null = window.localStorage.getItem("history");

      console.log(history);
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

    return responses;
  };

  console.log(data, rest);
  if (isLoading || !data) {
    return (
      <aside className="w-48">
        <div className="w-full border-none mb-2 font-sans text-gray-700 rounded-lg resize transition-all bg-white p-4 px-6 active:outline-none active:shadow-lg focus:shadow-lg focus-visible:outline-none">
          <h2>History</h2>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-48">
      <div className="w-full border-none mb-2 font-sans text-gray-700 rounded-lg resize transition-all bg-white p-4 px-6 active:outline-none active:shadow-lg focus:shadow-lg focus-visible:outline-none">
        <h2>History</h2>
      </div>

      {data.map((recent: Recent) => (
        <Link key={recent.id} href={`${window.location.origin}/p/${recent.id}`}>
          <div className="hover:translate-y-[-0.25rem] hover:shadow-md hover:bg-purple-100 w-full border-none mb-2 font-sans text-gray-700 rounded-lg resize transition-all bg-white p-4 px-6 active:outline-none active:shadow-lg focus:shadow-lg focus-visible:outline-none">
            <p className="font-mono bg-gray-800 px-2 py-1 text-sm rounded text-white">
              {recent.id}
            </p>

            <p className="font-mono px-2 py-1 text-xs rounded max-h-16 overflow-hidden whitespace-pre text-ellipsis">
              {recent.text}
            </p>
          </div>
        </Link>
      ))}
    </aside>
  );
}
