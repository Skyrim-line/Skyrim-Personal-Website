import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  src: string;
  alt: string;
}

// Camera at z=5; plane height=2 fills the viewport exactly at this FOV
const CAMERA_Z = 5;
const FOV = 2 * Math.atan(1 / CAMERA_Z) * (180 / Math.PI); // ~22.6°
const MAX_TILT = 0.28; // radians (~16°)

export default function HeroImage3D({ src, alt }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = container.clientWidth;
    const H = container.clientHeight;
    const aspect = W / H;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    Object.assign(renderer.domElement.style, {
      borderRadius: "12px",
      display: "block",
    });
    container.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, aspect, 0.1, 100);
    camera.position.z = CAMERA_Z;

    // ── Image plane ───────────────────────────────────────────────────────
    const texture = new THREE.TextureLoader().load(src);
    texture.colorSpace = THREE.SRGBColorSpace;

    const geo = new THREE.PlaneGeometry(aspect * 2, 2, 1, 1);
    // MeshBasicMaterial: no lighting — texture displays at full original brightness
    const mat = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Subtle white gloss overlay that follows mouse (simulates highlight)
    const glossMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
    });
    const glossMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(aspect * 2, 2, 1, 1),
      glossMat
    );
    glossMesh.position.z = 0.01;
    scene.add(glossMesh);

    // ── Mouse state ───────────────────────────────────────────────────────
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let hovered = false;
    let time = 0;

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = -((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onEnter = () => { hovered = true; };
    const onLeave = () => {
      hovered = false;
      target.x = 0;
      target.y = 0;
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    // ── Animate ───────────────────────────────────────────────────────────
    let raf: number;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      time += 0.008;

      const speed = hovered ? 0.1 : 0.04;
      current.x += (target.x - current.x) * speed;
      current.y += (target.y - current.y) * speed;

      // 3D tilt
      mesh.rotation.y = current.x * MAX_TILT;
      mesh.rotation.x = current.y * MAX_TILT;

      // Idle float
      if (!hovered) {
        mesh.position.y = Math.sin(time) * 0.04;
      }

      // Gloss highlight follows mouse tilt angle
      const tiltMag = Math.sqrt(current.x * current.x + current.y * current.y);
      glossMat.opacity += (tiltMag * 0.12 - glossMat.opacity) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // ── Resize ────────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const a = w / h;
      camera.aspect = a;
      camera.updateProjectionMatrix();
      // Rescale plane to new aspect
      mesh.scale.x = a / aspect;
      renderer.setSize(w, h);
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      ro.disconnect();
      texture.dispose();
      geo.dispose();
      mat.dispose();
      glossMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [src]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full cursor-default"
      role="img"
      aria-label={alt}
    />
  );
}
