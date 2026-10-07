"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
// Self-contained WebGL boundary: replace the assembly with a glTF later.
export default function ThreeArtifact() {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x12130f, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(5, 3.5, 7.5);
    camera.lookAt(0, 0, 0);
    const room = new RoomEnvironment();
    // Dark workshop reflections, with bone-white softboxes and a rose rim.
    room.traverse((object) => {
      if (object instanceof THREE.PointLight) object.color.set(0xe4dfda);
      if (object instanceof THREE.Mesh && !Array.isArray(object.material)) {
        const surface = object.material as THREE.MeshStandardMaterial;
        if (surface.emissive?.getHex() === 0) surface.color.set(0xc7c4bf);
        else if (surface.emissive) {
          const intensity = Math.max(
            surface.emissive.r,
            surface.emissive.g,
            surface.emissive.b,
          );
          surface.emissive.set(0xe4dfda).multiplyScalar(intensity);
        }
      }
    });
    const rosePanel = room.children[5] as THREE.Mesh;
    (rosePanel.material as THREE.MeshLambertMaterial).emissive
      .set(0xf5c2c8)
      .multiplyScalar(10);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const environment = pmrem.fromScene(room, 0.025);
    scene.environment = environment.texture;
    scene.environmentIntensity = 1.1;
    room.dispose();
    pmrem.dispose();
    const assembly = new THREE.Group();
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xe4dfda,
      metalness: 1,
      roughness: 0.17,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
    });
    const geometry = new RoundedBoxGeometry(1.32, 1.32, 1.32, 4, 0.045);
    const positions = [
      [-0.72, 0.7, 0],
      [0.72, 0.7, 0],
      [-0.72, -0.74, 0],
      [0.72, -0.74, 0],
      [0.72, 0.7, -1.44],
    ];
    positions.forEach(([x, y, z]) => {
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, y, z);
      assembly.add(cube);
    });
    assembly.rotation.set(0.13, -0.24, -0.16);
    scene.add(assembly);
    const key = new THREE.DirectionalLight(0xe4dfda, 4);
    key.position.set(-3, 6, 5);
    scene.add(key);
    const rim = new THREE.PointLight(0xf5c2c8, 48, 12, 2);
    rim.position.set(3, -1, 2);
    scene.add(rim);
    let targetX = 0.13,
      targetY = -0.24,
      lastTime = 0,
      visible = true,
      disposed = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const render = (time = 0) => {
      if (disposed || !visible || document.hidden) return;
      const dt = Math.min((time - lastTime) / 1000 || 0.016, 0.05);
      lastTime = time;
      const amount = reduced.matches ? 1 : 1 - Math.exp(-7 * dt);
      assembly.rotation.x += (targetX - assembly.rotation.x) * amount;
      assembly.rotation.y += (targetY - assembly.rotation.y) * amount;
      renderer.render(scene, camera);
      if (
        Math.abs(targetX - assembly.rotation.x) +
          Math.abs(targetY - assembly.rotation.y) <
        0.0001
      )
        renderer.setAnimationLoop(null);
    };
    const requestRender = () => {
      if (visible && !document.hidden && !disposed)
        renderer.setAnimationLoop(render);
    };
    const visibilityChange = () => {
      if (document.hidden) renderer.setAnimationLoop(null);
      else requestRender();
    };
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      requestRender();
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reduced.matches) return;
      const bounds = container.getBoundingClientRect();
      targetX =
        0.13 + ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.18;
      targetY =
        -0.24 + ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.28;
      requestRender();
    };
    const reset = () => {
      targetX = 0.13;
      targetY = -0.24;
      requestRender();
    };
    const lost = (event: Event) => {
      event.preventDefault();
      renderer.setAnimationLoop(null);
      setFailed(true);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) requestRender();
      else renderer.setAnimationLoop(null);
    });
    const resizeObserver = new ResizeObserver(resize);
    observer.observe(container);
    resizeObserver.observe(container);
    container.addEventListener("pointermove", move);
    container.addEventListener("pointerleave", reset);
    document.addEventListener("visibilitychange", visibilityChange);
    reduced.addEventListener("change", reset);
    renderer.domElement.addEventListener("webglcontextlost", lost);
    resize();
    return () => {
      disposed = true;
      renderer.setAnimationLoop(null);
      observer.disconnect();
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", move);
      container.removeEventListener("pointerleave", reset);
      document.removeEventListener("visibilitychange", visibilityChange);
      reduced.removeEventListener("change", reset);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      geometry.dispose();
      material.dispose();
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return (
    <div className="artifact-renderer" ref={host}>
      {failed && (
        <img
          className="artifact-fallback"
          src="/artifact-fallback.jpg"
          alt="Ensamble de cubos cromados"
        />
      )}
    </div>
  );
}
