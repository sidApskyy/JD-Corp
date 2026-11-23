import type * as Three from "three";

export type ModelZone = { slug: string; x: number; z: number; h: number };

// Where each business sits on the model board (x across, z towards the viewer, h label height).
export const MODEL_ZONES: ModelZone[] = [
  { slug: "land-development", x: -5, z: 2.3, h: 1.1 },
  { slug: "real-estate", x: -1.7, z: 2.5, h: 2 },
  { slug: "construction", x: -1.4, z: -1.7, h: 5.6 },
  { slug: "investment", x: 2.4, z: -2.1, h: 4.9 },
  { slug: "import-export", x: 5, z: 1.9, h: 2.6 },
  { slug: "hotels-resorts", x: 2, z: 2.5, h: 1.6 },
  { slug: "marketing-services", x: -5, z: -2.2, h: 3.6 },
];

type Options = {
  getActive: () => number;
  select: (index: number) => void;
  advance: () => void;
  touched: () => boolean;
  touch: () => void;
  tag: () => HTMLElement | null;
  focus?: string;
};

export function createModelScene(THREE: typeof Three, stage: HTMLElement, options: Options) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  const canvas = renderer.domElement;
  canvas.className = "model-canvas";
  canvas.setAttribute("aria-hidden", "true");
  stage.prepend(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  scene.add(new THREE.HemisphereLight(0xffe2b8, 0x2a170c, 1.9));
  const key = new THREE.DirectionalLight(0xffd9a3, 2.2);
  key.position.set(7, 11, 8);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xb8863b, 1.2);
  rim.position.set(-9, 5, -8);
  scene.add(rim);
  const spot = new THREE.PointLight(0xffc878, 60, 11, 1.8);
  spot.position.set(0, 4, 0);
  scene.add(spot);

  const GOLD = new THREE.Color(0xd7b574);
  const WALNUT = new THREE.Color(0x6a452d);
  const disposables: { dispose(): void }[] = [];
  const track = <T extends { dispose(): void }>(item: T) => { disposables.push(item); return item; };

  // Walnut plinth with a brass edge and a faint survey grid.
  const board = new THREE.Group();
  scene.add(board);
  const plinthGeo = track(new THREE.BoxGeometry(15.4, 0.7, 10.4));
  const plinth = new THREE.Mesh(plinthGeo, track(new THREE.MeshStandardMaterial({ color: 0x2a1910, roughness: 0.5, metalness: 0.3 })));
  plinth.position.y = -0.36;
  board.add(plinth);
  const plinthEdges = new THREE.LineSegments(track(new THREE.EdgesGeometry(plinthGeo)), track(new THREE.LineBasicMaterial({ color: 0xd7b574, transparent: true, opacity: 0.75 })));
  plinthEdges.position.copy(plinth.position);
  board.add(plinthEdges);
  const gridPts: number[] = [];
  for (let x = -7; x <= 7; x++) gridPts.push(x, 0, -4.8, x, 0, 4.8);
  for (let z = -4; z <= 4; z++) gridPts.push(-7.3, 0, z, 7.3, 0, z);
  const gridGeo = track(new THREE.BufferGeometry());
  gridGeo.setAttribute("position", new THREE.Float32BufferAttribute(gridPts, 3));
  board.add(new THREE.LineSegments(gridGeo, track(new THREE.LineBasicMaterial({ color: 0xd7b574, transparent: true, opacity: 0.09 }))));

  // Each business owns a body and an edge material so it can light up on its own.
  const zones = MODEL_ZONES.map((zone) => {
    const group = new THREE.Group();
    group.position.set(zone.x, 0, zone.z);
    board.add(group);
    const body = track(new THREE.MeshStandardMaterial({ color: WALNUT.clone(), roughness: 0.42, metalness: 0.55, emissive: new THREE.Color(0xb8863b), emissiveIntensity: 0 }));
    const edge = track(new THREE.LineBasicMaterial({ color: 0xd7b574, transparent: true, opacity: 0.45 }));
    return { ...zone, group, body, edge, k: 0, hits: [] as Three.Mesh[] };
  });
  type Zone = (typeof zones)[number];
  const box = (zone: Zone, w: number, h: number, d: number, x: number, y: number, z: number, parent: Three.Object3D = zone.group) => {
    const geo = track(new THREE.BoxGeometry(w, h, d));
    const mesh = new THREE.Mesh(geo, zone.body);
    mesh.position.set(x, y + h / 2, z);
    mesh.userData.zone = zone.slug;
    parent.add(mesh);
    const lines = new THREE.LineSegments(track(new THREE.EdgesGeometry(geo)), zone.edge);
    lines.position.copy(mesh.position);
    parent.add(lines);
    zone.hits.push(mesh);
  };
  const [land, estate, build, invest, trade, hotel, market] = zones;
  const focusZone = options.focus ? zones.find((zone) => zone.slug === options.focus) : undefined;

  // 01 Land: a surveyed plot, subdivided, with corner stakes.
  box(land, 3.4, 0.06, 3.2, 0, 0, 0);
  const plots: number[] = [];
  for (let i = -1; i <= 1; i++) plots.push(i * 0.85 + 0.42, 0.08, -1.6, i * 0.85 + 0.42, 0.08, 1.6, -1.7, 0.08, i * 0.8 + 0.4, 1.7, 0.08, i * 0.8 + 0.4);
  const plotGeo = track(new THREE.BufferGeometry());
  plotGeo.setAttribute("position", new THREE.Float32BufferAttribute(plots, 3));
  land.group.add(new THREE.LineSegments(plotGeo, land.edge));
  [[-1.7, -1.6], [1.7, -1.6], [-1.7, 1.6], [1.7, 1.6]].forEach(([x, z]) => box(land, 0.07, 0.75, 0.07, x, 0, z));

  // 02 Real estate: a small neighbourhood of finished blocks.
  [[-0.9, -0.5, 0.9, 1.5, 0.9], [0.3, -0.6, 1, 1, 1.1], [1.2, 0.2, 0.7, 1.9, 0.7], [-0.8, 0.8, 1.2, 0.7, 0.8], [0.35, 0.75, 0.8, 1.2, 0.7]].forEach(([x, z, w, h, d]) => box(estate, w, h, d, x, 0, z));

  // 03 Construction: slabs and columns going up, with a slewing crane.
  for (let floor = 0; floor < 8; floor++) {
    box(build, 1.7, 0.08, 1.7, 0, floor * 0.5, 0);
    if (floor < 7) [[-0.75, -0.75], [0.75, -0.75], [-0.75, 0.75], [0.75, 0.75]].forEach(([x, z]) => box(build, 0.08, 0.42, 0.08, x, floor * 0.5 + 0.08, z));
  }
  box(build, 0.16, 5.3, 0.16, 1.5, 0, -1.1);
  const jib = new THREE.Group();
  jib.position.set(1.5, 5.3, -1.1);
  build.group.add(jib);
  box(build, 3.6, 0.1, 0.12, 1.1, 0, 0, jib);
  box(build, 0.5, 0.3, 0.3, -0.6, -0.1, 0, jib);
  box(build, 0.03, 1.4, 0.03, 2.3, -1.4, 0, jib);

  // 04 Investment: completed towers held for the long term.
  [[-0.7, 0.2, 0.95, 3.4, 0.95], [0.55, -0.3, 1.05, 4.6, 1.05], [0.5, 1, 0.8, 2.5, 0.8]].forEach(([x, z, w, h, d]) => {
    box(invest, w, h, d, x, 0, z);
    box(invest, w * 0.55, 0.22, d * 0.55, x, h, z);
  });

  // 05 Import & export: a quay, stacked containers, a gantry and a vessel.
  box(trade, 3.4, 0.1, 2.2, 0, 0, -0.5);
  for (let row = 0; row < 3; row++) for (let col = 0; col < 3; col++) for (let level = 0; level < 1 + ((row + col) % 3); level++) box(trade, 0.82, 0.36, 0.38, -1.05 + col * 0.95, 0.1 + level * 0.38, -1.15 + row * 0.5);
  box(trade, 0.08, 1.9, 0.08, -0.9, 0.1, 0.45);
  box(trade, 0.08, 1.9, 0.08, 0.9, 0.1, 0.45);
  box(trade, 2.4, 0.1, 0.12, 0.2, 1.95, 0.45);
  const ship = new THREE.Group();
  ship.position.set(0, 0, 1.55);
  trade.group.add(ship);
  box(trade, 2.9, 0.34, 0.7, 0, 0.02, 0, ship);
  box(trade, 1.7, 0.3, 0.5, -0.3, 0.36, 0, ship);
  box(trade, 0.4, 0.62, 0.5, 1.05, 0.36, 0, ship);

  // 06 Hotels & resorts: a low pavilion around a pool, with palms.
  box(hotel, 2.6, 0.55, 0.8, 0, 0, -0.9);
  box(hotel, 0.8, 0.55, 1.5, -0.9, 0, 0.2);
  box(hotel, 2.9, 0.06, 1.05, 0, 0.55, -0.9);
  const pool = new THREE.Mesh(track(new THREE.BoxGeometry(1.5, 0.04, 0.9)), track(new THREE.MeshStandardMaterial({ color: 0x0e2a2e, roughness: 0.08, metalness: 0.9, emissive: new THREE.Color(0x2a7f86), emissiveIntensity: 0.25 })));
  pool.position.set(0.55, 0.03, 0.35);
  pool.userData.zone = hotel.slug;
  hotel.group.add(pool);
  hotel.hits.push(pool);
  const palmGeo = track(new THREE.ConeGeometry(0.28, 0.5, 7));
  [[1.5, -0.2], [1.55, 0.85], [-0.2, 1], [0.6, 1.05]].forEach(([x, z]) => {
    box(hotel, 0.05, 0.75, 0.05, x, 0, z);
    const crown = new THREE.Mesh(palmGeo, hotel.body);
    crown.position.set(x, 0.95, z);
    hotel.group.add(crown);
  });

  // 07 Marketing: a signal mast and hoarding that sends the word out.
  box(market, 0.12, 2.6, 0.12, 0, 0, 0);
  box(market, 2.1, 1, 0.1, 0, 1.9, 0.12);
  box(market, 1.5, 0.05, 1.5, 0, 0, 0);
  const ringGeo = track(new THREE.TorusGeometry(0.5, 0.012, 6, 48));
  const rings = [0, 1, 2].map(() => {
    const material = track(new THREE.MeshBasicMaterial({ color: 0xe7c98a, transparent: true, opacity: 0.5 }));
    const ring = new THREE.Mesh(ringGeo, material);
    ring.position.set(0, 3.05, 0);
    ring.rotation.x = Math.PI / 2;
    market.group.add(ring);
    return { ring, material };
  });

  // The chain: one continuous line through all seven, with light travelling along it.
  const curve = new THREE.CatmullRomCurve3([...MODEL_ZONES, MODEL_ZONES[0]].map((zone) => new THREE.Vector3(zone.x * 0.92, 0.03, zone.z * 0.8)), false, "catmullrom", 0.4);
  board.add(new THREE.Line(track(new THREE.BufferGeometry().setFromPoints(curve.getPoints(220))), track(new THREE.LineBasicMaterial({ color: 0xe7c98a, transparent: true, opacity: 0.55 }))));
  const pulseGeo = track(new THREE.SphereGeometry(0.07, 12, 12));
  const pulseMat = track(new THREE.MeshBasicMaterial({ color: 0xfff1cf }));
  const pulses = [0, 0.25, 0.5, 0.75].map((offset) => {
    const dot = new THREE.Mesh(pulseGeo, pulseMat);
    board.add(dot);
    return { dot, offset };
  });

  // Focus mode isolates one business on its own small plinth (used on each business page).
  if (focusZone) {
    board.children.slice().forEach((child) => { if (!zones.some((zone) => zone.group === child)) board.remove(child); });
    zones.forEach((zone) => { if (zone !== focusZone) board.remove(zone.group); });
    focusZone.group.position.set(0, 0, 0);
    const smallGeo = track(new THREE.BoxGeometry(5.6, 0.5, 5.6));
    const small = new THREE.Mesh(smallGeo, plinth.material);
    small.position.y = -0.26;
    small.add(new THREE.LineSegments(track(new THREE.EdgesGeometry(smallGeo)), plinthEdges.material));
    board.add(small);
  }

  // Camera rig: drag to orbit, eased towards the selected business.
  const rig = { az: 0.35, pol: 1.02, azTo: 0.35, polTo: 1.02, radius: focusZone ? 10 + focusZone.h * 0.9 : 25, target: new THREE.Vector3(0, 1, 0), targetTo: new THREE.Vector3(0, 1, 0) };
  const pointer = { down: false, x: 0, y: 0, moved: 0 };
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const pick = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    ndc.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(zones.flatMap((zone) => zone.hits), false)[0];
    return hit ? MODEL_ZONES.findIndex((zone) => zone.slug === hit.object.userData.zone) : -1;
  };
  const onDown = (event: PointerEvent) => { pointer.down = true; pointer.x = event.clientX; pointer.y = event.clientY; pointer.moved = 0; };
  const onMove = (event: PointerEvent) => {
    if (!pointer.down) {
      if (event.target === canvas) canvas.style.cursor = pick(event) >= 0 ? "pointer" : "grab";
      return;
    }
    const dx = event.clientX - pointer.x, dy = event.clientY - pointer.y;
    pointer.moved += Math.abs(dx) + Math.abs(dy);
    rig.azTo -= dx * 0.006;
    rig.polTo = Math.min(1.3, Math.max(0.7, rig.polTo - dy * 0.004));
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    if (pointer.moved > 6) { options.touch(); canvas.style.cursor = "grabbing"; }
  };
  const onUp = (event: PointerEvent) => {
    if (!pointer.down) return;
    pointer.down = false;
    canvas.style.cursor = "grab";
    if (pointer.moved > 6) return;
    const index = pick(event);
    if (index >= 0) { options.touch(); options.select(index); }
  };
  canvas.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = stage;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const base = focusZone ? 10 + focusZone.h * 0.9 : 25;
    rig.radius = base * (w / h < 1 ? 1.44 : w / h < 1.35 ? 1.16 : 1);
    camera.updateProjectionMatrix();
  };
  const sizeObserver = new ResizeObserver(resize);
  sizeObserver.observe(stage);
  resize();

  let visible = false;
  const viewObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.05 });
  viewObserver.observe(stage);

  let last = -1, frame = 0, clock = 0, dwell = 0, previous = performance.now();
  const anchor = new THREE.Vector3();
  const tick = (now: number) => {
    frame = requestAnimationFrame(tick);
    const dt = Math.min(0.05, (now - previous) / 1000);
    previous = now;
    if (!visible || document.hidden) return;
    clock += dt;

    const selected = options.getActive();
    const lit = zones[selected];
    if (focusZone) {
      if (!pointer.down && !reduce) rig.azTo += dt * 0.18;
      rig.targetTo.set(0, focusZone.h * 0.38, 0);
    } else if (selected !== last) {
      rig.azTo = Math.atan2(lit.x, lit.z + 9) * 1.5 + 0.12;
      rig.targetTo.set(lit.x * 0.45, 0.9, lit.z * 0.3);
      last = selected;
      dwell = 0;
    }
    if (!options.touched() && !reduce) {
      dwell += dt;
      if (dwell > 5.5) { dwell = 0; options.advance(); }
    }

    const ease = reduce ? 1 : 1 - Math.exp(-dt * 3.2);
    rig.az += (rig.azTo - rig.az) * ease;
    rig.pol += (rig.polTo - rig.pol) * ease;
    rig.target.lerp(rig.targetTo, ease);
    camera.position.set(rig.target.x + rig.radius * Math.sin(rig.pol) * Math.sin(rig.az), rig.target.y + rig.radius * Math.cos(rig.pol), rig.target.z + rig.radius * Math.sin(rig.pol) * Math.cos(rig.az));
    camera.lookAt(rig.target);

    zones.forEach((zone, index) => {
      zone.k += ((index === selected ? 1 : 0) - zone.k) * (reduce ? 1 : 1 - Math.exp(-dt * 5));
      zone.body.color.copy(WALNUT).lerp(GOLD, zone.k * 0.55);
      zone.body.emissiveIntensity = zone.k * 0.5;
      zone.edge.opacity = 0.42 + zone.k * 0.58;
      zone.group.position.y = zone.k * 0.14;
    });
    spot.position.lerp(anchor.set(focusZone ? 0 : lit.x, lit.h + 1.6, focusZone ? 0.8 : lit.z + 0.8), ease);

    if (!reduce) {
      jib.rotation.y = Math.sin(clock * 0.35) * 0.9;
      ship.position.x = Math.sin(clock * 0.3) * 0.25;
      rings.forEach(({ ring, material }, index) => {
        const progress = (clock * 0.45 + index / 3) % 1;
        ring.scale.setScalar(0.4 + progress * 3.4);
        material.opacity = (1 - progress) * (0.25 + market.k * 0.6);
      });
    }
    pulses.forEach(({ dot, offset }) => dot.position.copy(curve.getPointAt(((reduce ? 0 : clock * 0.06) + offset) % 1)));

    renderer.render(scene, camera);

    const tag = options.tag();
    if (tag) {
      anchor.set(lit.x, lit.h + 0.35, lit.z).project(camera);
      tag.style.transform = `translate3d(${((anchor.x + 1) / 2) * stage.clientWidth}px, ${((1 - anchor.y) / 2) * stage.clientHeight}px, 0)`;
    }
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
