import type { Stage, StageOptions } from "../stage";
import { landDots } from "@/data/land-dots";

// About: the JD CORP office in miniature — walnut shelving, concealed warm light,
// brass objects, a desk, and the backlit world-map panel. Drag to look around.
export const options: StageOptions = { radius: 11.5, polar: 1.22, azimuth: 0.34, autoRotate: 0.05, target: [0, 1.9, -0.4], fov: 34 };

export function build(stage: Stage) {
  const { THREE, scene, track } = stage;

  const walnut = track(new THREE.MeshStandardMaterial({ color: 0x40261a, roughness: 0.5, metalness: 0.28 }));
  const walnutDark = track(new THREE.MeshStandardMaterial({ color: 0x2a170f, roughness: 0.6, metalness: 0.2 }));
  const deskMat = track(new THREE.MeshStandardMaterial({ color: 0x33200f, roughness: 0.24, metalness: 0.45 }));
  const brass = track(new THREE.MeshStandardMaterial({ color: 0xd7b574, roughness: 0.28, metalness: 0.92 }));
  const paper = track(new THREE.MeshStandardMaterial({ color: 0xe8e0d5, roughness: 0.85 }));
  const stripMat = track(new THREE.MeshBasicMaterial({ color: 0xffc06a }));
  const glowMat = track(new THREE.MeshBasicMaterial({ color: 0xffbf73, transparent: true, opacity: 0.16, depthWrite: false }));

  // Room shell: walnut back wall and a floor slab.
  stage.box(11, 5.6, 0.3, 0, 0, -1.75, scene, walnutDark);
  // Vertical joinery seams with fine brass inlay — like the office wall panelling.
  for (let x = -4.5; x <= 4.5; x += 1.5) stage.box(0.03, 5.6, 0.02, x, 0, -1.59, scene, brass);
  stage.box(12, 0.24, 8, 0, -0.26, 0.9, scene, walnutDark, stage.brass(0.35));

  // ---- Backlit world-map panel, centre of the wall ----
  const mapW = 3.5, mapH = 2.3, mapZ = -1.55;
  const panel = new THREE.Group();
  panel.position.set(0, 2.6, mapZ);
  scene.add(panel);
  const back = new THREE.Mesh(track(new THREE.BoxGeometry(mapW, mapH, 0.08)), track(new THREE.MeshStandardMaterial({ color: 0x1a0f08, roughness: 0.7 })));
  panel.add(back);
  back.add(new THREE.LineSegments(track(new THREE.EdgesGeometry(back.geometry)), stage.brass(0.8)));
  // A soft halo plane behind the dots.
  const halo = new THREE.Mesh(track(new THREE.PlaneGeometry(mapW - 0.24, mapH - 0.24)), track(new THREE.MeshBasicMaterial({ color: 0x8a5a28, transparent: true, opacity: 0.35, depthWrite: false })));
  halo.position.z = 0.05;
  panel.add(halo);
  // The map itself: land dots projected flat, as pin-light points.
  const dotPositions: number[] = [];
  for (let i = 0; i + 1 < landDots.length; i += 2) {
    const lat = landDots[i], lon = landDots[i + 1];
    dotPositions.push((lon / 180) * (mapW * 0.44), (lat / 90) * (mapH * 0.44), 0.08);
  }
  const dotGeo = track(new THREE.BufferGeometry());
  dotGeo.setAttribute("position", new THREE.Float32BufferAttribute(dotPositions, 3));
  const dotMat = track(new THREE.PointsMaterial({ color: 0xffcf8e, size: 0.032, transparent: true, opacity: 0.95, sizeAttenuation: true }));
  panel.add(new THREE.Points(dotGeo, dotMat));
  const mapGlow = new THREE.PointLight(0xffb56a, 7, 5, 1.9);
  mapGlow.position.set(0, 0.2, 0.7);
  panel.add(mapGlow);

  // ---- Shelving bays either side of the map ----
  const bayX = 3.35, bayW = 3.3, shelfYs = [0.55, 1.75, 2.95, 4.15];
  const stripLights: InstanceType<typeof THREE.PointLight>[] = [];
  for (const side of [-1, 1]) {
    const bay = new THREE.Group();
    bay.position.set(side * bayX, 0, -1.3);
    scene.add(bay);
    // Recess back panel + uprights + cornice.
    stage.box(bayW, 4.7, 0.08, 0, 0.1, -0.22, bay, walnut);
    stage.box(0.14, 4.7, 0.5, -bayW / 2, 0.1, 0, bay, walnutDark, stage.brass(0.5));
    stage.box(0.14, 4.7, 0.5, bayW / 2, 0.1, 0, bay, walnutDark, stage.brass(0.5));
    stage.box(bayW + 0.28, 0.16, 0.56, 0, 4.72, 0, bay, walnutDark, stage.brass(0.6));
    shelfYs.forEach((y) => {
      stage.box(bayW, 0.09, 0.46, 0, y, 0, bay, walnut, stage.brass(0.4));
      // Concealed warm strip under the front edge of each shelf.
      const strip = new THREE.Mesh(track(new THREE.BoxGeometry(bayW - 0.3, 0.02, 0.02)), stripMat);
      strip.position.set(0, y - 0.045, 0.2);
      bay.add(strip);
      const pool = new THREE.Mesh(track(new THREE.PlaneGeometry(bayW - 0.2, 0.7)), glowMat);
      pool.position.set(0, y - 0.42, 0.24);
      bay.add(pool);
    });
    const lamp = new THREE.PointLight(0xffc078, 6, 3.6, 2);
    lamp.position.set(0, 3.6, 0.55);
    bay.add(lamp);
    stripLights.push(lamp);
  }

  // ---- Objects on the shelves ----
  const bookCols = [0x6a452d, 0x8a5a30, 0x3a241a, 0xb8863b, 0x51301c];
  const books = (bay: number, y: number, x0: number, n: number) => {
    for (let i = 0; i < n; i++) {
      const h = 0.42 + ((i * 37 + bay * 11) % 5) * 0.05;
      const b = stage.box(0.09, h, 0.3, x0 + i * 0.115, y + 0.09, -1.32, scene, track(new THREE.MeshStandardMaterial({ color: bookCols[i % bookCols.length], roughness: 0.75 })));
      if (i === n - 1) b.rotation.z = -0.14;
    }
  };
  const onShelf = (side: number, y: number) => [side * bayX, y + 0.09, -1.28] as const;

  // Left bay: books, brass globe, hourglass, sculpture.
  books(-1, shelfYs[0], -bayX - 1.3, 8);
  const globe = new THREE.Group();
  globe.position.set(...onShelf(-1, shelfYs[1]));
  globe.position.x -= 0.7;
  scene.add(globe);
  const gSphere = new THREE.Mesh(track(new THREE.SphereGeometry(0.24, 24, 18)), track(new THREE.MeshStandardMaterial({ color: 0x8a5a30, roughness: 0.4, metalness: 0.7 })));
  globe.add(gSphere);
  const gRing = new THREE.Mesh(track(new THREE.TorusGeometry(0.3, 0.018, 8, 40)), brass);
  gRing.rotation.set(Math.PI / 2.4, 0, 0.5);
  globe.add(gRing);
  stage.box(0.06, 0.12, 0.06, 0, -0.24, 0, globe, walnutDark);
  books(-1, shelfYs[1], -bayX + 0.15, 5);
  const hg = new THREE.Group();
  hg.position.set(...onShelf(-1, shelfYs[2]));
  hg.position.x += 0.9;
  scene.add(hg);
  const coneGeo = track(new THREE.ConeGeometry(0.14, 0.26, 14));
  const top = new THREE.Mesh(coneGeo, brass); top.rotation.x = Math.PI; top.position.y = 0.13; hg.add(top);
  const bot = new THREE.Mesh(coneGeo, brass); bot.position.y = -0.13; hg.add(bot);
  stage.box(0.3, 0.03, 0.3, 0, 0.26, 0, hg, walnutDark);
  stage.box(0.3, 0.03, 0.3, 0, -0.29, 0, hg, walnutDark);
  books(-1, shelfYs[2], -bayX - 1.2, 6);
  const knot = new THREE.Mesh(track(new THREE.TorusKnotGeometry(0.16, 0.05, 60, 8)), brass);
  knot.position.set(...onShelf(-1, shelfYs[3]));
  knot.position.y += 0.19; knot.position.x -= 0.5;
  scene.add(knot);
  books(-1, shelfYs[3], -bayX + 0.5, 5);

  // Right bay: books, vase, stack of boxes, frame.
  books(1, shelfYs[0], bayX - 1.4, 7);
  const vase = new THREE.Mesh(track(new THREE.CylinderGeometry(0.11, 0.15, 0.5, 16)), brass);
  vase.position.set(...onShelf(1, shelfYs[1]));
  vase.position.y += 0.25; vase.position.x += 0.8;
  scene.add(vase);
  books(1, shelfYs[1], bayX - 1.35, 4);
  stage.box(0.5, 0.32, 0.34, 0.2, shelfYs[2] + 0.09, -1.28, scene, walnutDark, stage.brass(0.45)).position.x = bayX - 0.9;
  stage.box(0.4, 0.24, 0.3, 0.2, shelfYs[2] + 0.41, -1.28, scene, walnut, stage.brass(0.45)).position.x = bayX - 0.9;
  const frame = new THREE.Group();
  frame.position.set(...onShelf(1, shelfYs[3]));
  frame.position.x += 0.75; frame.position.y += 0.3;
  frame.rotation.y = -0.25;
  scene.add(frame);
  const frameBox = new THREE.Mesh(track(new THREE.BoxGeometry(0.5, 0.62, 0.04)), walnutDark);
  frameBox.add(new THREE.LineSegments(track(new THREE.EdgesGeometry(frameBox.geometry)), stage.brass(0.8)));
  const frameImg = new THREE.Mesh(track(new THREE.PlaneGeometry(0.36, 0.46)), track(new THREE.MeshBasicMaterial({ color: 0xc8a165 })));
  frameImg.position.z = 0.03;
  frameBox.add(frameImg);
  frame.add(frameBox);
  books(1, shelfYs[3], bayX - 1.45, 5);

  // ---- The desk, front of frame ----
  stage.box(5.2, 0.16, 1.9, 0, 0.82, 1.35, scene, deskMat, stage.brass(0.5));
  stage.box(0.18, 0.82, 1.5, -2.4, 0, 1.35, scene, walnutDark);
  stage.box(0.18, 0.82, 1.5, 2.4, 0, 1.35, scene, walnutDark);
  // Papers and a pen tray on the desk.
  const sheet = stage.box(0.62, 0.015, 0.85, -0.7, 0.9, 1.3, scene, paper);
  sheet.rotation.y = 0.18;
  stage.box(0.8, 0.05, 0.3, 0.9, 0.9, 1.25, scene, walnutDark, stage.brass(0.5));
  const lampArm = stage.box(0.04, 0.7, 0.04, 1.8, 0.9, 1.5, scene, brass);
  lampArm.rotation.z = -0.3;
  const lampHead = new THREE.Mesh(track(new THREE.ConeGeometry(0.16, 0.22, 14)), brass);
  lampHead.position.set(1.62, 1.62, 1.5); lampHead.rotation.z = Math.PI; scene.add(lampHead);
  const deskLight = new THREE.PointLight(0xffbe78, 9, 3.4, 1.8);
  deskLight.position.set(1.62, 1.5, 1.5);
  scene.add(deskLight);

  // Dust motes drifting in the warm light.
  const moteCount = 42;
  const moteGeo = track(new THREE.BufferGeometry());
  const motePos = new Float32Array(moteCount * 3);
  const moteSeed: number[] = [];
  for (let i = 0; i < moteCount; i++) {
    motePos[i * 3] = (Math.random() - 0.5) * 9;
    motePos[i * 3 + 1] = Math.random() * 4.6 + 0.3;
    motePos[i * 3 + 2] = Math.random() * 3 - 1.2;
    moteSeed.push(Math.random() * Math.PI * 2);
  }
  moteGeo.setAttribute("position", new THREE.BufferAttribute(motePos, 3));
  const motes = new THREE.Points(moteGeo, track(new THREE.PointsMaterial({ color: 0xffd9a0, size: 0.025, transparent: true, opacity: 0.55, depthWrite: false })));
  scene.add(motes);

  stage.onFrame((dt, time) => {
    const ease = stage.ease(dt, 3);
    gSphere.rotation.y += dt * 0.35;
    knot.rotation.y += dt * 0.5;
    knot.rotation.x += dt * 0.2;
    // Tungsten breathing: shelves and map glow drift almost imperceptibly.
    const breathe = 0.9 + Math.sin(time * 0.8) * 0.08;
    stripMat.color.setHSL(0.085, 0.85, 0.6 * breathe);
    glowMat.opacity = 0.13 + Math.sin(time * 0.8) * 0.035;
    stripLights.forEach((l, i) => { l.intensity = 5.4 + Math.sin(time * 0.8 + i) * 0.9; });
    dotMat.opacity += (0.85 + Math.sin(time * 1.3) * 0.1 - dotMat.opacity) * ease;
    deskLight.intensity = 8.4 + Math.sin(time * 5.1) * 0.35; // subtle mains flicker
    // Dust drifts upward and resets.
    const pos = moteGeo.attributes.position;
    for (let i = 0; i < moteCount; i++) {
      let y = pos.getY(i) + dt * 0.12;
      if (y > 5) y = 0.2;
      pos.setY(i, y);
      pos.setX(i, pos.getX(i) + Math.sin(time * 0.4 + moteSeed[i]) * dt * 0.05);
    }
    pos.needsUpdate = true;
  });
}
