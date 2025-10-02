import { useEffect, useState } from "react";

export function SynthesisWordmark() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const letters = "Synthesis".split("");

  return (
    <div className="relative inline-flex items-baseline justify-center group">
      {/* The wordmark */}
      <h1 
        className="relative text-8xl md:text-9xl font-bold font-inter tracking-tight select-none"
        style={{
          background: 'linear-gradient(180deg, hsl(var(--foreground)) 0%, hsl(var(--foreground) / 0.7) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 1px 0 rgba(0,0,0,0.15), 0 12px 30px rgba(0,0,0,0.08)',
          WebkitTextStroke: '1px rgba(0,0,0,0.08)',
          transition: 'transform 200ms ease-out',
        }}
      >
        {letters.map((letter, index) => {
          const isI = letter === 'i';
          
          return (
            <span
              key={index}
              className="relative inline-block"
              style={{
                animation: mounted ? `letterFadeIn 0.6s ease-out forwards ${index * 50}ms` : 'none',
                opacity: mounted ? 1 : 0,
              }}
            >
              {isI ? (
                // Special handling for 'i' - render without dot
                <span className="relative">
                  <span style={{ visibility: 'hidden' }}>i</span>
                  <span 
                    className="absolute inset-0"
                    style={{
                      WebkitTextStroke: '1px rgba(0,0,0,0.08)',
                    }}
                  >
                    ı
                  </span>
                  
                  {/* Electron replacing the dot */}
                  <span
                    className="absolute -top-2 left-1/2 -translate-x-1/2"
                    style={{
                      animation: mounted ? 'electronOrbit 7s ease-in-out infinite' : 'none',
                      transformOrigin: 'center center',
                    }}
                  >
                    <span 
                      className="block w-3 h-3 rounded-full shadow-lg"
                      style={{
                        background: 'hsl(var(--egfp))',
                        boxShadow: '0 0 12px hsl(var(--egfp) / 0.6), 0 2px 4px rgba(0,0,0,0.2)',
                        transition: 'animation-duration 200ms',
                      }}
                    />
                  </span>

                  {/* SVG orbit line */}
                  <svg
                    className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none"
                    width="40"
                    height="60"
                    viewBox="0 0 40 60"
                    style={{
                      animation: mounted ? 'orbitRotate 7s ease-in-out infinite' : 'none',
                    }}
                  >
                    <defs>
                      <clipPath id="orbitClip">
                        {/* Mask to make orbit appear behind/in front of letters */}
                        <rect x="0" y="0" width="40" height="25" />
                        <rect x="0" y="35" width="40" height="25" />
                      </clipPath>
                    </defs>
                    <ellipse
                      cx="20"
                      cy="30"
                      rx="14"
                      ry="22"
                      fill="none"
                      stroke="hsl(var(--foreground))"
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity="0.3"
                      clipPath="url(#orbitClip)"
                    />
                  </svg>
                </span>
              ) : (
                letter
              )}
            </span>
          );
        })}
      </h1>

      <style>{`
        @keyframes letterFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes electronOrbit {
          0%, 100% {
            transform: translate(-50%, 0) translateY(0);
          }
          25% {
            transform: translate(-50%, 0) translateY(-8px) translateX(6px);
          }
          50% {
            transform: translate(-50%, 0) translateY(0) translateX(0);
          }
          75% {
            transform: translate(-50%, 0) translateY(8px) translateX(-6px);
          }
        }

        @keyframes orbitRotate {
          0%, 100% {
            transform: translate(-50%, 0) rotate(0deg);
          }
          50% {
            transform: translate(-50%, 0) rotate(180deg);
          }
        }

        /* Hover effects */
        .group:hover h1 {
          transform: rotateZ(1.5deg) scale(1.01);
        }

        .group:hover [style*="electronOrbit"] {
          animation-duration: 5s !important;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          .group:hover h1 {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
