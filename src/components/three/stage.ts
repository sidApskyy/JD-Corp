import type * as Three from "three";

export type StageOptions = {
  radius: number;
  target?: [number, number, number];
  polar?: number;
  azimuth?: number;
  autoRotate?: number;
  drag?: boolean;
  fov?: number;
};

export type SceneIO = { value: () => number; select: (index: number) => void };

export type Stage = ReturnType<typeof createStage>;

export const WALNUT_HEX = 0x6a452d;
export const GOLD_HEX = 0xd7b574;

// Shared renderer, lighting, orbit, visibility and cleanup for every 3D piece on the site.
export function createStage(THREE: typeof Three, host: HTMLElement, options: StageOptions) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  const canvas = renderer.domElement;
  canvas.className = "scene-canvas";
  canvas.setAttribute("aria-hidden", "true");
  host.prepend(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(options.fov ?? 30, 1, 0.1, 200);
  scene.add(new THREE.HemisphereLight(0xffe2b8, 0x2a170c, 1.8));
  const key = new THREE.DirectionalLight(0xffd9a3, 2.2);
  key.position.set(7, 11, 8);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xb8863b, 1.3);
  rim.position.set(-9, 5, -8);
  scene.add(rim);

  const disposables: { dispose(): void }[] = [];
  const track = <T extends { dispose(): void }>(item: T) => { disposables.push(item); return item; };
  const walnut = (color = WALNUT_HEX) => track(new THREE.MeshStandardMaterial({ color, roughness: 0.42, metalness: 0.55, emissive: new THREE.Color(0xb8863b), emissiveIntensity: 0 }));
  const brass = (opacity = 0.5) => track(new THREE.LineBasicMaterial({ color: GOLD_HEX, transparent: true, opacity }));
  const box = (w: number, h: number, d: number, x: number, y: number, z: number, parent: Three.Object3D, body: Three.Material, edge?: Three.LineBasicMaterial) => {
    const geo = track(new THREE.BoxGeometry(w, h, d));
    const mesh = new THREE.Mesh(geo, body);
    mesh.position.set(x, y + h / 2, z);
    parent.add(mesh);
    if (edge) {
      const lines = new THREE.LineSegments(track(new THREE.EdgesGeometry(geo)), edge);
      mesh.add(lines);
    }
    return mesh;
  };
  const plinth = (w: number, d: number, parent: Three.Object3D = scene) => {
    const geo = track(new THREE.BoxGeometry(w, 0.5, d));
    const mesh = new THREE.Mesh(geo, track(new THREE.MeshStandardMaterial({ color: 0x2a1910, roughness: 0.5, metalness: 0.3 })));
    mesh.position.y = -0.26;
    mesh.add(new THREE.LineSegments(track(new THREE.EdgesGeometry(geo)), brass(0.75)));
    parent.add(mesh);
    return mesh;
  };

  // Orbit rig with optional drag and a slow idle turn that resumes after interaction.
  const target = new THREE.Vector3(...(options.target ?? [0, 0, 0]));
  const rig = { az: options.azimuth ?? 0.6, pol: options.polar ?? 1.05, radius: options.radius, idle: 0 };
  const pointer = { x: 0, y: 0, inside: false, down: false, lastX: 0, lastY: 0, moved: 0 };
  const ndc = new THREE.Vector2();
  const updateNdc = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    pointer.inside = pointer.x >= -1 && pointer.x <= 1 && pointer.y >= -1 && pointer.y <= 1;
  };
  const clicks: ((event: PointerEvent) => void)[] = [];
  const onDown = (event: PointerEvent) => { pointer.down = true; pointer.lastX = event.clientX; pointer.lastY = event.clientY; pointer.moved = 0; };
  const onMove = (event: PointerEvent) => {
    updateNdc(event);
    if (!pointer.down) return;
    const dx = event.clientX - pointer.lastX, dy = event.clientY - pointer.lastY;
    pointer.moved += Math.abs(dx) + Math.abs(dy);
    pointer.lastX = event.clientX;
    pointer.lastY = event.clientY;
    if (options.drag === false) return;
    rig.az -= dx * 0.006;
    rig.pol = Math.min(1.35, Math.max(0.55, rig.pol - dy * 0.004));
    rig.idle = 0;
    canvas.style.cursor = "grabbing";
  };
  const onUp = (event: PointerEvent) => {
    if (!pointer.down) return;
    pointer.down = false;
    canvas.style.cursor = options.drag === false ? "default" : "grab";
    if (pointer.moved <= 6) clicks.forEach((fn) => fn(event));
  };
  const onLeave = () => { pointer.inside = false; };
  canvas.style.cursor = options.drag === false ? "default" : "grab";
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointerleave", onLeave);
  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerup", onUp);

  const ray = new THREE.Raycaster();
  const pick = (objects: Three.Object3D[]) => {
    if (!pointer.inside) return null;
    ray.setFromCamera(ndc.set(pointer.x, pointer.y), camera);
    return ray.intersectObjects(objects, false)[0] ?? null;
  };

  let radiusScale = 1;
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = host;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    radiusScale = w / h < 0.85 ? 1.35 : w / h < 1.1 ? 1.15 : 1;
    camera.updateProjectionMatrix();
  };
  const sizeObserver = new ResizeObserver(resize);
  sizeObserver.observe(host);
  resize();

  let visible = false;
  const viewObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.02 });
  viewObserver.observe(host);

  const frames: ((dt: number, time: number) => void)[] = [];
  let frame = 0, time = 0, previous = performance.now();
  const tick = (now: number) => {
    frame = requestAnimationFrame(tick);
    const dt = Math.min(0.05, (now - previous) / 1000);
    previous = now;
    if (!visible || document.hidden) return;
    time += dt;
    rig.idle += dt;
    if (!pointer.down && !reduce && rig.idle > 2.5) rig.az += dt * (options.autoRotate ?? 0.12);
    const r = rig.radius * radiusScale;
    camera.position.set(target.x + r * Math.sin(rig.pol) * Math.sin(rig.az), target.y + r * Math.cos(rig.pol), target.z + r * Math.sin(rig.pol) * Math.cos(rig.az));
    camera.lookAt(target);
    frames.forEach((fn) => fn(dt, reduce ? 0 : time));
    renderer.render(scene, camera);
  };

  return {
    THREE, scene, camera, renderer, canvas, reduce, rig, target, pointer,
    track, walnut, brass, box, plinth, pick,
    onFrame: (fn: (dt: number, time: number) => void) => frames.push(fn),
    onClick: (fn: (event: PointerEvent) => void) => clicks.push(fn),
    ease: (dt: number, speed = 5) => (reduce ? 1 : 1 - Math.exp(-dt * speed)),
    start: () => { frame = requestAnimationFrame(tick); },
    dispose: () => {
      cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      viewObserver.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      disposables.forEach((item) => item.dispose());
      renderer.dispose();
      canvas.remove();
    },
  };
}
