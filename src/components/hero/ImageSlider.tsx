import { useState, useEffect, useRef, WheelEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface CardData {
  id: number;
  title: string;
  image: string;
  description: string;
}

const cardData: CardData[] = [
  {
    id: 1,
    title: "Cosmic Exploration",
    image: "https://picsum.photos/800/600?random=1",
    description: "Venture into the unknown realms of space and time."
  },
  {
    id: 2,
    title: "Ocean Depths",
    image: "https://picsum.photos/800/600?random=2",
    description: "Dive into the mysterious wonders of the deep blue sea."
  }
];

export const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollCooldown = 1000;

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!isScrollingRef.current) {
      isScrollingRef.current = true;

      if (event.deltaY > 0) {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length);
      } else if (event.deltaY < 0) {
        setDirection(-1);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + cardData.length) % cardData.length);
      }

      setTimeout(() => {
        isScrollingRef.current = false;
      }, scrollCooldown);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel as unknown as EventListener, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel as unknown as EventListener);
      }
    };
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto w-screen h-screen overflow-hidden bg-black">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src={cardData[currentIndex].image}
              alt={`Image for ${cardData[currentIndex].title}`}
              fill
              className="object-cover"
              priority
              onLoadingComplete={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
            <AnimatePresence>
              {!isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"
                />
              )}
            </AnimatePresence>
            <motion.div
              className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}>
              <motion.h2
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}>
                {cardData[currentIndex].title}
              </motion.h2>
              <motion.p
                className="text-lg sm:text-xl md:text-2xl text-white max-w-2xl mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}>
                {cardData[currentIndex].description}
              </motion.p>
              <motion.button
                className="bg-white text-black px-6 py-3 rounded-full font-semibold text-lg sm:text-xl hover:bg-opacity-90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}>
                Explore Now
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};