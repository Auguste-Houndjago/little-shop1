
import ParallaxSmoother from "@/components/welocome/ImagesPage";


export default function page() {
  const sections = [
    {
      image: "/background1.jpg",
      content: (
        <div className="text-white">
          <h2 className="text-5xl font-bold mb-4">Premier titre</h2>
          <p className="text-xl leading-relaxed">Votre contenu...</p>
        </div>
      ),
      layout: {
        imageWidth: 'w-2/3', // Largeur de l'image
        imagePosition: 'left-0', // Image alignée à gauche
        contentPosition: 'items-center ', // Texte centré verticalement
        imageParallaxSpeed: -1.5, // Vitesse de parallaxe
        marginTop: 'mt-8', // Marges hautes
      },
    },
    {
      image: "/profil_pic.jpg",
      content: (
        <div className="text-white">
          <h2 className="text-5xl font-bold mb-4">Deuxième titre</h2>
          <p className="text-xl leading-relaxed">Un autre contenu...</p>
        </div>
      ),
      layout: {
        imageWidth: 'w-1/2 h-1/2', // Largeur de l'image
        imagePosition: 'right-0', // Image alignée à droite
        contentPosition: 'items-end', // Texte aligné en bas
        imageParallaxSpeed: -0.8, // Vitesse de parallaxe
        marginBottom: 'mt-12', // Marges basses
        marginTop: 'mt-20', // Marges hautes
      },
    },
  ];

  return (
    <div>
      <ParallaxSmoother sections={sections} />
    </div>
  );
}
