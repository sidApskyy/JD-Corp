import type { SceneIO, Stage, StageOptions } from "../stage";

// About: one core, seven businesses in orbit around it.
export const options: StageOptions = { radius: 13, polar: 1.12, azimuth: 0.4, autoRotate: 0.08, target: [0, 0, 0] };

export function build(stage: Stage, io: SceneIO) {
  const { THREE, scene, track } = stage;
  const group = new THREE.Group();
  group.rotation.z = 0.12;
  scene.add(group);

  const core = new THREE.Mesh(track(new THREE.IcosahedronGeometry(1.05, 1)), track(new THREE.MeshStandardMaterial({ color: 0xd7b574, roughness: 0.28, metalness: 0.9, emissive: new THREE.Color(0xb8863b), emissiveIntensity: 0.35, flatShading: true })));
  group.add(core);
  const shell = new THREE.LineSegments(track(new THREE.EdgesGeometry(track(new THREE.IcosahedronGeometry(1.32, 1)))), stage.brass(0.35));
  group.add(shell);
  const glow = new THREE.PointLight(0xffc878, 30, 9, 1.6);
  group.add(glow);

  const nodeGeo = track(new THREE.BoxGeometry(0.42, 0.42, 0.42));
  const orbits = Array.from({ length: 7 }, (_, i) => {
    const radius = 1.9 + i * 0.52;
    const pivot = new THREE.Group();
    pivot.rotation.set((i % 2 ? 1 : -1) * (0.18 + i * 0.07), 0, (i % 3) * 0.16 - 0.16);
    group.add(pivot);
    const ringMat = track(new THREE.MeshBasicMaterial({ color: 0xd7b574, transparent: true, opacity: 0.28 }));
    const ring = new THREE.Mesh(track(new THREE.TorusGeometry(radius, 0.012, 6, 160)), ringMat);
    ring.rotation.x = Math.PI / 2;
    pivot.add(ring);
    const body = stage.walnut();
    const node = new THREE.Mesh(nodeGeo, body);
    node.add(new THREE.LineSegments(track(new THREE.EdgesGeometry(nodeGeo)), stage.brass(0.8)));
    node.userData.index = i;
    pivot.add(node);
    return { radius, pivot, ringMat, body, node, phase: i * 0.9, speed: 0.32 - i * 0.03, k: 0 };
  });
  const nodes = orbits.map((o) => o.node);
  const gold = new THREE.Color(0xd7b574), wood = new THREE.Color(0x6a452d);

  stage.onClick(() => { const hit = stage.pick(nodes); if (hit) io.select(hit.object.userData.index); });
  stage.onFrame((dt, time) => {
    const active = io.value();
    const hover = stage.pick(nodes);
    stage.canvas.style.cursor = hover ? "pointer" : "grab";
    core.rotation.y = time * 0.25;
    shell.rotation.y = -time * 0.12;
    shell.rotation.x = time * 0.05;
    glow.intensity = 26 + Math.sin(time * 1.6) * 6;
    orbits.forEach((o, i) => {
      const angle = o.phase + time * o.speed;
      o.node.position.set(Math.cos(angle) * o.radius, 0, Math.sin(angle) * o.radius);
      o.node.rotation.set(time * 0.6, time * 0.4, 0);
      o.k += ((i === active ? 1 : 0) - o.k) * stage.ease(dt, 6);
      o.node.scale.setScalar(1 + o.k * 0.6);
      o.body.color.copy(wood).lerp(gold, o.k * 0.7);
      o.body.emissiveIntensity = o.k * 0.6;
      o.ringMat.opacity = 0.22 + o.k * 0.6;
    });
  });
}
