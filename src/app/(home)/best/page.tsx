import ProductShowcase from "@/components/3d/cannettes/ShowCan";
import SodaCanSwitcher from "@/components/3d/cannettes/SodaCanSwitcher";
import SodaView from "@/components/3d/cannettes/SodaView";
import Hero from "@/components/3d/Hero";

import SkyDive from "@/components/3d/SkyDive/SkyDive";
import { TextSplitter } from "@/components/3d/TextSpliter";
import ViewCanvas from "@/components/3d/ViewCanvas";

export default function Page() {
  return (
    <>
      <div className="relative min-h-screen h-full ">
        <div className="relative z-50 mt-20 ">
          {/* <h1 className="text-2xl font-bold mb-6">
            <TextSplitter
              text="dd"
              className="text-blue-500 text-center"
              wordDisplayStyle="inline-block"
            />
          </h1>
          <Hero /> */}
          {/* <SodaCanSwitcher/> */}
<SkyDive/>


        </div>
      </div>
    </>
  );
}
