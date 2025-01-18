import RevealWrapper from "@/components/animations/RevealWrapper";
import Rideau from "@/components/animations/rideaux";


const Home = () => {
  return (
  <div className="h-screen w-full">
<RevealWrapper delay={0.5}  >
    <div className="min-h-screen bg-yellow-400 text-white p-6">
        <h1 className="text-4xl font-bold text-center">Bienvenue</h1>
        <p className="mt-4 text-center">
          Faites défiler pour ouvrir progressivement le cadre sombre.
        </p>
       
      </div>
      </RevealWrapper>


      </div>
  );
};

export default Home;
