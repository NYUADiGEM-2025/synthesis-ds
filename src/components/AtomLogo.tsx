import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function Orbit({ rotation, color }: { rotation: [number, number, number]; color: string }) {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[2.8, 0.02, 16, 100]} />
      <meshStandardMaterial color={color} opacity={0.3} transparent />
    </mesh>
  );
}

function Electron({ orbitRadius, speed, color, offset }: { orbitRadius: number; speed: number; color: string; offset: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() * speed + offset;
      meshRef.current.position.x = Math.cos(t) * orbitRadius;
      meshRef.current.position.z = Math.sin(t) * orbitRadius;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
}

function AtomScene() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Ambient and directional lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[0, 0, 0]} intensity={1} color="#78DCE8" />
      
      {/* No center nucleus - "Synthesis" text is the nucleus */}
      
      {/* Three orbits at different rotations to create sphere effect */}
      <Orbit rotation={[Math.PI / 2, 0, 0]} color="#78DCE8" />
      <Orbit rotation={[0, Math.PI / 2, 0]} color="#78DCE8" />
      <Orbit rotation={[Math.PI / 4, Math.PI / 4, 0]} color="#78DCE8" />
      
      {/* Electrons on different orbits */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <Electron orbitRadius={2.8} speed={0.5} color="#FF9B85" offset={0} />
      </group>
      <group rotation={[0, Math.PI / 2, 0]}>
        <Electron orbitRadius={2.8} speed={0.6} color="#FFE66D" offset={2} />
      </group>
      <group rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <Electron orbitRadius={2.8} speed={0.4} color="#78DCE8" offset={4} />
      </group>
    </group>
  );
}

export function AtomLogo() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: '100%', minHeight: '400px', padding: '2rem' }}>
      {/* 3D Canvas - positioned behind text */}
      <div className="absolute inset-0" style={{ pointerEvents: 'none', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <AtomScene />
        </Canvas>
      </div>

      {/* Synthesis text - the nucleus */}
      <h1 className="relative z-10 text-8xl md:text-9xl font-bold text-foreground font-inter tracking-tight"
          style={{
            textShadow: '0 0 40px rgba(120, 220, 232, 0.6), 0 0 80px rgba(120, 220, 232, 0.3)',
            filter: 'drop-shadow(0 0 20px rgba(120, 220, 232, 0.4))'
          }}>
        Synthesis
      </h1>
    </div>
  );
}
