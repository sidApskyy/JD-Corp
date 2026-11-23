import type { Object3D } from "three";
import type { SceneIO, Stage, StageOptions } from "../stage";

// Projects: three massing studies on one plinth (form, city, interior). The selected study is lit.
export const options: StageOptions = { radius: 18, polar: 1.08, azimuth: 0.5, autoRotate: 0.08, target: [0, 1.4, 0] };

export function build(stage: Stage, io: SceneIO) {
  const { THREE, scene, track } = stage;
  stage.plinth(12, 5);
  const studies = [-4, 0, 4].map((x, i) => {
    const group = new THREE.Group();
    group.position.x = x;
    scene.add(group);
    const body = stage.walnut();
    const edge = stage.brass(0.5);
    return { group, body, edge, k: 0, hits: [] as Object3D[], index: i };
  });
  const hit = (obj: Object3D, index: number) => { obj.userData.index = index; studies[index].hits.push(obj); };

  // 01 Form: a folded, cantilevered volume.
  const shape = new THREE.Shape([new THREE.Vector2(-1.2, 0), new THREE.Vector2(1.2, 0), new THREE.Vector2(1.5, 1.6), new THREE.Vector2(0.2, 3.2), new THREE.Vector2(-1, 2.2)]);
  const formGeo = track(new THREE.ExtrudeGeometry(shape, { depth: 1.8, bevelEnabled: false }));
  formGeo.translate(0, 0, -0.9);
  const form = new THREE.Mesh(formGeo, studies[0].body);
  form.add(new THREE.LineSegments(track(new THREE.EdgesGeometry(formGeo, 20)), studies[0].edge));
  studies[0].group.add(form);
  hit(form, 0);

  // 02 City: a cluster of towers at different heights.
  [[-0.7, -0.5, 0.8, 3.6], [0.4, -0.6, 0.9, 2.6], [0.5, 0.6, 0.7, 4.2], [-0.6, 0.7, 0.7, 1.8]].forEach(([x, z, w, h]) => hit(stage.box(w, h, w, x, 0, z, studies[1].group, studies[1].body, studies[1].edge), 1));

  // 03 Interior: a room cut open, with a stair and a lit table.
  const g3 = studies[2].group;
  hit(stage.box(3, 0.1, 2.4, 0, 0, 0, g3, studies[2].body, studies[2].edge), 2);
  hit(stage.box(3, 2.2, 0.1, 0, 0.1, -1.15, g3, studies[2].body, studies[2].edge), 2);
  hit(stage.box(0.1, 2.2, 2.4, -1.45, 0.1, 0, g3, studies[2].body, studies[2].edge), 2);
  for (let s = 0; s < 6; s++) hit(stage.box(0.7, 0.12, 0.3, -0.9, 0.1 + s * 0.3, -0.85 + s * 0.3, g3, studies[2].body, studies[2].edge), 2);
  const tableTop = stage.box(1, 0.06, 0.6, 0.6, 0.62, 0.3, g3, studies[2].body, studies[2].edge);
  hit(tableTop, 2);
  const lamp = new THREE.PointLight(0xffc878, 0, 4, 1.5);
  lamp.position.set(0.6, 1.6, 0.3);
  g3.add(lamp);

  const all = studies.flatMap((s) => s.hits);
  const gold = new THREE.Color(0xd7b574), wood = new THREE.Color(0x6a452d);
  stage.onClick(() => { const picked = stage.pick(all); if (picked) io.select(picked.object.userData.index); });
  stage.onFrame((dt) => {
    const active = io.value();
    stage.canvas.style.cursor = stage.pick(all) ? "pointer" : "grab";
    studies.forEach((s, i) => {
      s.k += ((i === active ? 1 : 0) - s.k) * stage.ease(dt, 5);
      s.body.color.copy(wood).lerp(gold, s.k * 0.6);
      s.body.emissiveIntensity = s.k * 0.5;
      s.edge.opacity = 0.4 + s.k * 0.6;
      s.group.position.y = s.k * 0.25;
    });
    lamp.intensity = studies[2].k * 12;
  });
}
