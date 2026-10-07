"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Seeded procedural line geometry: no remote assets or model downloads.
export default function ParticleConstellation() {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    camera.position.set(0, 0, 8.6);
    const positions: number[] = [],
      colors: number[] = [];
    let seed = 1072026;
    const random = () => {
      seed = (1664525 * seed + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    const palette = [
      0x8052ff, 0xffb829, 0x15846e, 0xac7cff, 0x417cf8, 0xcf72b7,
    ];
    // Two interlocking lobes with rippled contours evoke distributed cognition.
    for (let i = 0; i < 2500; i++) {
      const ambient = i > 2280;
      const angle = random() * Math.PI * 2;
      const z = random() * 2 - 1;
      const ring = Math.sqrt(1 - z * z);
      const side = random() > 0.5 ? 1 : -1;
      const ripple =
        1 +
        0.085 * Math.sin(angle * 7 + z * 8) +
        0.035 * Math.cos(angle * 13 - z * 11);
      const depth = 0.68 + random() * 0.32;
      let x = side * 0.68 + ring * Math.cos(angle) * 1.16 * ripple * depth;
      let y = z * 1.65 * ripple * depth;
      let pz = ring * Math.sin(angle) * 0.95 * depth;
      if (ambient) {
        x = (random() - 0.5) * 5.7;
        y = (random() - 0.5) * 4.7;
        pz = (random() - 0.5) * 2.7;
      }
      const size = (ambient ? 0.011 : 0.014) + random() * 0.025;
      const rotation = random() * Math.PI * 2;
      const color = new THREE.Color(
        palette[Math.floor(random() * palette.length)],
      );
      color.multiplyScalar(ambient ? 0.4 : 0.65 + random() * 0.7);
      const triangle = [0, 1, 2].map((k) => {
        const a = rotation + (k * Math.PI * 2) / 3;
        return [x + Math.cos(a) * size, y + Math.sin(a) * size, pz];
      });
      for (let edge = 0; edge < 3; edge++) {
        positions.push(...triangle[edge], ...triangle[(edge + 1) % 3]);
        for (let j = 0; j < 2; j++) colors.push(color.r, color.g, color.b);
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
    });
    const constellation = new THREE.LineSegments(geometry, material);
    constellation.rotation.z = -0.13;
    scene.add(constellation);
    let visible = true,
      disposed = false,
      lastTime = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const render = (time = 0) => {
      if (disposed || !visible || document.hidden) return;
      if (time - lastTime < 33 && !reduced.matches) return;
      lastTime = time;
      const t = time * 0.0001;
      constellation.rotation.y = reduced.matches
        ? -0.1
        : Math.sin(t) * 0.12 - 0.1;
      constellation.rotation.x = reduced.matches
        ? 0.06
        : Math.cos(t * 0.8) * 0.035 + 0.06;
      renderer.render(scene, camera);
      if (reduced.matches) renderer.setAnimationLoop(null);
    };
    const start = () => {
      if (visible && !document.hidden && !disposed) {
        lastTime = 0;
        renderer.setAnimationLoop(render);
      } else renderer.setAnimationLoop(null);
    };
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      start();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    const sizeObserver = new ResizeObserver(resize);
    observer.observe(container);
    sizeObserver.observe(container);
    const lost = (event: Event) => {
      event.preventDefault();
      renderer.setAnimationLoop(null);
      setFailed(true);
    };
    renderer.domElement.addEventListener("webglcontextlost", lost);
    document.addEventListener("visibilitychange", start);
    reduced.addEventListener("change", start);
    resize();
    return () => {
      disposed = true;
      renderer.setAnimationLoop(null);
      observer.disconnect();
      sizeObserver.disconnect();
      document.removeEventListener("visibilitychange", start);
      reduced.removeEventListener("change", start);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return (
    <div className="artifact-renderer" ref={host}>
      {failed && (
        <img
          className="artifact-fallback"
          src="/constellation-fallback.jpg"
          alt="Constelación de partículas triangulares"
        />
      )}
    </div>
  );
}
