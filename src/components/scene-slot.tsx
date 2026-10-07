// Integration boundary: replace the inner viewport with a client-only Three.js
// canvas. Keep its accessible fallback, reserved dimensions and reduced-motion support.
export default function SceneSlot() {
  return (
    <div
      className="scene"
      role="img"
      aria-label="Visor técnico reservado para un futuro objeto 3D"
    >
      <div className="scene-top mono">
        <span>SYS / SPATIAL STUDY</span>
        <span>[ 01 ]</span>
      </div>
      <div className="scene-grid" />
      <div className="scene-cross cross-one" />
      <div className="scene-cross cross-two" />
      <div className="scene-target">
        <div className="target-circle" />
        <div className="target-circle inner" />
        <span className="target-center">
          BG<span>XYZ / 000</span>
        </span>
        <span className="axis axis-x">X</span>
        <span className="axis axis-y">Y</span>
        <span className="axis axis-z">Z</span>
      </div>
      <div className="scene-bottom mono">
        <span>
          SCENE_001
          <br />
          <span className="muted">OBJECT PENDING</span>
        </span>
        <span>
          33° 27′ S<br />
          70° 40′ W
        </span>
      </div>
    </div>
  );
}
