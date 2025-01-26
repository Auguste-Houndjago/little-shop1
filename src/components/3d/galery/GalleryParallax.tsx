import ImageTransitionGallery from "./ImageTransitionGallery"


export default function GalleryParallax() {
    
const IMAGE_URLS = [
  '/images/hero/hero1.jpg',
  '/images/hero/hero2.jpg',
  '/images/hero/hero3.jpg',
  '/images/hero/hero1.jpg',
  ]
  return (
    <div className="min-w-max h-[400px]">
       <ImageTransitionGallery imageUrls={IMAGE_URLS} />
    </div>
  )
}
