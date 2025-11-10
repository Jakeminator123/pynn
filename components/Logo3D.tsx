"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Group } from "three";
import * as THREE from "three";

// Component for the 3D model
function Model({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const modelRef = useRef<Group>(null);
  const targetRotation = useRef({ x: 0, y: 0, z: 0 });
  const isInitialized = useRef(false);

  // Load the model - hooks must be called unconditionally
  const gltf = useGLTF("/Pynn_Logo_3d.glb");

  useFrame((state, delta) => {
    if (!modelRef.current || !gltf?.scene) return;

    // Initialize rotation to 0 (facing forward) on first frame
    if (!isInitialized.current) {
      modelRef.current.rotation.x = 0;
      modelRef.current.rotation.y = 0;
      modelRef.current.rotation.z = 0;
      isInitialized.current = true;
    }

    // Calculate target rotation based on mouse position
    // Increased multipliers for more responsive movement
    targetRotation.current.x = -mousePosition.y * 0.25;
    targetRotation.current.y = mousePosition.x * 0.3;
    // Add Z rotation (roll) based on diagonal mouse movement
    targetRotation.current.z = mousePosition.x * mousePosition.y * 0.15;

    // Faster interpolation for more responsive movement
    modelRef.current.rotation.x = THREE.MathUtils.lerp(
      modelRef.current.rotation.x,
      targetRotation.current.x,
      0.06
    );
    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      modelRef.current.rotation.y,
      targetRotation.current.y,
      0.06
    );
    modelRef.current.rotation.z = THREE.MathUtils.lerp(
      modelRef.current.rotation.z,
      targetRotation.current.z,
      0.06
    );

    // Very gentle floating animation
    modelRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
  });

  if (!gltf?.scene) return null;

  // No rotation - logo should face forward correctly
  const modelRotation: [number, number, number] = [0, 0, 0];

  return (
    <group ref={modelRef} rotation={[0, 0, 0]}>
      <primitive
        object={gltf.scene}
        scale={[2, 2, 2]}
        position={[0, 0, 0]}
        rotation={modelRotation}
      />
    </group>
  );
}

// Main component
export default function Logo3D({
  className = "",
  onError,
}: {
  className?: string;
  onError?: () => void;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1 to 1, but with deadzone in center
      // This makes the logo stay more centered/straight
      const rawX = (e.clientX / window.innerWidth) * 2 - 1;
      const rawY = -(e.clientY / window.innerHeight) * 2 + 1;

      // Reduced deadzone and increased sensitivity for more responsive movement
      const deadzone = 0.15;
      const x = Math.abs(rawX) > deadzone ? rawX * 0.8 : rawX * 0.5;
      const y = Math.abs(rawY) > deadzone ? rawY * 0.8 : rawY * 0.5;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (loadError) {
    return null;
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#60a5fa" />
        <pointLight position={[10, -10, 5]} intensity={0.3} color="#818cf8" />

        {/* 3D Model */}
        <Suspense fallback={null}>
          <Model mousePosition={mousePosition} />
        </Suspense>

        {/* Disabled auto-rotation - logo stays facing viewer */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
