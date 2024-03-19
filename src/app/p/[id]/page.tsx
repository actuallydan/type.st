import redis from "@/utils/redis";

export default async function PastePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const data: string = (await redis.get(id)) || "";

  if (!data) {
    return (
      <div className="min-w-[100dvw] min-h-[100dvh] bg-gray-100">
        <main className="p-4 py-8 w-full max-w-[1200px] m-auto h-[100dvh]">
          <pre className="w-full h-full border-none font-sans text-gray-700 rounded-lg resize transition-all bg-white p-4 active:outline-none active:shadow-lg focus:shadow-lg focus-visible:outline-none">
            no notes for id:{" "}
            <span className="font-mono bg-gray-200 px-2 py-1 text-sm rounded">
              {id}
            </span>
          </pre>
        </main>
      </div>
    );
  }

  return (
    <div className="min-w-[100dvw] min-h-[100dvh] bg-gray-100">
      <main className="p-4 py-8 w-full max-w-[1200px] m-auto h-[100dvh]">
        <pre className="w-full h-full border-none font-mono text-gray-700 rounded-lg resize transition-all bg-white p-4 active:outline-none active:shadow-lg focus:shadow-lg focus-visible:outline-none">
          {data}
        </pre>
      </main>
    </div>
  );
}
