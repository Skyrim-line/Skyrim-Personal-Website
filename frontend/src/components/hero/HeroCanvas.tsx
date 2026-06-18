import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 100;
const MAX_DIST = 150;
const MAX_LINE_PAIRS = (PARTICLE_COUNT * (PARTICLE_COUNT - 1)) / 2;

function getThemeColors() {
  const isDark = document.documentElement.classList.contains("dark");
  return {
    particle: isDark ? 0x818cf8 : 0x6366f1,
    line: isDark ? 0x818cf8 : 0x6366f1,
    particleOpacity: isDark ? 0.85 : 0.65,
    lineOpacity: isDark ? 0.22 : 0.12,
  };
}

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 1, 2000);
    camera.position.z = 500;

    let W = container.clientWidth;
    let H = container.clientHeight;

    // Particle data
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 2);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * W;
      positions[i * 3 + 1] = (Math.random() - 0.5) * H;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      velocities[i * 2]     = (Math.random() - 0.5) * 0.45;
      velocities[i * 2 + 1] = (Math.random() - 0.5) * 0.45;
    }

    // Points mesh
    const pointGeo = new THREE.BufferGeometry();
    const pointAttr = new THREE.BufferAttribute(positions, 3);
    pointAttr.setUsage(THREE.DynamicDrawUsage);
    pointGeo.setAttribute("position", pointAttr);

    const colors = getThemeColors();
    const pointMat = new THREE.PointsMaterial({
      color: colors.particle,
      size: 4,
      sizeAttenuation: true,
      transparent: true,
      opacity: colors.particleOpacity,
    });
    scene.add(new THREE.Points(pointGeo, pointMat));

    // Lines mesh (pre-allocated)
    const linePositions = new Float32Array(MAX_LINE_PAIRS * 6);
    const lineGeo = new THREE.BufferGeometry();
    const lineAttr = new THREE.BufferAttribute(linePositions, 3);
    lineAttr.setUsage(THREE.DynamicDrawUsage);
    lineGeo.setAttribute("position", lineAttr);
    const lineMat = new THREE.LineBasicMaterial({
      color: colors.line,
      transparent: true,
      opacity: colors.lineOpacity,
    });
    const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(linesMesh);

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left - W / 2;
      mouse.y = -(e.clientY - rect.top - H / 2);
    };
    window.addEventListener("mousemove", onMouseMove);

    // Resize
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

    // Theme change (dark/light)
    const themeObs = new MutationObserver(() => {
      const c = getThemeColors();
      (pointMat.color as THREE.Color).setHex(c.particle);
      pointMat.opacity = c.particleOpacity;
      (lineMat.color as THREE.Color).setHex(c.line);
      lineMat.opacity = c.lineOpacity;
    });
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    let raf: number;

    const animate = () => {
      raf = requestAnimationFrame(animate);

      // Update particle positions
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const px = positions[i * 3];
        const py = positions[i * 3 + 1];

        // Mouse repulsion within 100px
        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 100 * 100 && d2 > 0.001) {
          const d = Math.sqrt(d2);
          const f = ((100 - d) / 100) * 0.7;
          velocities[i * 2]     += (dx / d) * f;
          velocities[i * 2 + 1] += (dy / d) * f;
        }

        velocities[i * 2]     *= 0.975;
        velocities[i * 2 + 1] *= 0.975;

        positions[i * 3]     += velocities[i * 2];
        positions[i * 3 + 1] += velocities[i * 2 + 1];

        // Wrap around boundaries
        const half_w = W / 2;
        const half_h = H / 2;
        if (positions[i * 3] > half_w)       positions[i * 3] = -half_w;
        else if (positions[i * 3] < -half_w) positions[i * 3] = half_w;
        if (positions[i * 3 + 1] > half_h)       positions[i * 3 + 1] = -half_h;
        else if (positions[i * 3 + 1] < -half_h) positions[i * 3 + 1] = half_h;
      }
      pointAttr.needsUpdate = true;

      // Update connection lines
      let idx = 0;
      const maxD2 = MAX_DIST * MAX_DIST;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          if (dx * dx + dy * dy < maxD2) {
            linePositions[idx++] = positions[i * 3];
            linePositions[idx++] = positions[i * 3 + 1];
            linePositions[idx++] = positions[i * 3 + 2];
            linePositions[idx++] = positions[j * 3];
            linePositions[idx++] = positions[j * 3 + 1];
            linePositions[idx++] = positions[j * 3 + 2];
          }
        }
      }
      lineGeo.setDrawRange(0, idx / 3);
      lineAttr.needsUpdate = true;

      // Subtle camera parallax
      camera.position.x += (mouse.x * 0.008 - camera.position.x) * 0.015;
      camera.position.y += (mouse.y * 0.008 - camera.position.y) * 0.015;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      ro.disconnect();
      themeObs.disconnect();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    />
  );
}
