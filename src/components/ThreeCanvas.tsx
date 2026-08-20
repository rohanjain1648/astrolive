import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function StarField(props: any) {
  const ref = useRef<THREE.Points>(null!);
  
  // Generate spherical distribution of 2,400 cosmic particles
  const [positions, colors] = useMemo(() => {
    const count = 2400;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color('#a78bfa'), // Lavender Purple
      new THREE.Color('#ec4899'), // Pink
      new THREE.Color('#38bdf8'), // Sky Blue
      new THREE.Color('#fbbf24'), // Gold
      new THREE.Color('#f8fafc')  // Star White
    ];

    for (let i = 0; i < count; i++) {
      const radius = 15 + Math.random() * 25;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.02;
      ref.current.rotation.y -= delta * 0.03;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          vertexColors
          size={0.12}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function CelestialOrbitalRing({ radius, speed, tilt, color }: { radius: number; speed: number; tilt: [number, number, number]; color: string }) {
  const ringRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * speed;
    }
  });

  return (
    <group ref={ringRef} rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.02, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function CoreZodiacSphere() {
  const coreRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (coreRef.current) {
      const t = state.clock.getElapsedTime();
      coreRef.current.rotation.y = t * 0.15;
      coreRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
      const s = 1 + Math.sin(t * 0.8) * 0.03;
      coreRef.current.scale.set(s, s, s);
    }
  });

  return (
    <mesh ref={coreRef} position={[0, 0, -2]}>
      <icosahedronGeometry args={[2.2, 2]} />
      <meshStandardMaterial
        color="#7c3aed"
        emissive="#4c1d95"
        emissiveIntensity={0.8}
        wireframe
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

export const ThreeCanvas: React.FC = () => {
  return (
    <div className="three-canvas-container" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ec4899" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#7c3aed" />

        <StarField />
        <CoreZodiacSphere />
        
        {/* Multidimensional Astrological Celestial Rings */}
        <CelestialOrbitalRing radius={4.2} speed={0.12} tilt={[Math.PI / 6, Math.PI / 4, 0]} color="#a78bfa" />
        <CelestialOrbitalRing radius={5.8} speed={-0.08} tilt={[Math.PI / 3, -Math.PI / 6, Math.PI / 8]} color="#f472b6" />
        <CelestialOrbitalRing radius={7.4} speed={0.06} tilt={[-Math.PI / 4, Math.PI / 3, 0]} color="#38bdf8" />
        <CelestialOrbitalRing radius={9.0} speed={-0.04} tilt={[Math.PI / 8, Math.PI / 8, Math.PI / 4]} color="#fbbf24" />
      </Canvas>
    </div>
  );
};
