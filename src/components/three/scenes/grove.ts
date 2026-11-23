import type { Stage, StageOptions } from "../stage";

// Responsibility: a stepped landscape where planting grows in and the light moves across the day.
export const options: StageOptions = { radius: 15, polar: 1.0, azimuth: 0.6, autoRotate: 0.07, target: [0, 0.6, 0] };

export function build(stage: Stage) {
  const { THREE, scene, track } = stage;
  stage.plinth(9, 9);
  // Contoured ground: stacked terraces, like a site model cut from walnut.
  const terraceMat = stage.walnut(0x5a3a26);
  const terraces = [[8, 8, 0], [6.2, 6, 0.32], [4.4, 4.6, 0.64], [2.6, 3, 0.96]];
  terraces.forEach(([w, d, y], i) => stage.box(w, 0.32, d, i * 0.35, y, -i * 0.25, scene, terraceMat, stage.brass(0.4)));

  const leaf = track(new THREE.MeshStandardMaterial({ color: 0x9b8448, roughness: 0.6, metalness: 0.35, flatShading: true, emissive: new THREE.Color(0x4a3a14), emissiveIntensity: 0.2 }));
  const trunk = stage.walnut(0x3e281a);
  const crownGeo = track(new THREE.IcosahedronGeometry(0.42, 0));
  const trunkGeo = track(new THREE.CylinderGeometry(0.04, 0.06, 0.6, 6));
  let seed = 11;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const trees = Array.from({ length: 26 }, (_, i) => {
    const level = i % 4;
    const [w, d, y] = terraces[level];
    const tree = new THREE.Group();
    tree.position.set(level * 0.35 + (rand() - 0.5) * (w - 0.8), y + 0.32, -level * 0.25 + (rand() - 0.5) * (d - 0.8));
    const stem = new THREE.Mesh(trunkGeo, trunk);
    stem.position.y = 0.3;
    const crown = new THREE.Mesh(crownGeo, leaf);
    crown.position.y = 0.78;
    crown.scale.setScalar(0.7 + rand() * 0.6);
    tree.add(stem, crown);
    tree.scale.setScalar(0.001);
    scene.add(tree);
    return { tree, delay: 0.4 + i * 0.12, size: 0.7 + rand() * 0.5, sway: rand() * 6 };
  });

  // Water channel along the lowest terrace.
  const water = new THREE.Mesh(track(new THREE.BoxGeometry(7.6, 0.04, 0.5)), track(new THREE.MeshStandardMaterial({ color: 0x0e2a2e, roughness: 0.08, metalness: 0.9, emissive: new THREE.Color(0x2a7f86), emissiveIntensity: 0.3 })));
  water.position.set(0, 0.34, 3.6);
  scene.add(water);

  const sun = new THREE.PointLight(0xffd08a, 60, 20, 1.4);
  scene.add(sun);
  const sunBall = new THREE.Mesh(track(new THREE.SphereGeometry(0.16, 16, 16)), track(new THREE.MeshBasicMaterial({ color: 0xffe7b0 })));
  scene.add(sunBall);

  let grown = 0;
  stage.onFrame((dt, time) => {
    grown += dt;
    trees.forEach((t) => {
      const k = stage.reduce ? 1 : Math.min(1, Math.max(0, (grown - t.delay) / 1.2));
      const eased = 1 - Math.pow(1 - k, 3);
      t.tree.scale.setScalar(Math.max(0.001, eased * t.size));
      t.tree.rotation.z = Math.sin(time * 0.8 + t.sway) * 0.04;
    });
    const a = time * 0.15;
    sun.position.set(Math.cos(a) * 6, 4 + Math.sin(a) * 2.5, Math.sin(a) * 3 + 2);
    sunBall.position.copy(sun.position);
  });
}
