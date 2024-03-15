export default function Home() {
  return (
    <div className="min-w-[100dvw] min-h-[100dvh] bg-gray-100">
      <main className="p-4 py-8 w-full max-w-[1200px] m-auto h-[100dvh]">
        <textarea
          className="w-full h-full border-none font-sans text-gray-700 rounded-lg resize transition-all bg-white p-4 active:outline-none active:shadow-lg focus:shadow-lg focus-visible:outline-none"
          autoFocus
          placeholder="Start typing something"
        ></textarea>
      </main>
    </div>
  );
}
