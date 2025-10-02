export function AtomLogo() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: '100%', minHeight: '400px', padding: '2rem' }}>
      {/* Atom SVG - positioned behind text */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        style={{ pointerEvents: 'none', zIndex: 0 }}
        viewBox="0 0 800 400" 
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Center point for reference */}
        <g transform="translate(400, 200)">
          {/* Elliptical orbit 1 - rotated */}
          <ellipse
            cx="0"
            cy="0"
            rx="280"
            ry="120"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.3"
            transform="rotate(60)"
          />
          
          {/* Elliptical orbit 2 - rotated differently */}
          <ellipse
            cx="0"
            cy="0"
            rx="280"
            ry="120"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.3"
            transform="rotate(-60)"
          />
          
          {/* Elliptical orbit 3 - horizontal */}
          <ellipse
            cx="0"
            cy="0"
            rx="280"
            ry="120"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.3"
            transform="rotate(0)"
          />
          
          {/* Center nucleus */}
          <circle
            cx="0"
            cy="0"
            r="20"
            fill="#78DCE8"
          />
          
          {/* Electron 1 - coral/pink on orbit 1 */}
          <circle
            cx="240"
            cy="-60"
            r="12"
            fill="#FF9B85"
          />
          
          {/* Electron 2 - yellow on orbit 2 */}
          <circle
            cx="-200"
            cy="80"
            r="12"
            fill="#FFE66D"
          />
          
          {/* Electron 3 - cyan on orbit 3 */}
          <circle
            cx="180"
            cy="90"
            r="12"
            fill="#78DCE8"
          />
        </g>
      </svg>

      {/* Synthesis text - positioned above SVG */}
      <h1 className="relative z-10 text-8xl md:text-9xl font-bold text-foreground font-inter tracking-tight">
        Synthesis
      </h1>
    </div>
  );
}
