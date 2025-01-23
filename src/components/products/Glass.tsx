

export default function GlassmorphismCard() {
  return (

    <div className=" inset-0 h-fit m-auto text-white relative max-w-[600px] flex flex-col gap-10 p-12">
      {/* Tabs */}
      <nav className="flex px-12 py-3 rounded-md backdrop-blur-sm bg-black/30 border border-white/10">
        <a className="bg-white/15 active:bg-white/15 hover:bg-white/15 text-xs font-semibold text-gray-400 hover:text-white px-4 py-2">
          Home
        </a>
        <a className="bg-white/15 active:bg-white/15 hover:bg-white/15 text-xs font-semibold text-gray-400 hover:text-white px-4 py-2">
          Blog
        </a>
        <a className="bg-white/15 active:bg-white/15 hover:bg-white/15 text-xs font-semibold text-gray-400 hover:text-white px-4 py-2">
          Album
        </a>
      </nav>

      {/* Card */}
      <div className="flex bg-black/30 border border-white/10 p-4 rounded-lg backdrop-blur-sm">
        <div className="p-4">
          <div className="text-2xl font-bold">すし</div>
          <div className="text-sm text-gray-300 line-clamp-3 mt-2 mb-3">
            Sushi is a traditional Japanese dish of prepared vinegared rice, usually with some sugar and salt, accompanied by a variety of ingredients, such as seafood, often raw, and vegetables.
          </div>
          <div className="text-xs text-gray-400 mt-auto">🇯🇵 Japanese</div>
        </div>
        <img
          className="aspect-square w-36 rounded-lg object-cover"
          src="https://images.pexels.com/photos/248444/pexels-photo-248444.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt="Sushi"
        />
      </div>

      {/* Button */}
      <button className="bg-black/30 hover:bg-black/15 text-xs font-semibold border border-white/10 rounded-lg p-3 mt-5 inline-block backdrop-blur-sm">
        EXPLORE
      </button>

      <p className="text-xs text-center mt-5">
        powered by{" "}
        <a href="https://styles.master.co" className="underline" target="_blank" rel="noopener noreferrer">
          Master Styles
        </a>
      </p>
    </div>
  );
}
