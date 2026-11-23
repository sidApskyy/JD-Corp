import type { Vector3 } from "three";
import type { Stage, StageOptions } from "../stage";

// Careers: seven clusters of people, linked across the group. Nodes near the pointer light up.
export const options: StageOptions = { radius: 15, polar: 1.25, azimuth: 0, autoRotate: 0.06 };

export function build(stage: Stage) {
  const { THREE, scene, track, camera } = stage;
  const group = new THREE.Group();
  scene.add(group);
  const nodes: Vector3[] = [];
  const clusterOf: number[] = [];
  let seed = 7;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let c = 0; c < 7; c++) {
    const a = (c / 7) * Math.PI * 2;
    const center = new THREE.Vector3(Math.cos(a) * 3.6, Math.sin(c * 1.7) * 1.2, Math.sin(a) * 3.6);
    for (let n = 0; n < 9; n++) {
      nodes.push(center.clone().add(new THREE.Vector3((rand() - 0.5) * 2.1, (rand() - 0.5) * 2.1, (rand() - 0.5) * 2.1)));
      clusterOf.push(c);
    }
  }
  const links: [number, number][] = [];
  nodes.forEach((p, i) => nodes.forEach((q, j) => {
    if (j <= i) return;
    const d = p.distanceTo(q);
    if ((clusterOf[i] === clusterOf[j] && d < 1.5) || (clusterOf[i] !== clusterOf[j] && d < 2.15)) links.push([i, j]);
  }));
  const lineGeo = track(new THREE.BufferGeometry());
  lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(links.flatMap(([i, j]) => [nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z]), 3));
  group.add(new THREE.LineSegments(lineGeo, stage.brass(0.22)));

  const geo = track(new THREE.SphereGeometry(0.09, 14, 14));
  const spheres = nodes.map((p) => {
    const material = track(new THREE.MeshStandardMaterial({ color: 0x8a6440, roughness: 0.35, metalness: 0.8, emissive: new THREE.Color(0xe7c98a), emissiveIntensity: 0.1 }));
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.copy(p);
    group.add(mesh);
    return { mesh, material, k: 0 };
  });
  const runnerGeo = track(new THREE.SphereGeometry(0.05, 10, 10));
  const runnerMat = track(new THREE.MeshBasicMaterial({ color: 0xfff1cf }));
  const runners = Array.from({ length: 14 }, (_, i) => {
    const mesh = new THREE.Mesh(runnerGeo, runnerMat);
    group.add(mesh);
    return { mesh, link: links[(i * 37) % links.length], offset: i / 14 };
  });
  const projected = new THREE.Vector3();

  stage.onFrame((dt, time) => {
    group.rotation.y = time * 0.04;
    group.updateMatrixWorld();
    spheres.forEach((s) => {
      projected.copy(s.mesh.position).applyMatrix4(group.matrixWorld).project(camera);
      const near = stage.pointer.inside ? Math.max(0, 1 - Math.hypot(projected.x - stage.pointer.x, projected.y - stage.pointer.y) / 0.35) : 0;
      s.k += (near - s.k) * stage.ease(dt, 6);
      s.material.emissiveIntensity = 0.1 + s.k * 1.4;
      s.mesh.scale.setScalar(1 + s.k * 0.9);
    });
    runners.forEach((r) => r.mesh.position.copy(nodes[r.link[0]]).lerp(nodes[r.link[1]], (time * 0.18 + r.offset) % 1));
  });
}
