"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function History() {
  const params = useParams<{ id: string | string[] }>();

  useEffect(() => {
    const history = window.localStorage.getItem("history");

    if (params?.id && typeof params.id === "string") {
      let recents = history
        ? new Set<string>(JSON.parse(history))
        : new Set<string>();

      recents.add(params.id);

      let entries: string[] = [];

      recents.forEach((entry: string) => {
        entries.push(entry);
      });

      window.localStorage.setItem("history", JSON.stringify(entries));
    }
  }, [params.id]);

  return null;
}
