import ImageTransitionGallery from "@/components/3d/galery/ImageTransitionGallery"


export default function page() {

  const IMAGE_URLS = [
    '/images/hero/hero2.jpg',
    '/images/hero/hero1.jpg',
    '/images/hero/hero2.jpg',
    '/images/hero/hero3.jpg',
    '/images/hero/hero1.jpg',
 
  ]
  return (
    <div>
   <ImageTransitionGallery  imageUrls={IMAGE_URLS} />
    </div>
  )
}
