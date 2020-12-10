import React from 'react';

import * as THREE from 'three/build/three.module.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

var container, stats;
var camera, scene, renderer;
var controls, water, sun, mesh;
var light;
let newMaterial;
let standardMaterial;
let newStandard;
const mixers = [];
const clock = new THREE.Clock();

const loader = new GLTFLoader();
const onProgress = () => { };
const onError = (errorMessage) => { console.log(errorMessage); };

function createSound() {
  var listener = new THREE.AudioListener();
  // camera.add( listener );

  // create a global audio source
  var sound = new THREE.Audio(listener);

  // load a sound and set it as the Audio object's buffer
  var audioLoader = new THREE.AudioLoader();
  audioLoader.load('New Recording 2.m4a', function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(1);
    sound.play();
  });

}

function createMaterial() {
  //let diffuseColor = 0xfcfafa;
  newMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, skinning: true });
  standardMaterial = new THREE.MeshStandardMaterial({ color: 0x8e80ab, skinning: true });
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('textures/wave-textures-white-background-vector_53876-60286.jpg');
  texture.encoding = THREE.sRGBEncoding;
  texture.anisotropy = 16;
  const imgTexture = new THREE.TextureLoader().load('pinkCloudBlueSky.jpg');
  imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
  imgTexture.anisotropy = 16;
  newStandard = new THREE.MeshStandardMaterial({
    //map: imgTexture,
    //color: 0xfcfafa,
    //bumpMap: imgTexture,
    //bumpScale: 1,
    //displacementMap: imgTexture,
    //displacementScale: 1,
    envMap: imgTexture,
    skinning: true
  });
  //  pointsMaterial = new THREE.pointsMaterial({
  //    color: diffuseColor,
  //    sizeAttenuation: true,
  //    size: 0.1
  //  });

}

let dolphin = null;

function loadDolphin() {
  const url = "game-ready_dolphin_swimming/scene.gltf";
  const onLoad = (gltf) => {
    const position = new THREE.Vector3(4, -20, -100);
    gltf.scene.position.copy(position);


    gltf.scene.rotation.y = 1.5;

    gltf.scene.scale.set(2, 2, 2);
    scene.add(gltf.scene);

    const model = gltf.scene.children[0];
    model.position.copy(position);

    dolphin = model;
    const animation = gltf.animations[0];

    const mixer = new THREE.AnimationMixer(model);
    mixers.push(mixer);

    const action = mixer.clipAction(animation);
    action.play();
  };

  loader.load(url, gltf => onLoad(gltf, newMaterial), onProgress, onError);
}

let cookie = null;

function loadCookie() {
  const url = "cookie/scene.gltf";

  const position = new THREE.Vector3(-30, 40, -1000);

  const onLoad = (gltf) => {
    gltf.scene.position.copy(position);
    gltf.scene.scale.set(0.3, 0.3, 0.3); // scale here
    scene.add(gltf.scene);

    cookie = gltf.scene.children[0];
  };
  loader.load(url, gltf => onLoad(gltf, newStandard), onProgress, onError);

}

let human = null;
function loadHuman() {
  const url = "human_animation_set/scene.gltf";

  const onLoad = (gltf) => {
    const position = new THREE.Vector3(-30, 0, -400);
    gltf.scene.position.copy(position);
    gltf.scene.scale.set(0.5, 0.5, 0.5);
    scene.add(gltf.scene);

    const model = gltf.scene.children[0];
    model.position.copy(position);

    human = model;
    const animation = gltf.animations[0];

    const mixer = new THREE.AnimationMixer(model);
    mixers.push(mixer);

    const action = mixer.clipAction(animation);
    action.play();
  };

  loader.load(url, gltf => onLoad(gltf, newMaterial), onProgress, onError);
}

let deer = null;

function loadDeer() {
  const url = "deer_23/scene.gltf";

  const onLoad = (gltf) => {
    const position = new THREE.Vector3(-30, 0, -200);
    gltf.scene.position.copy(position);
    gltf.scene.scale.set(10, 10, 10);
    scene.add(gltf.scene);

    const model = gltf.scene.children[0];
    model.position.copy(position);

    deer = model;
    const animation = gltf.animations[0];

    const mixer = new THREE.AnimationMixer(model);
    mixers.push(mixer);

    const action = mixer.clipAction(animation);
    action.play();
  };

  loader.load(url, gltf => onLoad(gltf, newMaterial), onProgress, onError);
}

