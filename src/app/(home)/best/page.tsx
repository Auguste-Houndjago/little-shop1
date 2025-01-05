import Hero from "@/components/3d/Hero";

import SkyDive from "@/components/3d/SkyDive/SkyDive";
import { TextSplitter } from "@/components/3d/TextSpliter";
import ViewCanvas from "@/components/3d/ViewCanvas";

export default function Page() {
  return (
    <>
      <div className="relative min-h-screen h-full">
        <ViewCanvas />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-6">
            <TextSplitter
              text="Bienvenue sur notre site !"
              className="text-blue-500"
              wordDisplayStyle="inline-block"
            />
          </h1>
          <Hero />
<SkyDive/>
        </div>
      </div>
    </>
  );
}
