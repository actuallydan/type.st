import Text from "@/features/Text";
import redis from "@/utils/redis";
import RecentPastes from "@/features/RecentPastes";

export default async function PastePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const data: string = (await redis.get(id)) || "";

  if (!data) {
    return (
      <div className="p-4 py-8 min-h-[100dvh] bg-gray-100 flex box-border">
        <main className="flex-grow min-h-[90dvh] pr-2 max-w-full">
          <pre className="w-full h-full border-none font-sans text-gray-700 rounded-lg transition-all bg-white p-4 active:outline-none active:shadow-lg focus:shadow-lg focus-visible:outline-none">
            no notes for id:{" "}
            <span className="font-mono bg-gray-200 px-2 py-1 text-sm rounded">
              {id}
            </span>
          </pre>
        </main>
        <RecentPastes />
      </div>
    );
  }

  return (
    <div className="p-4 py-8 min-h-[100dvh] bg-gray-100 flex box-border">
      <Text data={data} />
      <RecentPastes />
    </div>
  );
}
