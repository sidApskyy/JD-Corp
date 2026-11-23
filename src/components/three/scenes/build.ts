import type { Object3D } from "three";
import type { SceneIO, Stage, StageOptions } from "../stage";

// How we engage: a building that assembles stage by stage (value 0-3).
export const options: StageOptions = { radius: 17, polar: 1.05, azimuth: 0.7, autoRotate: 0.09, target: [0, 1.8, 0] };

type Fadable = { opacity: number; transparent: boolean };

export function build(stage: Stage, io: SceneIO) {
  const { THREE, scene, track } = stage;
  stage.plinth(9, 7);
  const parts: { obj: Object3D; at: number; k: number; mats: Fadable[]; base: number[] }[] = [];
  const add = (obj: Object3D, at: number) => {
    const mats: Fadable[] = [];
    obj.traverse((child) => {
      const material = (child as unknown as { material?: Fadable }).material;
      if (material && !mats.includes(material)) { material.transparent = true; mats.push(material); }
    });
    scene.add(obj);
    parts.push({ obj, at, k: 0, mats, base: mats.map((m) => m.opacity) });
  };

  // 01 Appraise: survey grid, corner stakes.
  const survey = new THREE.Group();
  const pts: number[] = [];
  for (let x = -3; x <= 3; x++) pts.push(x, 0.02, -2.4, x, 0.02, 2.4);
  for (let z = -2; z <= 2; z++) pts.push(-3.4, 0.02, z, 3.4, 0.02, z);
  const grid = track(new THREE.BufferGeometry());
  grid.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  survey.add(new THREE.LineSegments(grid, stage.brass(0.45)));
  const stakeMat = stage.walnut(0xd7b574);
  [[-2, -1.5], [2, -1.5], [-2, 1.5], [2, 1.5]].forEach(([x, z]) => stage.box(0.08, 0.9, 0.08, x, 0, z, survey, stakeMat));
  add(survey, 0);

  // 02 Plan: the outline and floor plates drawn before anything is built.
  const plan = new THREE.Group();
  const outline = new THREE.LineSegments(track(new THREE.EdgesGeometry(track(new THREE.BoxGeometry(4, 4.6, 3)))), stage.brass(0.7));
  outline.position.y = 2.3;
  plan.add(outline);
  for (let f = 1; f < 6; f++) {
    const level = new THREE.LineSegments(track(new THREE.EdgesGeometry(track(new THREE.PlaneGeometry(4, 3)))), stage.brass(0.25));
    level.rotation.x = -Math.PI / 2;
    level.position.y = f * 0.76;
    plan.add(level);
  }
  add(plan, 1);

  // 03 Deliver: slabs and floors rise one after another.
  const body = stage.walnut();
  const edge = stage.brass(0.55);
  for (let f = 0; f < 6; f++) {
    const floor = new THREE.Group();
    stage.box(4, 0.12, 3, 0, f * 0.76, 0, floor, body, edge);
    stage.box(3.6, 0.6, 2.6, 0, f * 0.76 + 0.12, 0, floor, body);
    add(floor, 2 + f * 0.13);
  }

  // 04 Operate: lit windows, planting and a warm entrance light.
  const lit = track(new THREE.MeshBasicMaterial({ color: 0xffd28a }));
  const windows = new THREE.Group();
  for (let f = 0; f < 6; f++) for (let w = -1; w <= 1; w++) {
    if ((f + w + 3) % 3 === 0) continue;
    const pane = new THREE.Mesh(track(new THREE.PlaneGeometry(0.7, 0.32)), lit);
    pane.position.set(w * 1.15, f * 0.76 + 0.45, 1.31);
    windows.add(pane);
  }
  add(windows, 3);
  const garden = new THREE.Group();
  const leaf = stage.walnut(0x8a7440);
  const crownGeo = track(new THREE.ConeGeometry(0.35, 0.7, 7));
  [[-3.2, 2], [3.2, 2.2], [3.4, -2], [-3.3, -1.8]].forEach(([x, z]) => {
    stage.box(0.06, 0.5, 0.06, x, 0, z, garden, leaf);
    const crown = new THREE.Mesh(crownGeo, leaf);
    crown.position.set(x, 0.8, z);
    garden.add(crown);
  });
  add(garden, 3);
  const beacon = new THREE.PointLight(0xffc878, 0, 9, 1.6);
  beacon.position.set(0, 2.5, 3);
  scene.add(beacon);

  stage.onFrame((dt, time) => {
    const progress = io.value();
    parts.forEach((part) => {
      const want = progress + 0.001 >= part.at ? 1 : 0;
      part.k += (want - part.k) * stage.ease(dt, 4);
      part.obj.visible = part.k > 0.01;
      part.obj.scale.y = 0.02 + part.k * 0.98;
      part.mats.forEach((m, i) => { m.opacity = part.base[i] * part.k; });
    });
    beacon.intensity = progress >= 3 ? 30 + Math.sin(time * 2) * 6 : 0;
  });
}
