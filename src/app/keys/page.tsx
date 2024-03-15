"use client";

import { useEffect, useState, Fragment } from "react";
import { rows } from "@/data/keyboardRows";

type KeyStruct = {
  key: string;
  alt: boolean;
  shift: boolean;
  code: string;
  ctrl: boolean;
};

export default function Home() {
  const [pressedKeys, setPressedKeys] = useState<KeyStruct[]>([]);

  function handleKeyDown(ev: KeyboardEvent) {
    ev.preventDefault();

    if (ev.repeat) {
      return;
    }
    const key: KeyStruct = {
      key: ev.key,
      alt: ev.altKey,
      shift: ev.shiftKey,
      code: ev.code,
      ctrl: ev.ctrlKey,
    };

    // don't add the key twice
    if (pressedKeys.some((k) => k.key !== ev.key)) {
      return;
    }

    setPressedKeys((oldKeys) => {
      return [...oldKeys, key];
    });
  }

  function handleKeyUp(ev: KeyboardEvent) {
    const newKeys = [...pressedKeys].filter((k: KeyStruct) => k.key !== ev.key);

    setPressedKeys(newKeys);
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const pressedStyle = {
    backgroundColor: "#333",
    color: "#FFF",
  };

  return (
    <div className="min-w-[100dvw] min-h-[100dvh] bg-gray-100">
      <div></div>
      <main className="min-p-2 py-24 max-p-24 w-full max-w-[800px] m-auto">
        <div className="my-grid">
          {rows.map((row, rowIndex) => {
            let col = 0;
            return (
              <Fragment key={rowIndex}>
                {row.map((key, colIndex) => {
                  const colStart = col + 1;
                  const colEnd = colStart + (key.span || 1);
                  col += key.span || 1;

                  const IconComponent = key.component || null;

                  const isPressed = pressedKeys.find(
                    (k) => k.code === key.code || k.key === key.shift
                  );

                  const isShiftHeld = pressedKeys.find(
                    (k) => k.key === "Shift"
                  );

                  return (
                    <div
                      key={key.default + "-" + colIndex}
                      className="bg-white p-1 text-center black font-mono border rounded text-sm flex items-center justify-center"
                      style={{
                        gridArea: `${rowIndex + 1} / ${colStart} / ${
                          rowIndex + 1
                        } / ${colEnd}`,
                        ...(isPressed ? pressedStyle : {}),
                      }}
                    >
                      {key.component
                        ? IconComponent
                        : isShiftHeld && key.shift
                        ? key.shift
                        : key.default}
                    </div>
                  );
                })}
              </Fragment>
            );
          })}
        </div>
        <section className="flex mt-4 flex-wrap">
          {pressedKeys.map((key, index) => {
            return (
              <div
                key={index}
                className="bg-white p-2 black font-mono border rounded m-1"
              >
                <h1 className="font-bold text-2xl rounded bg-[#333] text-white p-2 mb-2 w-min">
                  {key.key}
                </h1>
                <pre className="text-xs">{JSON.stringify(key, null, 2)}</pre>
              </div>
            );
          })}
        </section>
      </main>
      <aside></aside>
    </div>
  );
}
