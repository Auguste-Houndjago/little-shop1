import ImageTransitionGallery from "./ImageTransitionGallery"


export default function GalleryScroll() {
    
const IMAGE_URLS = [
    '/background1.jpg',
    '/background1.jpg',
    '/background1.jpg'
  ]
  return (
    <div>
       <ImageTransitionGallery imageUrls={IMAGE_URLS} />
    </div>
  )
}
