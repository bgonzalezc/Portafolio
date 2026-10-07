"use client";
import dynamic from "next/dynamic";
const Artifact = dynamic(() => import("./three-artifact"), { ssr: false });
export default function SceneSlot() {
  return (
    <div
      className="scene"
      role="img"
      aria-label="Ensamble de cubos cromados, iluminado en blanco hueso con reflejos rosa pálido"
    >
      <Artifact />
    </div>
  );
}
