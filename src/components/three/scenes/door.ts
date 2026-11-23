import type { Stage, StageOptions } from "../stage";

// Contact: a walnut wall with a brass-edged doorway, ajar, warm light spilling out.
export const options: StageOptions = { radius: 13, polar: 1.18, azimuth: 0.5, autoRotate: 0.06, target: [0, 1.7, 0] };

export function build(stage: Stage) {
  const { THREE, scene, track } = stage;
  stage.plinth(8.5, 7);

  const walnutMat = track(new THREE.MeshStandardMaterial({ color: 0x4a2d1c, roughness: 0.55, metalness: 0.25 }));
  const brassMat = track(new THREE.MeshStandardMaterial({ color: 0xd7b574, roughness: 0.3, metalness: 0.9 }));

  const wall = new THREE.Group();
  scene.add(wall);
  // Jambs and header of the wall; the doorway is the gap between them.
  stage.box(2.3, 4.6, 0.5, -2.05, 0, 0, wall, walnutMat, stage.brass(0.3));
  stage.box(2.3, 4.6, 0.5, 2.05, 0, 0, wall, walnutMat, stage.brass(0.3));
  stage.box(6.4, 0.7, 0.5, 0, 3.9, 0, wall, walnutMat, stage.brass(0.3));

  // The lit room behind the opening.
  const glowMat = track(new THREE.MeshBasicMaterial({ color: 0xffca7a }));
  const opening = new THREE.Mesh(track(new THREE.PlaneGeometry(1.8, 3.9)), glowMat);
  opening.position.set(0, 1.95, -0.05);
  wall.add(opening);
  const spill = new THREE.PointLight(0xffb46a, 26, 12, 1.7);
  spill.position.set(0, 2.2, 0.6);
  wall.add(spill);

  // Brass threshold strip under the door.
  const sill = new THREE.Mesh(track(new THREE.BoxGeometry(1.9, 0.08, 0.6)), brassMat);
  sill.position.set(0, 0.02, 0.1);
  wall.add(sill);

  // The door itself, ajar on its hinge.
  const hinge = new THREE.Group();
  hinge.position.set(-0.88, 0, 0.18);
  wall.add(hinge);
  const door = new THREE.Mesh(track(new THREE.BoxGeometry(1.76, 3.86, 0.09)), walnutMat);
  door.position.set(0.88, 1.93, 0);
  door.add(new THREE.LineSegments(track(new THREE.EdgesGeometry(door.geometry)), stage.brass(0.55)));
  hinge.add(door);
  const handle = new THREE.Mesh(track(new THREE.SphereGeometry(0.055, 16, 12)), brassMat);
  handle.position.set(1.55, 1.85, 0.12);
  hinge.add(handle);

  // A shaft of light on the floor in front of the doorway.
  const shaftMat = track(new THREE.MeshBasicMaterial({ color: 0xd7b574, transparent: true, opacity: 0.16, side: THREE.DoubleSide, depthWrite: false }));
  const shaft = new THREE.Mesh(track(new THREE.PlaneGeometry(1.7, 3.4)), shaftMat);
  shaft.rotation.x = -Math.PI / 2;
  shaft.position.set(0.3, 0.03, 1.9);
  scene.add(shaft);

  stage.onFrame((dt, time) => {
    const ease = stage.ease(dt, 2.4);
    const target = 0.62 + Math.sin(time * 0.35) * 0.05;
    hinge.rotation.y += (target - hinge.rotation.y) * ease;
    glowMat.color.setHSL(0.09, 0.75, 0.55 + Math.sin(time * 1.7) * 0.045);
    spill.intensity = 24 + Math.sin(time * 1.7) * 4;
    shaftMat.opacity = 0.13 + Math.sin(time * 1.7) * 0.035;
    shaft.rotation.z = -0.14 - hinge.rotation.y * 0.3;
  });
}
