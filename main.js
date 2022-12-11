import "./style.css";
import { plainText as geojsonInput } from "./data/tempe_split.geojson";

import * as THREE from "three";
import { Vector2 } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let renderer, scene, camera;

init(document.getElementById("container"));
animate();

function init(container) {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xb0b0b0);

  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0, 0, 200);

  const group = new THREE.Group();
  scene.add(group);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(0.75, 0.75, 1.0).normalize();
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xcccccc, 0.2);
  scene.add(ambientLight);

  const helper = new THREE.GridHelper(160, 10);
  helper.rotation.x = Math.PI / 2;
  group.add(helper);

  for (const mesh of polygonsToMeshes(JSON.parse(geojsonInput))) {
    group.add(mesh);
  }

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 100;
  controls.maxDistance = 1000;

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}

function polygonsToMeshes(geojson) {
  var meshes = [];

  for (const feature of geojson.features) {
    const pts = feature.geometry.coordinates[0].map(
      ([x, y]) => new Vector2(x, y)
    );
    // TODO Assumes CW?
    const shape = new THREE.Shape(pts);

    var depth = 8;
    if (feature.properties.type == "intersection") {
      depth = 15;
    }

    const geom = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: false,
    });

    meshes.push(new THREE.Mesh(geom, new THREE.MeshPhongMaterial()));
  }

  return meshes;
}
