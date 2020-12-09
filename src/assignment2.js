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



//const getRandom = (num) => {
    //const random = Math.random() * num;
    //return Math.random() > 0.5 ? random : random * -1;
//};

//const getRandomPosition = () => {
  //  return new THREE.Vector3(getRandom(80), Math.random(80), getRandom(40));
    //return new THREE.Vector3(getRandom(150), Math.random(10), getRandom(40));
//};

function createSound(){
  var listener = new THREE.AudioListener();
  // camera.add( listener );

  // create a global audio source
  var sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
  var audioLoader = new THREE.AudioLoader();
  audioLoader.load( 'New Recording 2.m4a', function( buffer ) {
    sound.setBuffer( buffer );
	  sound.setLoop( true );
	  sound.setVolume( 1 );
	  sound.play();
  });

}

function createMaterial(){
  //let diffuseColor = 0xfcfafa;
  newMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, skinning: true});
  standardMaterial = new THREE.MeshStandardMaterial({ color:0x8e80ab, skinning: true});
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load( 'textures/wave-textures-white-background-vector_53876-60286.jpg' );
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

// function createSphere(){
//   var geometry = new THREE.SphereGeometry( 3, 3, 3 );
//   //var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
//   var sphere = new THREE.Mesh( geometry, newStandard );
//   mesh.position.y = 0;
//   mesh.position.x = -200;
//   mesh.position.z = 30;
//     //var light = new THREE.PointLight(0xfcf4ca, 0.00005);
//     //scene.add(light);
//   scene.add( mesh );
//   scene.add( sphere );
// }

function loadPavilion(position) {
  const url = "pavilion_0715_tiling/scene.gltf";

  if (!position) {
    var position = new THREE.Vector4(1000, 1000, 1000,1000);
      //position = getRandomPosition();
  }

  const onLoad = (gltf) => {
      gltf.scene.position.copy(position);
      gltf.scene.scale.set(0.4, 0.4, 0.4); // scale here
      scene.add(gltf.scene);
  };
  loader.load(url, gltf => onLoad(gltf, standardMaterial), onProgress, onError);

}

let deer = null;

function loadDeer(position) {
    const url = "deer_23/scene.gltf";
    const onLoad = ( gltf) => {
      gltf.scene.position.copy(position);
      gltf.scene.scale.set(10, 10, 10);
      scene.add( gltf.scene);

      const model = gltf.scene.children[ 0 ];
      model.position.copy( position );

      deer = model;
      const animation = gltf.animations[ 0 ];

      const mixer = new THREE.AnimationMixer( model );
      mixers.push( mixer );

      const action = mixer.clipAction(animation);
      action.play();
    };

    loader.load(url, gltf => onLoad(gltf, newMaterial), onProgress, onError);
}



