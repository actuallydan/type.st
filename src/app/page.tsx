"use client";

import { useEffect, useState, Fragment } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ChevronLeft,
} from "lucide-react";

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

  const rows = [
    [
      { default: "Esc", shift: "", code: "Escape" },
      { default: "F1", shift: "", code: "F1" },
      { default: "F2", shift: "", code: "F2" },
      { default: "F3", shift: "", code: "F3" },
      { default: "F4", shift: "", code: "F4" },
      { default: "F5", shift: "", code: "F5" },
      { default: "F6", shift: "", code: "F6" },
      { default: "F7", shift: "", code: "F7" },
      { default: "F8", shift: "", code: "F8" },
      { default: "F9", shift: "", code: "F9" },
      { default: "F10", shift: "", code: "F10" },
      { default: "F11", shift: "", code: "F11" },
      { default: "F12", shift: "", code: "F12" },
      { default: "?", shift: "", code: "" },
      { default: "del", shift: "", code: "Delete" },
      { default: "?", shift: "", code: "" },
    ],
    [
      { default: "`", shift: "~", code: "Backquote" },
      { default: "1", shift: "!", code: "Digit1" },
      { default: "2", shift: "@", code: "Digit2" },
      { default: "3", shift: "#", code: "Digit3" },
      { default: "4", shift: "$", code: "Digit4" },
      { default: "5", shift: "%", code: "Digit5" },
      { default: "6", shift: "^", code: "Digit6" },
      { default: "7", shift: "&", code: "Digit7" },
      { default: "8", shift: "*", code: "Digit8" },
      { default: "9", shift: "(", code: "Digit9" },
      { default: "0", shift: ")", code: "Digit0" },
      { default: "-", shift: "_", code: "Minus" },
      { default: "=", shift: "+", code: "Equal" },
      { default: "backspace", shift: "", code: "Backspace", span: 2 },
      { default: "pgup", shift: "", code: "PageUp" },
    ],
    [
      { default: "tab", shift: "", code: "Tab", span: 1 },
      { default: "q", shift: "Q", code: "KeyQ" },
      { default: "w", shift: "W", code: "KeyW" },
      { default: "e", shift: "E", code: "KeyE" },
      { default: "r", shift: "R", code: "KeyR" },
      { default: "t", shift: "T", code: "KeyT" },
      { default: "y", shift: "Y", code: "KeyY" },
      { default: "u", shift: "U", code: "KeyU" },
      { default: "i", shift: "I", code: "KeyI" },
      { default: "o", shift: "O", code: "KeyO" },
      { default: "p", shift: "P", code: "KeyP" },
      { default: "[", shift: "{", code: "BracketLeft" },
      { default: "]", shift: "}", code: "BracketRight" },
      { default: "\\", shift: "|", code: "Backslash", span: 2 },
      { default: "pgdn", shift: "", code: "PageDown" },
    ],
    [
      { default: "caps", shift: "", code: "CapsLock", span: 1 },
      { default: "a", shift: "A", code: "KeyA" },
      { default: "s", shift: "S", code: "KeyS" },
      { default: "d", shift: "D", code: "KeyD" },
      { default: "f", shift: "F", code: "KeyF" },
      { default: "g", shift: "G", code: "KeyG" },
      { default: "h", shift: "H", code: "KeyH" },
      { default: "j", shift: "J", code: "KeyJ" },
      { default: "k", shift: "K", code: "KeyK" },
      { default: "l", shift: "L", code: "KeyL" },
      { default: ";", shift: ":", code: "Semicolon" },
      { default: "'", shift: '"', code: "Quote" },
      { default: "enter", shift: "", code: "Enter", span: 3 },
      { default: "home", shift: "", code: "Home" },
    ],
    [
      { default: "shift", shift: "", code: "ShiftLeft", span: 2 },
      { default: "z", shift: "Z", code: "KeyZ" },
      { default: "x", shift: "X", code: "KeyX" },
      { default: "c", shift: "C", code: "KeyC" },
      { default: "v", shift: "V", code: "KeyV" },
      { default: "b", shift: "B", code: "KeyB" },
      { default: "n", shift: "N", code: "KeyN" },
      { default: "m", shift: "M", code: "KeyM" },
      { default: ",", shift: "<", code: "Comma" },
      { default: ".", shift: ">", code: "Period" },
      { default: "/", shift: "?", code: "Slash" },
      { default: "shift", shift: "", code: "ShiftRight", span: 2 },
      {
        default: "arrow_up",
        shift: "",
        code: "ArrowUp",
        component: <ChevronUp />,
      },
      { default: "end", shift: "", code: "End" },
    ],
    [
      { default: "ctrl", shift: "", code: "ControlLeft" },
      { default: "alt", shift: "", code: "AltLeft" },
      { default: "meta", shift: "", code: "MetaLeft" },
      { default: "space", shift: "", code: "Space", span: 7 },
      { default: "meta", shift: "", code: "MetaRight" },
      { default: "fn", shift: "", code: "Fn" },
      { default: "ctrl", shift: "", code: "ControlRight" },
      {
        default: "arrow_left",
        shift: "",
        code: "ArrowLeft",
        component: <ChevronLeft />,
      },
      {
        default: "arrow_down",
        shift: "",
        code: "ArrowDown",
        component: <ChevronDown />,
      },
      {
        default: "arrow_right",
        shift: "",
        code: "ArrowRight",
        component: <ChevronRight />,
      },
    ],
  ];

  const pressedStyle = {
    backgroundColor: "#333",
    color: "#FFF",
  };

  return (
    <main className="min-p-2 py-24 max-p-24 w-full max-w-[1200px] m-auto">
      {/* <p className="font-mono text-3xl">wioo</p> */}

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
                return (
                  <div
                    key={key.default + "-" + colIndex}
                    className="bg-white p-2 text-center black font-mono border rounded"
                    style={{
                      gridArea: `${rowIndex + 1} / ${colStart} / ${
                        rowIndex + 1
                      } / ${colEnd}`,
                      ...(isPressed ? pressedStyle : {}),
                    }}
                  >
                    {key.component ? IconComponent : key.default}
                  </div>
                );
              })}
            </Fragment>
          );
        })}
      </div>
    </main>
  );
}
