import { Save } from "lucide-react";

export default function Home() {
  return (
    <div className="min-w-[100dvw] min-h-[100dvh] bg-gray-100">
      <main className="p-4 py-8 w-full max-w-[1200px] m-auto h-[100dvh]">
        <form action={"/api/paste"} method="POST" spellCheck={false}>
          <div className="relative  w-full h-full rounded-lg">
            <div className="flex flex-row justify-end items-start h-16">
              <div
                className="bg-gray-100 p-2 pt-0 rounded-lg w-max z-10 inverted-border-radius"
                style={{
                  borderTopLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderTopRightRadius: 0,
                }}
              >
                <nav className="bg-white px-4 py-2 rounded-md flex items-center justify-between">
                  <button
                    className="rounded-md border-gray-200 border mx-1 p-1 hover:bg-purple-300 transition-all flex items-center justify-center"
                    type={"submit"}
                  >
                    <Save size={20} className="text-gray-800" />

                    <span className="font-sans text-gray-600 mx-2 text-xs font-semibold">
                      save
                    </span>
                  </button>
                </nav>
              </div>
            </div>
            <textarea
              className="absolute top-0 left-0 w-full overflow-scroll min-h-[90dvh] h-full border-none font-sans text-gray-700 rounded-lg resize-none transition-all bg-white p-4 active:outline-none focus-visible:outline-none"
              autoFocus
              placeholder="Start typing something"
              name={"c"}
              required
            ></textarea>
          </div>
          <input type="text" name={"internal"} hidden defaultValue="true" />
        </form>
      </main>
    </div>
  );
}
