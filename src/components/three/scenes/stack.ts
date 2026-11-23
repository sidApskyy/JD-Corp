import type { SceneIO, Stage, StageOptions } from "../stage";

// Businesses: seven floors of one building. The selected floor slides out to be read.
export const options: StageOptions = { radius: 15, polar: 1.13, azimuth: 0.75, autoRotate: 0.1, target: [0, 2.6, 0] };

export function build(stage: Stage, io: SceneIO) {
  const { THREE, scene } = stage;
  stage.plinth(6.4, 6.4);
  const floors = Array.from({ length: 7 }, (_, i) => {
    const group = new THREE.Group();
    group.position.y = i * 0.78;
    scene.add(group);
    const body = stage.walnut();
    const edge = stage.brass(0.55);
    const slab = stage.box(3.6, 0.62, 3.6, 0, 0, 0, group, body, edge);
    slab.userData.index = i;
    // Window bands give each floor a sense of scale.
    for (let w = -1; w <= 1; w++) stage.box(0.7, 0.24, 0.02, w * 1.05, 0.2, 1.81, group, body, edge);
    return { group, body, edge, slab, k: 0 };
  });
  stage.box(0.12, 1.2, 0.12, 0, 7 * 0.78, 0, scene, stage.walnut(), stage.brass(0.7));
  const slabs = floors.map((f) => f.slab);
  const gold = new THREE.Color(0xd7b574), wood = new THREE.Color(0x6a452d);
  const light = new THREE.PointLight(0xffc878, 40, 8, 1.7);
  scene.add(light);

  stage.onClick(() => { const hit = stage.pick(slabs); if (hit) io.select(hit.object.userData.index); });
  stage.onFrame((dt) => {
    const active = io.value();
    stage.canvas.style.cursor = stage.pick(slabs) ? "pointer" : "grab";
    floors.forEach((f, i) => {
      f.k += ((i === active ? 1 : 0) - f.k) * stage.ease(dt, 5);
      f.group.position.x = f.k * 1.4;
      f.group.position.z = f.k * 0.6;
      f.body.color.copy(wood).lerp(gold, f.k * 0.6);
      f.body.emissiveIntensity = f.k * 0.5;
      f.edge.opacity = 0.45 + f.k * 0.55;
    });
    light.position.set(3, active * 0.78 + 1.2, 3);
  });
}
