"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { siteContent } from "@/lib/content";

// Dynamically import Logo3D to avoid SSR issues with Three.js
const Logo3D = dynamic(() => import("./Logo3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <Image
        src={siteContent.logo.url}
        alt={siteContent.logo.alt}
        width={300}
        height={120}
        className="w-full h-auto relative z-10 drop-shadow-2xl filter brightness-110 animate-pulse"
        priority
      />
    </div>
  ),
});

export default function Logo3DWrapper({ className = "" }: { className?: string }) {
  const [hasError, setHasError] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if the 3D model file exists
    fetch("/Pynn_Logo_3d.glb", { method: "HEAD" })
      .then((response) => {
        if (!response.ok) {
          setHasError(true);
        }
        setIsChecking(false);
      })
      .catch(() => {
        setHasError(true);
        setIsChecking(false);
      });
  }, []);

  if (isChecking) {
    // Show loading state
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <Image
          src={siteContent.logo.url}
          alt={siteContent.logo.alt}
          width={300}
          height={120}
          className="w-full h-auto relative z-10 drop-shadow-2xl filter brightness-110 animate-pulse"
          priority
          loading="eager"
        />
      </div>
    );
  }

  if (hasError) {
    // Fallback to regular logo if 3D file doesn't exist
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <Image
          src={siteContent.logo.url}
          alt={siteContent.logo.alt}
          width={300}
          height={120}
          className="w-full h-auto relative z-10 drop-shadow-2xl filter brightness-110"
          priority
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <Logo3D onError={() => setHasError(true)} />
    </div>
  );
}
