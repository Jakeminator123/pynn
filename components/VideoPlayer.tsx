"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlayIcon,
  PauseIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/solid";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
}

export default function VideoPlayer({
  src,
  poster,
  title = "Pynn Introduction Video",
  className = "",
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => setIsLoaded(true);
    const handleError = () => {
      setHasError(true);
      setIsLoaded(true);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("error", handleError);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("error", handleError);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  // Hide controls when playing, show on hover/pause
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => setShowControls(false), 2000);
      return () => clearTimeout(timer);
    } else {
      setShowControls(true);
    }
  }, [isPlaying]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      video.requestFullscreen().catch((err) => {
        // Silently handle fullscreen errors in production
        if (process.env.NODE_ENV === 'development') {
          console.error("Error attempting to enable fullscreen:", err);
        }
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowControls(true);
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative group ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        setShowControls(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (isPlaying) {
          setTimeout(() => setShowControls(false), 2000);
        }
      }}
    >
      <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-900/20 to-indigo-900/20 backdrop-blur-sm border border-white/10">
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-2xl p-8 min-h-[300px]">
            <p className="text-white text-lg font-semibold mb-2">
              Video unavailable
            </p>
            <p className="text-white/70 text-sm">
              The video could not be loaded.
            </p>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            className="w-full h-auto rounded-2xl cursor-pointer"
            onEnded={handleVideoEnd}
            onClick={handleVideoClick}
            playsInline
            preload="metadata"
            muted={isMuted}
            aria-label={title}
          />
        )}

        {/* Loading state */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-2xl min-h-[300px] pointer-events-none">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}

        {/* Controls overlay - only show when not playing or on hover */}
        <AnimatePresence>
          {showControls && isLoaded && !hasError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 pointer-events-none"
            >
              {/* Play/Pause button - only when paused or hovering */}
              {(!isPlaying || isHovered) && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={togglePlay}
                    className="bg-black/40 backdrop-blur-sm rounded-full p-4 hover:bg-black/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    <motion.div
                      className="bg-white/90 rounded-full p-4 shadow-xl"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isPlaying ? (
                        <PauseIcon className="w-8 h-8 text-blue-600" />
                      ) : (
                        <PlayIcon className="w-8 h-8 text-blue-600 ml-1" />
                      )}
                    </motion.div>
                  </motion.button>
                </div>
              )}

              {/* Bottom controls bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-4 pointer-events-auto">
                <div className="flex items-center justify-between gap-4">
                  {/* Title */}
                  {title && !isPlaying && (
                    <div className="bg-gradient-to-r from-blue-600/90 to-indigo-600/90 backdrop-blur-md rounded-lg px-4 py-2 text-white text-sm font-semibold shadow-lg">
                      {title}
                    </div>
                  )}

                  {/* Control buttons */}
                  <div className="flex items-center gap-2 ml-auto">
                    {/* Mute/Unmute button */}
                    <motion.button
                      onClick={toggleMute}
                      className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isMuted ? (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 01-1.343 4.472l-1.03-1.03A6.5 6.5 0 0016.5 10a6.5 6.5 0 00-1.873-4.442l-1.03-1.03A8 8 0 0118 10zM9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4-3.707a1 1 0 011.617.793z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4-3.707a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </motion.button>

                    {/* Fullscreen button */}
                    <motion.button
                      onClick={toggleFullscreen}
                      className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                      aria-label="Toggle fullscreen"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowsPointingOutIcon className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
