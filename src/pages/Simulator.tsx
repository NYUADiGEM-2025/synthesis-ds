import { CentralDogmaSimulator } from "@/components/CentralDogmaSimulator";
import { Navigation } from "@/components/Navigation";

const Simulator = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <CentralDogmaSimulator />
      </div>
    </div>
  );
};

export default Simulator;
