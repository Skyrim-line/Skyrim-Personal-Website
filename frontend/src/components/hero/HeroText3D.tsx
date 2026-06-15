import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
// @ts-ignore – three's font JSON isn't typed but parses fine via FontLoader
import helvetikerBoldData from "three/examples/fonts/helvetiker_bold.typeface.json";

interface LineConfig {
  text: string;
  size: number;
  y: number;
  lightColor: number;
  darkColor: number;
}

const LINES: LineConfig[] = [
  {
    text: "Hi  There!",
    size: 66,
    y: 42,
    lightColor: 0x1e1b4b,
    darkColor: 0xe0e7ff,
  },
  {
    text: "Welcome to my world",
    size: 40,
    y: -50,
    lightColor: 0x4f46e5,
    darkColor: 0x818cf8,
  },
];

function isDark() {
  return document.documentElement.classList.contains("dark");
}

function lineColor(cfg: LineConfig) {
  return isDark() ? cfg.darkColor : cfg.lightColor;
}

export default function HeroText3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let W = container.clientWidth;
    let H = container.clientHeight;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(W, H);
    container.appendChild(renderer.domElement);

    // ── Scene / Camera ────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 1, 2000);
    camera.position.z = 560;

    // ── Lighting ──────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));

    const key = new THREE.DirectionalLight(0xffffff, 1.8);
    key.position.set(0.5, 1, 1.5);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x818cf8, 1.2);
    fill.position.set(-1.5, -0.5, 0.8);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xa5b4fc, 0.6);
    rim.position.set(0, -1, -1);
    scene.add(rim);

    // ── Font & Text Geometries ────────────────────────────────────────────
    const loader = new FontLoader();
    const font = loader.parse(helvetikerBoldData);

    const group = new THREE.Group();
    const materials: THREE.MeshPhongMaterial[] = [];

    LINES.forEach((cfg) => {
      const face = new THREE.MeshPhongMaterial({
        color: lineColor(cfg),
        specular: 0xffffff,
        shininess: 90,
      });
      const bevel = new THREE.MeshPhongMaterial({
        color: lineColor(cfg),
        specular: 0xaaaaaa,
        shininess: 60,
      });
      // darken bevel slightly relative to face
      (bevel.color as THREE.Color).multiplyScalar(0.72);

      materials.push(face, bevel);

      const geo = new TextGeometry(cfg.text, {
        font,
        size: cfg.size,
        depth: 7,
        curveSegments: 6,
        bevelEnabled: true,
        bevelThickness: 3,
        bevelSize: 1.5,
        bevelOffset: 0,
        bevelSegments: 4,
      });

      geo.computeBoundingBox();
      const bb = geo.boundingBox!;
      // Center horizontally
      geo.translate(-(bb.max.x - bb.min.x) / 2, cfg.y, 0);

      const mesh = new THREE.Mesh(geo, [face, bevel]);
      group.add(mesh);
    });

    scene.add(group);

    // ── Mouse parallax ────────────────────────────────────────────────────
    const mouse = { nx: 0, ny: 0 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.nx = ((e.clientX - rect.left) / W - 0.5) * 2;
      mouse.ny = -((e.clientY - rect.top) / H - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      W = container.clientWidth;
      H = container.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);
    onResize();

    // ── Theme change ──────────────────────────────────────────────────────
    let matIdx = 0;
    const themeObs = new MutationObserver(() => {
      matIdx = 0;
      LINES.forEach((cfg) => {
        const c = lineColor(cfg);
        materials[matIdx].color.setHex(c);
        materials[matIdx + 1].color.setHex(c);
        (materials[matIdx + 1].color as THREE.Color).multiplyScalar(0.72);
        matIdx += 2;
      });
    });
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // ── Animate ───────────────────────────────────────────────────────────
    let raf: number;
    let t = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.016;

      // Gentle float
      group.position.y = Math.sin(t * 0.55) * 4;

      // Smooth mouse tilt
      group.rotation.y += (mouse.nx * 0.18 - group.rotation.y) * 0.06;
      group.rotation.x += (-mouse.ny * 0.1 - group.rotation.x) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      ro.disconnect();
      themeObs.disconnect();
      group.children.forEach((m) => {
        const mesh = m as THREE.Mesh;
        mesh.geometry.dispose();
      });
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full"
      style={{ height: "300px" }}
      aria-label="Hi There! Welcome to my world"
    />
  );
}
