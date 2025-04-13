"use client"

import Can from './Can';

const ParallaxSection = () => {
  return (
    <section className="relative h-screen bg-red-500  w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Can />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">

      </div>
    </section>
  );
};

export default ParallaxSection;
