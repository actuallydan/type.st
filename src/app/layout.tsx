import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Link from "next/link";
import "./globals.css";
import { ReactQueryClientProvider } from "@/features/ReactQueryClientProvider";
import History from "@/features/History";

export const metadata: Metadata = {
  title: "type.st",
  description: "typing stuff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
          {children}
          <footer className="fixed bottom-0 flex items-center justify-end w-full py-2 px-4">
            <Link href={"/"} className="mx-4 font-mono text-blue-500 text-base">
              home
            </Link>
            <Link
              href={"/keys"}
              className="mx-4 font-mono text-blue-500 text-base"
            >
              keys
            </Link>
            <Link
              href={"https://github.com/actuallydan/type.st"}
              className="mx-4 font-mono text-blue-500 text-base"
              target="_blank"
            >
              github
            </Link>
          </footer>
          <History />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
