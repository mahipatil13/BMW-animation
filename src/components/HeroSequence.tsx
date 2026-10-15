"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";

const TOTAL_FRAMES = 240;

export default function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Array of loaded images: index 1 to 240
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [firstFrameReady, setFirstFrameReady] = useState<boolean>(false);

  // Interpolated frame tracking
  const targetFrameRef = useRef<number>(1);
  const currentFrameRef = useRef<number>(1);
  const lastDrawnImgRef = useRef<HTMLImageElement | null>(null);
  const lastDrawnFrameIndexRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);

  const getFrameUrl = (index: number) => {
    const padded = String(index).padStart(3, "0");
    return `/sequence/ezgif-frame-${padded}.jpg`;
  };

  // Crisp canvas draw
  const drawImageToCanvas = useCallback((img: HTMLImageElement, frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    if (!img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    if (canvasWidth === 0 || canvasHeight === 0) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let renderWidth = canvasWidth;
    let renderHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderWidth = canvasWidth;
      renderHeight = Math.round(canvasWidth / imgRatio);
      offsetY = Math.round((canvasHeight - renderHeight) / 2);
    } else {
      renderHeight = canvasHeight;
      renderWidth = Math.round(canvasHeight * imgRatio);
      offsetX = Math.round((canvasWidth - renderWidth) / 2);
    }

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);

    lastDrawnImgRef.current = img;
    lastDrawnFrameIndexRef.current = frameIdx;
  }, []);

  // Find best available image for a target frame
  const getBestImageForFrame = useCallback((frameIdx: number): { img: HTMLImageElement | null; idx: number } => {
    // 1. Direct hit
    const exact = imagesRef.current[frameIdx];
    if (exact && exact.complete && exact.naturalWidth > 0) {
      return { img: exact, idx: frameIdx };
    }

    // 2. Search backward for closest available
    for (let i = frameIdx - 1; i >= 1; i--) {
      const candidate = imagesRef.current[i];
      if (candidate && candidate.complete && candidate.naturalWidth > 0) {
        return { img: candidate, idx: i };
      }
    }

    // 3. Search forward
    for (let i = frameIdx + 1; i <= TOTAL_FRAMES; i++) {
      const candidate = imagesRef.current[i];
      if (candidate && candidate.complete && candidate.naturalWidth > 0) {
        return { img: candidate, idx: i };
      }
    }

    return { img: null, idx: -1 };
  }, []);

  // Update canvas resolution exactly to physical CSS pixels
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);

    if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
      canvas.width = w;
      canvas.height = h;
    }

    // Redraw current target frame immediately
    const currentTarget = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(currentFrameRef.current)));
    const { img, idx } = getBestImageForFrame(currentTarget);
    if (img) {
      drawImageToCanvas(img, idx);
    }
  }, [drawImageToCanvas, getBestImageForFrame]);

  // Preload all 240 frames immediately in parallel batches
  useEffect(() => {
    let isMounted = true;

    // Load a single frame promise
    const loadFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (imagesRef.current[index]?.complete) {
          resolve();
          return;
        }

        const img = new Image();
        img.src = getFrameUrl(index);

        img.onload = () => {
          if (!isMounted) return;
          imagesRef.current[index] = img;
          setLoadedCount((prev) => prev + 1);

          // If this is frame 1 or matches the initial target, render immediately
          if (index === 1) {
            setFirstFrameReady(true);
            const canvas = canvasRef.current;
            if (canvas) {
              if (canvas.width === 0 || canvas.height === 0) {
                const rect = canvas.getBoundingClientRect();
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                canvas.width = Math.round(rect.width * dpr) || window.innerWidth;
                canvas.height = Math.round(rect.height * dpr) || window.innerHeight;
              }
              drawImageToCanvas(img, 1);
            }
          }
          resolve();
        };

        img.onerror = () => {
          resolve();
        };
      });
    };

    // Fast loading strategy:
    // Wave 1: First 25 frames (instant visual start)
    // Wave 2: All remaining frames in parallel
    const preloadAll = async () => {
      const firstBatch = [];
      for (let i = 1; i <= 25; i++) {
        firstBatch.push(loadFrame(i));
      }
      await Promise.all(firstBatch);

      if (!isMounted) return;

      // Ensure canvas is sized and frame 1 is drawn
      handleResize();

      // Load remaining frames 26 to 240
      const remaining = [];
      for (let i = 26; i <= TOTAL_FRAMES; i++) {
        remaining.push(loadFrame(i));
      }
      await Promise.all(remaining);
    };

    preloadAll();

    return () => {
      isMounted = false;
    };
  }, [drawImageToCanvas, handleResize]);

  // Window resize listener
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Continuous rAF animation loop for buttery smooth interpolation
  useEffect(() => {
    let animationFrameId: number;

    const renderLoop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      // Smooth lerp: moves smoothly towards target on every frame
      if (Math.abs(diff) > 0.005) {
        currentFrameRef.current = current + diff * 0.28;
      } else {
        currentFrameRef.current = target;
      }

      const desiredFrameIndex = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(currentFrameRef.current)));
      const { img, idx } = getBestImageForFrame(desiredFrameIndex);

      // Redraw if either target frame changed OR newly loaded higher-quality image is now available
      if (img && (idx !== lastDrawnFrameIndexRef.current || img !== lastDrawnImgRef.current)) {
        drawImageToCanvas(img, idx);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);
    rafIdRef.current = animationFrameId;

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [drawImageToCanvas, getBestImageForFrame]);

  // Scroll listener tracking scroll progress with window scroll
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      const totalScrollable = containerHeight - windowHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      // Calculate target frame float: 1.0 to 240.0
      const targetFrame = 1 + progress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = targetFrame;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const progressPct = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-black">
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black flex items-center justify-center">
        {/* Fullscreen Sharp Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ width: "100%", height: "100%", display: "block" }}
          aria-label="BMW M4 GT3 reveal sequence"
        />

        {/* Clean, Minimal Hero Typography */}
        <div className="absolute top-10 left-6 md:left-12 z-10 pointer-events-none">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#0066b1] block mb-1">
            BMW Motorsport
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
            BMW M4 GT3
          </h1>
          <p className="mt-1 text-sm text-zinc-400 font-normal">
            Customer Racing Homologation
          </p>
        </div>

        {/* Clean Scroll Cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 text-zinc-400 pointer-events-none text-xs uppercase tracking-wider">
          <ChevronDown className="w-4 h-4 text-zinc-400 animate-pulse" />
          <span>Scroll to reveal car</span>
        </div>

        {/* Minimal Subtle Loading Bar (only visible while initial frames buffer) */}
        {!firstFrameReady && (
          <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-20">
            <span className="text-sm font-semibold text-white tracking-widest uppercase mb-3">
              BMW M4 GT3
            </span>
            <div className="w-48 bg-zinc-900 h-1 rounded-full overflow-hidden">
              <div
                className="bg-[#0066b1] h-full transition-all duration-100"
                style={{ width: `${Math.max(5, progressPct)}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-zinc-500 mt-2">
              Loading Sequence: {progressPct}%
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
