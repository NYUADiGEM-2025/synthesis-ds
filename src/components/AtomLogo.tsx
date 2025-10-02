import { useEffect, useState } from "react";

export function AtomLogo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative flex items-center justify-center" style={{ width: '100%', height: '400px' }}>
      {/* Orbital rings with 3D rotation */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Ring 1 - horizontal ellipse */}
        <div 
          className="absolute border-2 border-primary/30 rounded-full"
          style={{
            width: '600px',
            height: '200px',
            transform: 'rotateX(75deg)',
          }}
        />
        
        {/* Ring 2 - diagonal */}
        <div 
          className="absolute border-2 border-primary/30 rounded-full"
          style={{
            width: '600px',
            height: '200px',
            transform: 'rotateX(75deg) rotateZ(60deg)',
          }}
        />
        
        {/* Ring 3 - diagonal opposite */}
        <div 
          className="absolute border-2 border-primary/30 rounded-full"
          style={{
            width: '600px',
            height: '200px',
            transform: 'rotateX(75deg) rotateZ(-60deg)',
          }}
        />
      </div>

      {/* Electrons moving along the orbital paths */}
      {mounted && (
        <>
          {/* Electron 1 - cyan on horizontal orbit */}
          <div 
            className="absolute"
            style={{
              transform: 'rotateX(75deg)',
            }}
          >
            <div 
              className="w-6 h-6 rounded-full bg-[hsl(var(--egfp))] shadow-lg"
              style={{
                position: 'absolute',
                animation: 'orbit1 4s linear infinite',
              }}
            />
          </div>
          
          {/* Electron 2 - coral/pink on diagonal orbit */}
          <div 
            className="absolute"
            style={{
              transform: 'rotateX(75deg) rotateZ(60deg)',
            }}
          >
            <div 
              className="w-5 h-5 rounded-full bg-[hsl(var(--mrfp1))] shadow-lg"
              style={{
                position: 'absolute',
                animation: 'orbit2 3s linear infinite',
              }}
            />
          </div>
          
          {/* Electron 3 - yellow on opposite diagonal orbit */}
          <div 
            className="absolute"
            style={{
              transform: 'rotateX(75deg) rotateZ(-60deg)',
            }}
          >
            <div 
              className="w-5 h-5 rounded-full bg-[hsl(var(--accent))] shadow-lg"
              style={{
                position: 'absolute',
                animation: 'orbit3 5s linear infinite',
              }}
            />
          </div>
        </>
      )}

      {/* Nucleus - Synthesis text */}
      <h1 className="relative z-10 text-8xl md:text-9xl font-bold text-foreground font-inter tracking-tight">
        Synthesis
      </h1>

      <style>{`
        @keyframes orbit1 {
          0% {
            left: 50%;
            top: 50%;
            margin-left: 300px;
            margin-top: 0px;
          }
          25% {
            left: 50%;
            top: 50%;
            margin-left: 0px;
            margin-top: 100px;
          }
          50% {
            left: 50%;
            top: 50%;
            margin-left: -300px;
            margin-top: 0px;
          }
          75% {
            left: 50%;
            top: 50%;
            margin-left: 0px;
            margin-top: -100px;
          }
          100% {
            left: 50%;
            top: 50%;
            margin-left: 300px;
            margin-top: 0px;
          }
        }
        
        @keyframes orbit2 {
          0% {
            left: 50%;
            top: 50%;
            margin-left: 300px;
            margin-top: 0px;
          }
          25% {
            left: 50%;
            top: 50%;
            margin-left: 0px;
            margin-top: 100px;
          }
          50% {
            left: 50%;
            top: 50%;
            margin-left: -300px;
            margin-top: 0px;
          }
          75% {
            left: 50%;
            top: 50%;
            margin-left: 0px;
            margin-top: -100px;
          }
          100% {
            left: 50%;
            top: 50%;
            margin-left: 300px;
            margin-top: 0px;
          }
        }
        
        @keyframes orbit3 {
          0% {
            left: 50%;
            top: 50%;
            margin-left: 300px;
            margin-top: 0px;
          }
          25% {
            left: 50%;
            top: 50%;
            margin-left: 0px;
            margin-top: 100px;
          }
          50% {
            left: 50%;
            top: 50%;
            margin-left: -300px;
            margin-top: 0px;
          }
          75% {
            left: 50%;
            top: 50%;
            margin-left: 0px;
            margin-top: -100px;
          }
          100% {
            left: 50%;
            top: 50%;
            margin-left: 300px;
            margin-top: 0px;
          }
        }
      `}</style>
    </div>
  );
}
