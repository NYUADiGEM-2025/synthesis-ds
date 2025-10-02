import { useEffect, useState } from "react";

export function AtomLogo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative flex items-center justify-center" style={{ width: '100%', height: '400px' }}>

      {/* Electrons */}
      {mounted && (
        <>
          {/* Electron 1 - cyan */}
          <div 
            className="absolute w-6 h-6 rounded-full bg-[hsl(var(--egfp))] shadow-lg animate-orbit-1"
            style={{
              animation: 'orbit1 4s linear infinite',
            }}
          />
          
          {/* Electron 2 - coral/pink */}
          <div 
            className="absolute w-5 h-5 rounded-full bg-[hsl(var(--mrfp1))] shadow-lg animate-orbit-2"
            style={{
              animation: 'orbit2 3s linear infinite',
            }}
          />
          
          {/* Electron 3 - yellow */}
          <div 
            className="absolute w-5 h-5 rounded-full bg-[hsl(var(--accent))] shadow-lg animate-orbit-3"
            style={{
              animation: 'orbit3 5s linear infinite',
            }}
          />
        </>
      )}

      {/* Nucleus - Synthesis text */}
      <h1 className="relative z-10 text-8xl md:text-9xl font-bold text-foreground font-inter tracking-tight">
        Synthesis
      </h1>

      <style>{`
        @keyframes orbit1 {
          0% {
            transform: rotateZ(0deg) translateX(300px) rotateZ(0deg);
          }
          100% {
            transform: rotateZ(360deg) translateX(300px) rotateZ(-360deg);
          }
        }
        
        @keyframes orbit2 {
          0% {
            transform: rotateZ(120deg) translateX(280px) rotateZ(-120deg);
          }
          100% {
            transform: rotateZ(480deg) translateX(280px) rotateZ(-480deg);
          }
        }
        
        @keyframes orbit3 {
          0% {
            transform: rotateZ(240deg) translateX(290px) rotateZ(-240deg);
          }
          100% {
            transform: rotateZ(600deg) translateX(290px) rotateZ(-600deg);
          }
        }
      `}</style>
    </div>
  );
}
