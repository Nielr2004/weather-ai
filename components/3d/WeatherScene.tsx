'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cloud } from '@react-three/drei';
import * as THREE from 'three';

// Maps Open-Meteo weather codes to simplified conditions
const getWeatherCondition = (code: number | undefined): string => {
  if (code === undefined) return 'default';
  if ([0, 1].includes(code)) return 'sunny';
  if ([2, 3].includes(code)) return 'cloudy';
  if (code >= 51 && code <= 67) return 'rainy'; // Drizzle, Rain
  if (code >= 71 && code <= 77) return 'snowy'; // Snow
  if (code >= 95) return 'stormy'; // Thunderstorm
  return 'cloudy';
};

// --- 3D Components ---

const Sunny = () => (
  <mesh scale={1.5}>
    <sphereGeometry args={[1, 32, 32]} />
    <meshStandardMaterial color="yellow" emissive="yellow" emissiveIntensity={2} />
  </mesh>
);

const Cloudy = () => (
  <group>
    <Cloud position={[-4, -2, 0]} speed={0.2} opacity={0.8} />
    <Cloud position={[4, 2, -2]} speed={0.2} opacity={0.6} />
    <Cloud position={[0, 0, 0]} speed={0.2} opacity={1} />
  </group>
);

const Rainy = () => {
  const rainRef = useRef<THREE.Points>(null!);
  const rainCount = 5000;
  const positions = useMemo(() => {
    const pos = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = Math.random() * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [rainCount]);

  useFrame(() => {
    if (rainRef.current) {
      const positions = rainRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < rainCount; i++) {
        positions[i * 3 + 1] -= 0.1; // Move down
        if (positions[i * 3 + 1] < -10) {
          positions[i * 3 + 1] = 10; // Reset to top
        }
      }
      rainRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={rainRef}>
      <bufferGeometry>
        {/* FIX: Removed args={[]} from here */}
        <bufferAttribute attach="attributes-position" count={rainCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="lightblue" size={0.05} transparent opacity={0.7} />
    </points>
  );
};

const Snowy = () => {
  const snowRef = useRef<THREE.Points>(null!);
  const snowCount = 3000;
  const positions = useMemo(() => {
    const pos = new Float32Array(snowCount * 3);
    for (let i = 0; i < snowCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = Math.random() * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [snowCount]);

  useFrame((state) => {
    if (snowRef.current) {
      const positions = snowRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < snowCount; i++) {
        positions[i * 3 + 1] -= 0.02; 
        positions[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.001; 
        
        if (positions[i * 3 + 1] < -10) {
          positions[i * 3 + 1] = 10; // Reset to top
        }
      }
      snowRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={snowRef}>
      <bufferGeometry>
        {/* FIX: Removed args={[]} from here */}
        <bufferAttribute attach="attributes-position" count={snowCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="white" size={0.08} transparent opacity={0.8} />
    </points>
  );
};


export const WeatherScene = ({ weatherCode }: { weatherCode: number | undefined }) => {
  const condition = getWeatherCondition(weatherCode);

  switch (condition) {
    case 'sunny':
      return <Sunny />;
    
    case 'snowy':
      return (
        <>
          <Cloudy />
          <Snowy />
        </>
      );

    case 'rainy':
    case 'stormy':
      return (
        <>
          <Cloudy />
          <Rainy />
        </>
      );
    
    case 'cloudy':
    default:
      return <Cloudy />;
  }
};