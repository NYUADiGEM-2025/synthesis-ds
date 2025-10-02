import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AtomLogo } from "@/components/AtomLogo";
import { Dna } from "lucide-react";
import { useEffect, useState } from "react";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <div 
          className="max-w-7xl mx-auto text-center"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            opacity: 1 - scrollY / 600
          }}
        >
          <AtomLogo />
          <p className="text-2xl md:text-3xl text-muted-foreground font-inter font-light mb-12">
            Warning: This site may talk about Biology.
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
          <div className="flex justify-center mb-6">
            <Dna className="w-16 h-16 text-primary" />
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

      {/* What is Synthesis Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 font-inter">
            What is Synthesis?
          </h2>
          <p className="text-xl text-muted-foreground font-inter font-light leading-relaxed">
            Learning biology can feel tedious, even with the endless content online, most of it 
            assumes you already know the basics. In an age that favors compact, snackable 
            information and shrinking attention spans, long lecture-style explanations lose people 
            fast. So we built <span className="font-semibold text-foreground">Synthesis</span>, a web app from the NYUAD iGEM 2025 team, that turns 
            explanations into action: drag parts to design plasmids and watch DNA → RNA → 
            protein play out in real time—quick, interactive, and jargon-light.
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

      {/* The Biology Behind it Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 font-inter">
            The Biology Behind it
          </h2>
          
          <div className="space-y-6 text-lg text-muted-foreground font-inter leading-relaxed">
            <div className="flex gap-4">
              <span className="text-foreground">-</span>
              <p>
                The foundation of Molecular Biology is built on the Central Dogma Theory. Discovered 
                by Francis Crick, this theory explains the flow of genetic information in cells. Cells move 
                information <span className="font-semibold text-foreground">from DNA → RNA → protein</span>. DNA stores the instructions, RNA is a 
                working copy made by RNA polymerase (<span className="font-semibold text-foreground">transcription</span>), and ribosomes read that RNA 
                in three-letter <span className="font-semibold text-foreground">codons</span> to build a protein (<span className="font-semibold text-foreground">translation</span>). Change the DNA and you can 
                change the protein's sequence—and its function.<sup>1</sup>
              </p>
            </div>

            <p className="pl-8">
              So then what's synthetic biology? Synthetic biology is the practice of redesigning 
              organisms by <span className="font-semibold text-foreground">editing and assembling DNA</span> so cells do specific, useful tasks. By 
              choosing parts such as promoters, coding sequences, and regulators, researchers 
              program microbes to produce drugs, recycle waste, sense toxins, or improve agriculture.<sup>2</sup> In short, it's biology built <span className="font-semibold text-foreground">like engineering</span>.
            </p>

            <p className="pl-8">
              In the lab, we load <span className="font-semibold text-foreground">genes that encode the abilities we want</span> onto a circular DNA 
              <span className="font-semibold text-foreground"> plasmid</span>- a small, self-replicating DNA molecule - and introduce it into bacteria such as 
              <em> E. coli</em> (<span className="font-semibold text-foreground">transformation</span>). Cells that keep the plasmid gain the encoded trait—for 
              example, producing fluorescent proteins that glow under UV light.
            </p>
          </div>
        </div>
      </section>

      {/* Parts Library Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 font-inter">
            Parts library
          </h2>
          
          <div className="space-y-8 text-lg text-muted-foreground font-inter leading-relaxed">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4 font-inter">
                Plasmid backbone
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-semibold text-foreground">pSB1C3 (BioBrick standard):</span> A circular DNA "carrier" that holds your gene and lets 
                  bacteria copy it. It includes the pieces a cell needs to keep the DNA (origin of 
                  replication) and select for it (antibiotic marker), so your gene can be maintained and 
                  expressed reliably.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4 font-inter">
                Coding Sequences (CDS)
              </h3>
              <p className="mb-4">
                A CDS is the stretch of DNA that actually <span className="font-semibold text-foreground">codes for a protein</span> - it's what ribosomes read (via 
                mRNA) to build the amino-acid chain. Swapping the CDS changes <span className="font-semibold text-foreground">which protein</span> the cell 
                makes.
              </p>
              <ul className="space-y-2">
                <li>
                  <span className="font-semibold text-foreground">I. EGFP:</span> Enhanced Green Fluorescent Protein; bright green reporter widely used in labs.
                </li>
                <li>
                  <span className="font-semibold text-foreground">II. mRFP1:</span> Monomeric Red Fluorescent Protein; classic red reporter derived from DsRed.
                </li>
                <li>
                  <span className="font-semibold text-foreground">III. mTagBFP2:</span> Bright blue fluorescent protein optimized for clear, high-contrast blue signals.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4 font-inter">
                How to use these parts
              </h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Pick a CDS from the Parts Bin and drag it onto the plasmid workspace.</li>
                <li>Press <span className="font-semibold text-foreground">Start Simulation</span> to see DNA → RNA → protein play out.</li>
                <li>Compare reporters (green/red/blue) to see how swapping the CDS changes the output while the backbone stays the same.</li>
              </ol>
            </div>

            <div>
              <p>
                <span className="italic">Coming soon:</span> promoters/RBS/terminators and more reporters—so you can explore expression 
                strength, timing, and regulation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* References Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 font-inter">
            References
          </h2>
          
          <div className="space-y-4 text-lg text-muted-foreground font-inter leading-relaxed">
            <p>
              (1) National Human Genome Research Institute. <span className="italic">Synthetic Biology</span>. Genome.gov. 
              https://www.genome.gov/about-genomics/policy-issues/Synthetic-Biology.
            </p>
            <p>
              (2) LibreTexts. <span className="italic">4.1: Central Dogma of Molecular Biology</span>. Biology LibreTexts. 
              https://bio.libretexts.org/Bookshelves/Introductory_and_General_Biology/Introductory_Biology_(CK-12)/04%3A_Molecular_Biology/4.01%3A_Central_Dogma_of_Molecular_Biology.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
