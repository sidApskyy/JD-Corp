import type * as Three from "three";

// Illustrative points and lanes only: they show the idea of cross-border trade, not JD CORP locations.
const HUBS: [number, number][] = [[19, 72.8], [25.2, 55.3], [1.3, 103.8], [51.9, 4.5], [40.7, -74], [31.2, 121.5], [-4, 39.7], [-23.9, -46.3], [-33.9, 151.2], [35.6, 139.7], [6.4, 3.4]];
const LANES: [number, number][] = [[0, 1], [1, 3], [3, 4], [0, 2], [2, 5], [5, 9], [2, 8], [1, 6], [6, 10], [4, 7], [10, 7], [3, 10]];

export function createGlobeScene(THREE: typeof Three, stage: HTMLElement, landDots: number[]) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const canvas = renderer.domElement;
  canvas.className = "globe-canvas";
  canvas.setAttribute("aria-hidden", "true");
  stage.prepend(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.set(0, 0, 4.9);
  scene.add(new THREE.AmbientLight(0xffe2b8, 0.9));
  const key = new THREE.DirectionalLight(0xffcf8f, 2.4);
  key.position.set(-3, 2.5, 4);
  scene.add(key);

  const disposables: { dispose(): void }[] = [];
  const track = <T extends { dispose(): void }>(item: T) => { disposables.push(item); return item; };
  const toVec = (lat: number, lon: number, radius = 1) => {
    const phi = ((90 - lat) * Math.PI) / 180, theta = ((lon + 180) * Math.PI) / 180;
    return new THREE.Vector3(-radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
  };

  const tilt = new THREE.Group();
  tilt.rotation.x = 0.32;
  scene.add(tilt);
  const globe = new THREE.Group();
  globe.rotation.y = (-(62 + 90) * Math.PI) / 180;
  tilt.add(globe);

  globe.add(new THREE.Mesh(track(new THREE.SphereGeometry(1, 64, 64)), track(new THREE.MeshStandardMaterial({ color: 0x1c110a, roughness: 0.5, metalness: 0.7 }))));

  // Brass graticule, like the engraved lines of a desk globe.
  const lines: number[] = [];
  for (let lat = -60; lat <= 60; lat += 30) for (let lon = -180; lon < 180; lon += 4) { const a = toVec(lat, lon, 1.002), b = toVec(lat, lon + 4, 1.002); lines.push(a.x, a.y, a.z, b.x, b.y, b.z); }
  for (let lon = -180; lon < 180; lon += 30) for (let lat = -88; lat < 88; lat += 4) { const a = toVec(lat, lon, 1.002), b = toVec(lat + 4, lon, 1.002); lines.push(a.x, a.y, a.z, b.x, b.y, b.z); }
  const gratGeo = track(new THREE.BufferGeometry());
  gratGeo.setAttribute("position", new THREE.Float32BufferAttribute(lines, 3));
  globe.add(new THREE.LineSegments(gratGeo, track(new THREE.LineBasicMaterial({ color: 0xd7b574, transparent: true, opacity: 0.1 }))));

  // Continents as brass studs.
  const dot = document.createElement("canvas");
  dot.width = dot.height = 64;
  const ctx = dot.getContext("2d")!;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "#fff");
  gradient.addColorStop(0.55, "#fff");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  const sprite = track(new THREE.CanvasTexture(dot));
  const land: number[] = [];
  for (let i = 0; i < landDots.length; i += 2) { const v = toVec(landDots[i], landDots[i + 1], 1.006); land.push(v.x, v.y, v.z); }
  const landGeo = track(new THREE.BufferGeometry());
  landGeo.setAttribute("position", new THREE.Float32BufferAttribute(land, 3));
  globe.add(new THREE.Points(landGeo, track(new THREE.PointsMaterial({ color: 0xf0cf8c, size: 0.034, map: sprite, transparent: true, alphaTest: 0.2, sizeAttenuation: true }))));

  // Warm rim light around the sphere.
  const halo = new THREE.Mesh(track(new THREE.SphereGeometry(1.13, 48, 48)), track(new THREE.ShaderMaterial({
    side: THREE.BackSide, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    vertexShader: "varying vec3 vNormal; void main(){ vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
    fragmentShader: "varying vec3 vNormal; void main(){ float glow = pow(max(0.0, 0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.6); gl_FragColor = vec4(0.91, 0.68, 0.36, 1.0) * glow * 0.55; }",
  })));
  scene.add(halo);

  // Lanes arc above the surface; a light runs along each one.
  const hubGeo = track(new THREE.SphereGeometry(0.011, 12, 12));
  const hubMat = track(new THREE.MeshBasicMaterial({ color: 0xfff1cf }));
  HUBS.forEach(([lat, lon]) => { const hub = new THREE.Mesh(hubGeo, hubMat); hub.position.copy(toVec(lat, lon, 1.012)); globe.add(hub); });
  const laneMat = track(new THREE.LineBasicMaterial({ color: 0xe7c98a, transparent: true, opacity: 0.5 }));
  const runnerGeo = track(new THREE.SphereGeometry(0.013, 10, 10));
  const lanes = LANES.map(([from, to], index) => {
    const a = toVec(...HUBS[from]), b = toVec(...HUBS[to]);
    const lift = 0.12 + a.angleTo(b) * 0.16;
    const points = Array.from({ length: 65 }, (_, i) => { const t = i / 64; return a.clone().lerp(b, t).normalize().multiplyScalar(1.012 + Math.sin(Math.PI * t) * lift); });
    globe.add(new THREE.Line(track(new THREE.BufferGeometry().setFromPoints(points)), laneMat));
    const runner = new THREE.Mesh(runnerGeo, hubMat);
    globe.add(runner);
    return { points, runner, offset: index * 0.37, speed: 0.16 + (index % 4) * 0.03 };
  });

  const state = { down: false, x: 0, y: 0, spin: 0, velocity: 0 };
  const onDown = (event: PointerEvent) => { state.down = true; state.x = event.clientX; state.y = event.clientY; canvas.style.cursor = "grabbing"; };
  const onMove = (event: PointerEvent) => {
    if (!state.down) return;
    const dx = event.clientX - state.x;
    state.velocity = dx * 0.006;
    globe.rotation.y += state.velocity;
    tilt.rotation.x = Math.min(0.9, Math.max(-0.4, tilt.rotation.x + (event.clientY - state.y) * 0.004));
    state.x = event.clientX;
    state.y = event.clientY;
  };
  const onUp = () => { state.down = false; canvas.style.cursor = "grab"; };
  canvas.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = stage;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const sizeObserver = new ResizeObserver(resize);
  sizeObserver.observe(stage);
  resize();
  let visible = false;
  const viewObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.05 });
  viewObserver.observe(stage);

  let frame = 0, clock = 0, previous = performance.now();
  const tick = (now: number) => {
    frame = requestAnimationFrame(tick);
    const dt = Math.min(0.05, (now - previous) / 1000);
    previous = now;
    if (!visible || document.hidden) return;
    clock += dt;
    if (!state.down) {
      state.velocity *= 0.94;
      globe.rotation.y += state.velocity + (reduce ? 0 : dt * 0.07);
    }
    lanes.forEach(({ points, runner, offset, speed }) => {
      const t = reduce ? 0.5 : (clock * speed + offset) % 1;
      const scaled = t * (points.length - 1), i = Math.floor(scaled);
      runner.position.copy(points[i]).lerp(points[Math.min(points.length - 1, i + 1)], scaled - i);
    });
    renderer.render(scene, camera);
  };
  frame = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(frame);
    sizeObserver.disconnect();
    viewObserver.disconnect();
    canvas.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    disposables.forEach((item) => item.dispose());
    renderer.dispose();
    canvas.remove();
  };
}
