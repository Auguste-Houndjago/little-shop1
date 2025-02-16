import { FaNodeJs } from "react-icons/fa";
import { SiExpress, SiNestjs, SiDeno, SiHono } from "react-icons/si";

export default function TechCards() {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-8 bg-gray-100 h-full">
      {/* Carte principale avec effet de fond translucide */}
      <div className="relative p-4 rounded-xl shadow-lg bg-white/60 backdrop-blur-lg w-full max-w-md">
        <button className="absolute top-2 right-2 p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition">
          ⬤
        </button>
        <div className="grid grid-cols-2 gap-4 mt-6">
          {/* Cartes de technologies */}
          <TechCard icon={<SiDeno />} label="Deno" />
          <TechCard icon={<SiNestjs />} label="Nest" />
          <TechCard icon={<FaNodeJs />} extraIcon={<SiExpress />} label="Node.js + Express" />
          <TechCard icon={<FaNodeJs />} extraIcon={<SiHono />} label="Node.js + Hono" />
        </div>
      </div>
    </div>
  );
}


function TechCard({ icon, extraIcon, label }: { icon: JSX.Element; extraIcon?: JSX.Element; label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 p-4 bg-gray-200/70 rounded-lg hover:bg-gray-300 transition cursor-pointer">
      <span className="text-2xl">{icon}</span>
      {extraIcon && <span className="text-xl text-gray-500">+</span>}
      {extraIcon && <span className="text-2xl">{extraIcon}</span>}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
