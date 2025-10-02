import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AtomLogo } from "@/components/AtomLogo";
import { Dna } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <AtomLogo />
          <p className="text-2xl md:text-3xl text-muted-foreground font-inter font-light mb-12">
            warning: this site may talk about biology
          </p>
          <Link to="/simulator">
            <Button size="lg" className="text-lg px-8 py-6 font-inter">
              Launch Simulator
            </Button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Dna className="w-20 h-20 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-inter">
            The central dogma, visualized
          </h2>
          <p className="text-xl text-muted-foreground font-inter font-light leading-relaxed">
            An interactive gene design and expression simulator integrating synthetic-biology principles 
            with the central dogma of molecular biology. Design your plasmid, select coding sequences, 
            and watch DNA transcribe to RNA and translate to proteins in real-time.
          </p>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-16 font-inter">
            How it works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-6xl mb-4">🧬</div>
              <h3 className="text-2xl font-bold text-foreground mb-4 font-inter">Design</h3>
              <p className="text-muted-foreground font-inter font-light">
                Select coding sequences from the parts bin and build your custom plasmid. 
                Choose from fluorescent proteins like EGFP, mRFP1, and mTagBFP2.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-6xl mb-4">▶️</div>
              <h3 className="text-2xl font-bold text-foreground mb-4 font-inter">Simulate</h3>
              <p className="text-muted-foreground font-inter font-light">
                Launch the simulation and watch the central dogma unfold step by step. 
                See DNA transcription and RNA translation in action.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-2xl font-bold text-foreground mb-4 font-inter">Visualize</h3>
              <p className="text-muted-foreground font-inter font-light">
                Experience beautiful animations showing molecular processes. 
                Perfect for learning and understanding gene expression.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
