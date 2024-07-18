"use client";
import { useState } from "react";
import { Check, Clipboard } from "lucide-react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Submission } from "@/app/types/post";
import { timeAgo } from "@/utils/time";

export default function Text({ data, id }: { data: Submission; id: string }) {
  const [showCopy, setShowCopy] = useState(true);

  const copy = () => {
    navigator.clipboard.writeText(data.text);
    setShowCopy(false);

    setTimeout(() => {
      setShowCopy(true);
    }, 1500);
  };

  return (
    <main className="bg-white rounded-lg mr-2 max-h-[90dvh] flex-grow h-auto relative flex flex-col">
      <div className="flex flex-row justify-between items-start h-16">
        <div className="p-2">
          <p className="font-mono bg-gray-800 rounded text-white px-2 py-1">
            <span className="text-xs">#</span>
            {id}
          </p>
          {data.timestamp ? (
            <p className="font-sans text-gray-500 text-xs p-1">
              {timeAgo(data.timestamp)}
            </p>
          ) : null}
        </div>
        <div
          className="bg-gray-100 p-2 pt-0 pr-0 rounded-lg w-max z-10 inverted-border-radius-before inverted-border-radius-after"
          style={{ borderTopLeftRadius: 0, borderBottomRightRadius: 0 }}
        >
          <nav className="bg-white px-4 py-2 rounded-md flex items-center justify-between">
            <button
              className="rounded-md border-gray-200 border mx-1 p-1 hover:bg-purple-300 transition-all flex items-center justify-center"
              onClick={copy}
            >
              {showCopy ? (
                <Clipboard size={20} className="text-gray-800" />
              ) : (
                <Check size={20} className="text-gray-800" />
              )}
              <span className="font-sans text-gray-600 mx-2 text-xs font-semibold">
                {showCopy ? "copy" : "copied!"}
              </span>
            </button>
          </nav>
        </div>
      </div>

      <Scrollbars
        universal
        className="flex-grow max-h-[90dvh] max-w-full border-none font-mono text-gray-700 rounded-lg bg-white whitespace-pre"
      >
        <div className="m-4">{data.text}</div>
      </Scrollbars>
    </main>
  );
}