function init() {

    container = document.getElementById('root');

    //
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    //light = new THREE.AmbientLight(0xd48b33,5);
    light = new THREE.AmbientLight(0xc3d1d9,1);


    scene = new THREE.Scene();

  //  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 7000);
  //  camera.position.set(-5000, 50, -1000);
    camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 1, 20000 );
    camera.position.set( 3.8405354837301853,  12.309264315878611,  146.9500632596774 );
		//camera.position.set( 30,  30,  100 );
    //500, -0.1, 500

    sun = new THREE.Vector3();

    //

    // Water

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
            //sunColor: 0xc3d1d9,
            //waterColor: 0xc3d1d9,
            sunColor: 0xe6ded5,
            waterColor: 0xe6ded5,
            //waterColor: 0x001e0f,
            distortionScale: 1,
            //fog: scene.fog !== undefined
            //fog: scene.fog = new THREE.FogExp2( 0xFEFAD4, 0.001)
            //scene.fog = new THREE.FogExp2( 0xFEFAD4, 0.01);
        }
    );

    water.rotation.x = - Math.PI / 2;

    scene.add(water);

    // Skybox

    var sky = new Sky();
    sky.scale.setScalar(10000);
    scene.add(sky);
    scene.add(light);

    var uniforms = sky.material.uniforms;

    //uniforms['turbidity'].value = 1;
    //uniforms['rayleigh'].value = 10;
    //uniforms['mieCoefficient'].value = 0.001;
    uniforms['turbidity'].value = 1;
    uniforms['rayleigh'].value = 5;
    uniforms['mieCoefficient'].value = 0.005;
    uniforms['mieDirectionalG'].value = 0.8;
    //uniforms['turbidity'].value = 10;
    //uniforms['rayleigh'].value = 2;
    //uniforms['mieCoefficient'].value = 0.005;
    //uniforms['mieDirectionalG'].value = 0.8;

    var parameters = {
        inclination: 0.471,
        //azimuth: 0.49
        azimuth: 0.1258

    };

    var pmremGenerator = new THREE.PMREMGenerator(renderer);

    function updateSun() {
        //var theta = Math.PI * (parameters.inclination - 1);
        var theta = Math.PI * (parameters.inclination -0.5);
        var phi = 2 * Math.PI * (parameters.azimuth - 0.5);

        sun.x = Math.cos(phi);
        sun.y = Math.sin(phi) * Math.sin(theta);
        sun.z = Math.sin(phi) * Math.cos(theta);

        sky.material.uniforms['sunPosition'].value.copy(sun);
        water.material.uniforms['sunDirection'].value.copy(sun).normalize();

        scene.environment = pmremGenerator.fromScene(sky).texture;

    }

    updateSun();

    //

    var geometry = new THREE.BoxBufferGeometry(0, 0, );
    var material = new THREE.MeshStandardMaterial({ roughness: 0 });

    mesh = new THREE.Mesh(geometry, material);
    //scene.add(mesh);

    //controls.maxPolarAngle = Math.PI * 0.495;
				//controls.target.set( 0, 10, 0 );
				//controls.minDistance = 40.0;
				//controls.maxDistance = 200.0;
				//controls.update();

    controls = new OrbitControls(camera, renderer.domElement);
  //  controls.maxPolarAngle = Math.PI * 0.5;
    //controls.target.set(0, 50, 0);
    //controls.minDistance = 40.0;
    //controls.maxDistance = 150.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.target.set(0, 10, 0);
    controls.minDistance = 40.0;
    controls.maxDistance = 500.0;
    controls.update();

    //controls.maxPolarAngle = Math.PI * 0.495;
			//	controls.target.set( 0, 20, 0 );
			//	controls.minDistance = 40.0;
			//	controls.maxDistance = 200.0;
		//		controls.update();

    stats = new Stats();
    container.appendChild(stats.dom);

    // GUI

    var gui = new GUI();

    var folder = gui.addFolder('Sky');
    folder.add(parameters, 'inclination', 0, 0.5, 0.0001).onChange(updateSun);
    folder.add(parameters, 'azimuth', 0, 1, 0.0001).onChange(updateSun);
    folder.open();

    var uniforms = water.material.uniforms;

    var folder = gui.addFolder('Water');
    folder.add(uniforms.distortionScale, 'value', 0, 8, 0.1).name('distortionScale');
    folder.add(uniforms.size, 'value', 0.1, 10, 0.1).name('size');
    folder.add(uniforms.alpha, 'value', 0.9, 1, .001).name('alpha');
    folder.open();

    //

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    //camera = new THREE.PerspectiveCamera( 35, container.clientWidth / container.clientHeight, 1, 100 );
    //camera.position.set( -1.5, 1.5, 6.5 );
    renderer.setSize(window.innerWidth, window.innerHeight);

}

function moveDeer () {
  if(deer && deer.position){

    if(deer.position.z <= 15) {
      deer.position.z += 0.6;
    }

    if(deer.position.x <= 4) {
      deer.position.x += 0.08;
    }
  }
}

function update() {

  const delta = clock.getDelta();

  for ( const mixer of mixers ) {
    mixer.update( delta );
  }

}

function animate() {
    requestAnimationFrame(animate);
    render();
    stats.update();
    update();
    moveDeer();
}

function render() {
  //console.log(camera);
    var time = performance.now() * 0.001;

    mesh.position.x = Math.sin(time) * 20;
    mesh.position.z = Math.cos(time) * 20;
    mesh.rotation.x = time * 0.5;
    mesh.rotation.z = time * 0.51;

    water.material.uniforms['time'].value += 1.0 / 60.0;

    // scene.children.map(child => {
    //     if (child.type === "Group" && child.position) {
    //         child.rotation.y = time * 0.4;
    //     }
    // })

    renderer.render(scene, camera);

}

function App() {
    init();

    for (let i = 0; i < 3; i++) {
        // loadJellyfish0();
    }

    for (let i = 0; i < 30; i++) {
        // loadJellyfish3();
    }

    //loadJellyfish0(new THREE.Vector3(-20, 0, 0));
    //loadJellyfish0(new THREE.Vector3(0, 0, -60));
    //loadJellyfish0(new THREE.Vector3(30, 0, 30));
    //loadJellyfish0(new THREE.Vector3(60, 0, -20));
    //loadModelGirl(new THREE.Vector3(20, -0.1, -20));
    loadDeer(new THREE.Vector3(-30, 0, -300));
    createMaterial();
    //loadPavilion(new THREE.Vector3(-335, 70, 50));
    loadPavilion(new THREE.Vector3(-300, 70, 90));
    // createSphere();

    //loadCloud(new THREE.Vector3(200, -0.1, -20));
    // loadJellyfish4(new THREE.Vector3(0, 0, 30));
    // loadModels("jellyfish_4/scene.gltf", new THREE.Vector3(90, 0, 0));
    // loadVeribot(new THREE.Vector3(-120, 2, 0));
    // loadJellyfish1();
    // loadJellyfish2();
    // loadJellyfish3();


    document.addEventListener('keyup', () => {
        createSound();
        animate();
    })

    return <React.Fragment />;
}

export default App;
