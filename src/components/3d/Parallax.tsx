

import ImageTransitionGallery from "./galery/ImageTransitionGallery";



const Parallax = () => {

  const IMAGE_URLS = [
    '/images/hero/hero1.jpg',
    '/images/hero/hero2.jpg',
    '/images/hero/hero3.jpg',
    '/images/hero/hero1.jpg',
 
  ]
    return (
      <section className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
        <ImageTransitionGallery imageUrls={IMAGE_URLS} />
        </div>
  
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
      <h1>
        nklsnklnlklm,ksc,klkkkls
      </h1>

        </div>
      </section>
    );
  };
  
  export default Parallax;