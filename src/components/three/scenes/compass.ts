import type { Stage, StageOptions } from "../stage";

// Journal: the brass desk compass. The needle settles on the pointer like a real one.
export const options: StageOptions = { radius: 9, polar: 0.72, azimuth: 0, autoRotate: 0, drag: false };

export function build(stage: Stage) {
  const { THREE, scene, track } = stage;
  const brassMat = track(new THREE.MeshStandardMaterial({ color: 0xd7b574, roughness: 0.25, metalness: 0.95 }));
  const darkMat = track(new THREE.MeshStandardMaterial({ color: 0x24160f, roughness: 0.45, metalness: 0.4 }));
  const compass = new THREE.Group();
  scene.add(compass);

  const base = new THREE.Mesh(track(new THREE.CylinderGeometry(2.6, 2.75, 0.4, 96)), brassMat);
  base.position.y = -0.2;
  compass.add(base);
  const face = new THREE.Mesh(track(new THREE.CylinderGeometry(2.35, 2.35, 0.05, 96)), darkMat);
  face.position.y = 0.02;
  compass.add(face);
  const bezel = new THREE.Mesh(track(new THREE.TorusGeometry(2.45, 0.12, 16, 120)), brassMat);
  bezel.rotation.x = Math.PI / 2;
  bezel.position.y = 0.06;
  compass.add(bezel);

  const tickGeo = track(new THREE.BoxGeometry(0.04, 0.02, 0.22));
  const longGeo = track(new THREE.BoxGeometry(0.07, 0.02, 0.42));
  for (let i = 0; i < 72; i++) {
    const major = i % 9 === 0;
    const tick = new THREE.Mesh(major ? longGeo : tickGeo, brassMat);
    const a = (i / 72) * Math.PI * 2;
    const r = major ? 1.95 : 2.06;
    tick.position.set(Math.sin(a) * r, 0.06, Math.cos(a) * r);
    tick.rotation.y = a;
    compass.add(tick);
  }
  const rose = new THREE.Group();
  for (let i = 0; i < 4; i++) {
    const point = new THREE.Mesh(track(new THREE.ConeGeometry(0.16, 1.5, 4)), brassMat);
    point.rotation.x = Math.PI / 2;
    point.position.z = 0.75;
    const arm = new THREE.Group();
    arm.add(point);
    arm.rotation.y = (i * Math.PI) / 2 + Math.PI / 4;
    rose.add(arm);
  }
  rose.position.y = 0.06;
  rose.scale.set(0.7, 0.2, 0.7);
  compass.add(rose);

  const needle = new THREE.Group();
  needle.position.y = 0.28;
  const north = new THREE.Mesh(track(new THREE.ConeGeometry(0.14, 1.9, 4)), track(new THREE.MeshStandardMaterial({ color: 0xe7c98a, roughness: 0.2, metalness: 0.9, emissive: new THREE.Color(0xb8863b), emissiveIntensity: 0.4 })));
  north.rotation.x = -Math.PI / 2;
  north.position.z = -0.95;
  const south = new THREE.Mesh(track(new THREE.ConeGeometry(0.14, 1.9, 4)), darkMat);
  south.rotation.x = Math.PI / 2;
  south.position.z = 0.95;
  const hub = new THREE.Mesh(track(new THREE.CylinderGeometry(0.16, 0.16, 0.12, 24)), brassMat);
  needle.add(north, south, hub);
  compass.add(needle);
  const glass = new THREE.Mesh(track(new THREE.CylinderGeometry(2.36, 2.36, 0.02, 96)), track(new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.06, roughness: 0, metalness: 1 })));
  glass.position.y = 0.42;
  compass.add(glass);
  const lamp = new THREE.PointLight(0xffc878, 40, 12, 1.6);
  lamp.position.set(-2, 4, 2);
  scene.add(lamp);

  const state = { angle: 0.6, velocity: 0 };
  stage.onFrame((dt, time) => {
    // Without a pointer the needle drifts gently; with one it points at it, overshoots and settles.
    const want = stage.pointer.inside ? Math.atan2(stage.pointer.x, stage.pointer.y) : 0.5 + Math.sin(time * 0.4) * 0.35;
    let diff = -want - state.angle;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    if (stage.reduce) state.angle += diff;
    else {
      state.velocity += diff * dt * 18;
      state.velocity *= Math.pow(0.04, dt);
      state.angle += state.velocity * dt * 3;
    }
    needle.rotation.y = state.angle;
    compass.rotation.x = stage.pointer.inside ? -stage.pointer.y * 0.12 : 0;
    compass.rotation.z = stage.pointer.inside ? stage.pointer.x * 0.12 : Math.sin(time * 0.3) * 0.03;
  });
}
