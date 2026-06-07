/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio } from "@/components/ui/GlobalIcons";

interface LoadingScreenProps {
  onComplete: () => void;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const STATUSES = [
  "Syncing with the 22nd Century Labs...",
  "Initializing 4D Pocket Storage Cluster...",
  "Calibrating Bamboo Copter Gyros...",
  "Optimizing Anywhere Door Gateway Host...",
  "Deploying Computer Pencil Compiler...",
  "Powering up Memory Bread Cache...",
  "Welcome to the Future."
];

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isExiting, setIsExiting] = useState(false);
  const rippleIdCounter = useRef(0);

  // Organic custom progress interval
  useEffect(() => {
    let currentProgress = 0;
    let animationFrameId: number;
    let lastTime = performance.now();

    const updateProgress = (time: number) => {
      const deltaTime = time - lastTime;
      // Cap delta time to avoid large jumps if tab is inactive
      if (deltaTime > 100) lastTime = time;

      // Slower, smoother increment (approx 4-5 seconds total)
      const increment = 0.25 + Math.random() * 0.4;
      currentProgress = Math.min(100, currentProgress + increment);
      setProgress(Math.floor(currentProgress));

      if (currentProgress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Update Status index every 2 seconds
  useEffect(() => {
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => {
        if (prev < STATUSES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2200);

    return () => clearInterval(statusInterval);
  }, []);

  // Handle ripple placement
  const handleSpaceClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isExiting) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = rippleIdCounter.current++;
    
    setRipples((prev) => [...prev, { id, x, y }]);
    
    // Clear ripples to free memory
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 700);
  };

  const isFinished = progress >= 100;

  // Auto-complete 1.5s after loading finishes — no button needed
  useEffect(() => {
    if (!isFinished) return
    const t = setTimeout(() => {
      setIsExiting(true)
      setTimeout(onComplete, 2000)
    }, 1500)
    return () => clearTimeout(t)
  }, [isFinished])

  return (
    <div
      id="splash-loader"
      onClick={handleSpaceClick}
      className="text-[#141d21] overflow-hidden fixed inset-0 z-[100] w-full flex flex-col items-center justify-center select-none cursor-copy"
    >
      {/* Shutter Curtain (Slides bottom to top) */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-[#f4faff] z-[-1]"
        animate={isExiting ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 1.5, ease: [0.65, 0, 0.15, 1], delay: 0.4 }}
      />

      {/* Main Content (Fades out first) */}
      <motion.div
        animate={isExiting ? { opacity: 0, scale: 0.96 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full h-full flex flex-col items-center justify-center"
      >
        {/* Ambient Atmos Backdrops */}
        <div className="absolute rounded-full filter blur-[100px] z-0 opacity-30 w-[600px] h-[600px] bg-[#006494] -top-[10%] -right-[10%]" />
        <div className="absolute rounded-full filter blur-[100px] z-0 opacity-35 w-[500px] h-[500px] bg-[#fcd400] -bottom-[10%] -left-[10%]" />
        <div className="absolute rounded-full filter blur-[120px] z-0 opacity-[0.08] w-[400px] h-[400px] bg-[#ff6459] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        {/* Ripple render elements */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ transform: "scale(0) -translate(-50%, -50%)", opacity: 0.9 }}
              animate={{ transform: "scale(3.5) -translate(-50%, -50%)", opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: ripple.x,
                top: ripple.y,
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                backgroundColor: "rgba(0, 100, 148, 0.23)",
                pointerEvents: "none",
                zIndex: 30,
                transformOrigin: "center"
              }}
            />
          ))}
        </AnimatePresence>

        {/* Primary content area */}
        <div className="relative z-10 flex flex-col items-center max-w-[1200px] w-full px-6 text-center">
          
          {/* Float Animation Wrapper for Character */}
          <motion.div
            animate={{
              y: [-12, 12, -12],
              scale: [1, 1.015, 1],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative mb-8 group"
          >
            <div className="absolute inset-0 bg-[#00a0e9] rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
            
            {/* Main Hotlinked Doraemon Character */}
            <img
              id="doraemon-floating-avatar"
              alt="Doraemon Floating"
              className="w-56 md:w-72 h-auto mix-blend-multiply drop-shadow-[0_0_35px_rgba(0,160,233,0.35)] pointer-events-none"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWx3sRwSnplMPfzze2y5zf1ibh9zbKR42dFxJqWldEAxmzVZl88fE-R56JJrdBwk_9MF3FSpPkK96Y2-m3SGcxXY5IVCqJS1QXKGqMS-_5xxOMWTuc6ClWAaMElDA6O_B8fHNQQI4QRi-Od3_oSwCfyb21smOMkaBLOT0E01zxu6Bh45Im1O5bLbVnu6EdXebpW6PMb2dLzUL2lCSmRytZ9Kippww8nFummEKfrOacUt6qvkBILRjFBqWm9cSvYaUrOqiCiaMMGbLt"
            />
          </motion.div>

          {/* Branding Headers */}
          <div className="mb-6">
            <h1 className="font-display-lg text-5xl md:text-7xl text-[#006494] tracking-tight mb-2">
              Doraemon<span className="text-[#705d00]">Dev</span>
            </h1>
            <p className="font-label-md text-xs md:text-sm text-[#3e4851] uppercase tracking-[0.25em] font-semibold">
              Engineering the Future
            </p>
          </div>

          {/* Interactive progress assembly */}
          <div className="w-full max-w-[420px] relative mt-4">
            
            {/* Outer Track */}
            <div className="h-[18px] w-full bg-[#e6eff5] rounded-full overflow-hidden relative shadow-inner border border-[#bec8d2]/30">
              {/* Active loading flow */}
              <div
                id="active-progress-fill"
                className="absolute top-0 left-0 h-full bg-[#006494]"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-22deg]" />
              </div>
            </div>

            {/* Running character synchronized anchor */}
            <div
              id="mini-runner-anchor"
              className="absolute -top-[52px]"
              style={{ left: `calc(${progress}% - 24px)` }}
            >
              {/* Smaller running character with jump animation */}
              <motion.img
                animate={{
                  y: isFinished ? 0 : [0, -12, 0],
                }}
                transition={{
                  duration: 0.55,
                  repeat: isFinished ? 0 : Infinity,
                  ease: "easeOut",
                }}
                alt="Running Mini Doraemon"
                className="w-12 h-12 mix-blend-multiply"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWx3sRwSnplMPfzze2y5zf1ibh9zbKR42dFxJqWldEAxmzVZl88fE-R56JJrdBwk_9MF3FSpPkK96Y2-m3SGcxXY5IVCqJS1QXKGqMS-_5xxOMWTuc6ClWAaMElDA6O_B8fHNQQI4QRi-Od3_oSwCfyb21smOMkaBLOT0E01zxu6Bh45Im1O5bLbVnu6EdXebpW6PMb2dLzUL2lCSmRytZ9Kippww8nFummEKfrOacUt6qvkBILRjFBqWm9cSvYaUrOqiCiaMMGbLt"
              />
            </div>

            {/* Text Indicators */}
            <div className="flex justify-between items-center mt-3 px-1">
              <span className="font-code-sm text-sm text-[#006494] font-bold">
                {progress}%
              </span>
              <span className="font-code-sm text-xs text-[#6f7882] font-semibold">
                v2.1.12
              </span>
            </div>
          </div>

          {/* Dynamic status line updates */}
          <div id="status-terminal" className="mt-8 h-10 w-full flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={statusIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="font-body-md text-[#3e4851] text-sm md:text-base italic font-medium"
              >
                {isFinished ? "System fully operational!" : STATUSES[statusIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Auto-completes after 100% — no button shown */}
          <div className="mt-8 min-h-[40px]">
            <AnimatePresence>
              {isFinished && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#006494] text-sm font-bold tracking-wide"
                >
                  ✦ Launching...
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Fixed footer taglines */}
        <div className="fixed bottom-6 left-6 flex items-center gap-2 z-10 text-[#3e4851]">
          <Radio className="w-5 h-5 text-[#006494] animate-pulse" />
          <span className="font-label-md text-xs md:text-sm font-semibold tracking-wide">
            Connected to 22nd Century Labs
          </span>
        </div>
      </motion.div>
    </div>
  );
}
