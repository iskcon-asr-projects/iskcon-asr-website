"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import * as THREE from "three";

function Fireflies({ count = 1500 }) {
  const points = useRef<THREE.Points>(null);
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x -= delta * 0.02;
      points.current.rotation.y -= delta * 0.03;
      points.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#C5A059" size={0.03} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.6} />
      </Points>
    </group>
  );
}

export default function MagicalBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] bg-transparent">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
        frameloop="demand"  // ← KEY FIX: only renders when needed, prevents WebGL crash
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0); // transparent background
        }}
      >
        <Fireflies count={1500} />
      </Canvas>
    </div>
  );
}
