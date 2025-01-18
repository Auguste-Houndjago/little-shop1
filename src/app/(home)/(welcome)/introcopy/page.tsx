
import ParallaxSmoother from "@/components/welocome/ImagesPage";
import { sections } from '@/components/animations/animation';

export default function page() {
 

  return (
    <div>
      <ParallaxSmoother sections={sections} />
    </div>
  );
}