function loadChair() {
  const url = "modern_rocking_chair/scene.gltf";

  const onLoad = (gltf) => {
    gltf.scene.position.copy(new THREE.Vector3(45, 0, 5));
    gltf.scene.scale.set(15, 15, 15);
    gltf.scene.rotation.y = 5;
    scene.add(gltf.scene);
  };

  loader.load(url, gltf => onLoad(gltf, newStandard), onProgress, onError);

}

function init() {

  container = document.getElementById('root');
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  light = new THREE.AmbientLight(0xc3d1d9, 1);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 1, 20000);
  sun = new THREE.Vector3();
  var waterGeometry = new THREE.PlaneBufferGeometry(10000, 20000);

  var waterNormals = new THREE.TextureLoader().load("waternormals.jpg", function (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  });

  water = new Water(
    waterGeometry,
    {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormals,
      alpha: 1.0,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xe6ded5,
      waterColor: 0xe6ded5,
      distortionScale: 1,
    }
  );

  water.rotation.x = - Math.PI / 2;

  scene.add(water);

  var sky = new Sky();
  sky.scale.setScalar(10000);
  scene.add(sky);
  scene.add(light);

  var uniforms = sky.material.uniforms;

  uniforms['turbidity'].value = 1;
  uniforms['rayleigh'].value = 5;
  uniforms['mieCoefficient'].value = 0.005;
  uniforms['mieDirectionalG'].value = 0.8;

  var parameters = {
    inclination: 0.471,
    azimuth: 0.1258
  };

  var pmremGenerator = new THREE.PMREMGenerator(renderer);

  function updateSun() {
    //var theta = Math.PI * (parameters.inclination - 1);
    var theta = Math.PI * (parameters.inclination - 0.5);
    var phi = 2 * Math.PI * (parameters.azimuth - 0.5);

    sun.x = Math.cos(phi);
    sun.y = Math.sin(phi) * Math.sin(theta);
    sun.z = Math.sin(phi) * Math.cos(theta);

    sky.material.uniforms['sunPosition'].value.copy(sun);
    water.material.uniforms['sunDirection'].value.copy(sun).normalize();

    scene.environment = pmremGenerator.fromScene(sky).texture;
  }

  updateSun();

  var geometry = new THREE.BoxBufferGeometry(0, 0,);
  var material = new THREE.MeshStandardMaterial({ roughness: 0 });

  mesh = new THREE.Mesh(geometry, material);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI * 0.495;
  controls.target.set(0, 10, 0);
  controls.minDistance = 40.0;
  controls.maxDistance = 500.0;
  controls.update();

  stats = new Stats();
  container.appendChild(stats.dom);

  window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

setTimeout(function () {
  loadDeer();
  loadDolphin();
}, 2500);

setTimeout(function () {
  loadHuman();
}, 10500);

setTimeout(function () {
  loadCookie();
}, 21500);

function moves() {
  if (deer && deer.position) {

    if (deer.position.z <= 150) {
      deer.position.z += 0.49;
    }

    if (deer.position.x <= 3) {
      deer.position.x += 0.1;
    }
  }

  if (human && human.position) {

    if (human.position.z <= 5500) {
      human.position.z += 2;
    }

    if (human.position.x <= 55) {
      human.position.x += 0.3;
    }
  }

  if (cookie && cookie.position) {

    if (cookie.position.z <= 5500) {
      cookie.position.z += 4;
    }

    if (cookie.position.x <= 55) {
      cookie.position.x += 0.3;
    }
  }
}

function update() {
  const delta = clock.getDelta();
  for (const mixer of mixers) {
    mixer.update(delta);
  }
}

function animate() {
  requestAnimationFrame(animate);
  render();
  stats.update();
  update();
  moves();
}

function render() {
  //console.log(camera);
  var time = performance.now() * 0.001;
  mesh.position.x = Math.sin(time) * 20;
  mesh.position.z = Math.cos(time) * 20;
  mesh.rotation.x = time * 0.5;
  mesh.rotation.z = time * 0.51;
  water.material.uniforms['time'].value += 1.0 / 60.0;

  renderer.render(scene, camera);
}

function App() {
  init();

  createMaterial();
  loadChair();

  animate();

  document.addEventListener('keyup', () => {
    createSound();
  })

  return <React.Fragment />;
}

export default App;
