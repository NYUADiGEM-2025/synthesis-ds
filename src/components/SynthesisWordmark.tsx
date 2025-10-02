import { useEffect, useState } from "react";

const SynthesisWordmark = () => {
  const [parallaxY, setParallaxY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      // Gentle parallax: watermark moves 2-4px slower, clamped to max 4px
      const parallax = Math.min(scrolled * 0.15, 4);
      setParallaxY(parallax);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion]);

  return (
    <div className="relative inline-block">
      {/* Static atom watermark behind text */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          transform: prefersReducedMotion ? 'none' : `translateY(${parallaxY}px)`,
          transition: 'transform 0.1s ease-out',
          left: '50%',
          top: '50%',
          width: '120%',
          height: '120%',
          marginLeft: '-60%',
          marginTop: '-60%',
        }}
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Three elliptical orbits */}
        <ellipse
          cx="200"
          cy="100"
          rx="80"
          ry="30"
          stroke="rgba(2,6,23,0.10)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <ellipse
          cx="200"
          cy="100"
          rx="80"
          ry="30"
          stroke="rgba(2,6,23,0.10)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
          transform="rotate(60 200 100)"
        />
        <ellipse
          cx="200"
          cy="100"
          rx="80"
          ry="30"
          stroke="rgba(2,6,23,0.10)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
          transform="rotate(120 200 100)"
        />
        {/* Nucleus dot */}
        <circle
          cx="200"
          cy="100"
          r="4"
          fill="rgba(2,6,23,0.06)"
        />
      </svg>

      {/* Subtle noise overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABnRSTlMGBgYGBgYGBga9YPsAAAA5SURBVHgBY2BgYGBhYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGAAAQYAJpgBBxCpQ0QAAAAASUVORK5CYII=")`,
          backgroundRepeat: 'repeat',
          opacity: 0.04,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Wordmark text */}
      <h1 
        className="relative text-6xl md:text-8xl font-black text-[#0F172A] mb-8"
        style={{
          fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
          fontWeight: 900,
          letterSpacing: '-0.02em',
          textShadow: '0 8px 32px rgba(2,6,23,0.08)',
        }}
      >
        Synthesis
      </h1>
    </div>
  );
};

export default SynthesisWordmark;
