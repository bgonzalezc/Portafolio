"use client";
import dynamic from "next/dynamic";
const Artifact = dynamic(() => import("./particle-constellation"), {
  ssr: false,
});
export default function SceneSlot() {
  return (
    <div
      className="scene"
      role="img"
      aria-label="Constelación de pequeños triángulos violetas, ámbar y turquesa con forma de red neuronal"
    >
      <Artifact />
    </div>
  );
}
