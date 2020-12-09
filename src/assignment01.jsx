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
var light


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

function loadJellyfish0(position) {
    const url = "jellyfish_0/scene.gltf";

    if (!position) {
      var position = new THREE.Vector4(1000, 1000, 1000,1000);
        //position = getRandomPosition();
    }

    const onLoad = (gltf) => {
        gltf.scene.position.copy(position);
        gltf.scene.scale.set(10, 10, 10) // scale here
        scene.add(gltf.scene);
    };
    loader.load(url, gltf => onLoad(gltf), onProgress, onError);
}

function loadModelGirl(position) {
    const url = "floating_around/scene.gltf";
    const onLoad = ( gltf) => {
      gltf.scene.position.copy(position);
      gltf.scene.scale.set(0.3, 0.3, 0.3);
        scene.add( gltf.scene);
    };
    loader.load(url, gltf => onLoad(gltf), onProgress, onError);
}

function init() {

    container = document.getElementById('root');

    //
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    //light = new THREE.AmbientLight(0xd48b33,5);
    light = new THREE.AmbientLight(0xbf590b,5);

    scene = new THREE.Scene();

  //  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 7000);
  //  camera.position.set(-5000, 50, -1000);
    camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
		camera.position.set( 80, 80, 150 );
    //500, -0.1, 500



    sun = new THREE.Vector3();

    //

    // Water

    var waterGeometry = new THREE.PlaneBufferGeometry(10000, 20000);

    var waterNormals = new THREE.TextureLoader().load("/xiong-1 .jpg", function (texture) {
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
            sunColor: 0xd48b33,
            waterColor: 0xd48b33,
            //waterColor: 0x001e0f,
            distortionScale: 1,
            fog: scene.fog !== undefined
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

    uniforms['turbidity'].value = 10;
    uniforms['rayleigh'].value = 5;
    uniforms['mieCoefficient'].value = 0.005;
    uniforms['mieDirectionalG'].value = 0.8;
    //uniforms['turbidity'].value = 10;
    //uniforms['rayleigh'].value = 2;
    //uniforms['mieCoefficient'].value = 0.005;
    //uniforms['mieDirectionalG'].value = 0.8;

    var parameters = {
        inclination: 0.49,
        azimuth: 0.49,
    };

    var pmremGenerator = new THREE.PMREMGenerator(renderer);

    function updateSun() {

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

    //

    var geometry = new THREE.BoxBufferGeometry(6, 6, 6);
    var material = new THREE.MeshStandardMaterial({ roughness: 0 });

    mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);

    //controls.maxPolarAngle = Math.PI * 0.495;
				//controls.target.set( 0, 10, 0 );
				//controls.minDistance = 40.0;
				//controls.maxDistance = 200.0;
				//controls.update();

    controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.target.set(0, 50, 0);
    controls.minDistance = 40.0;
    controls.maxDistance = 150.0;
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

function animate() {

    requestAnimationFrame(animate);
    render();
    stats.update();

}

function render() {

    var time = performance.now() * 0.001;

    mesh.position.x = Math.sin(time) * 20;
    mesh.position.z = Math.cos(time) * 20;
    mesh.rotation.x = time * 0.5;
    mesh.rotation.z = time * 0.51;

    water.material.uniforms['time'].value += 1.0 / 60.0;

    scene.children.map(child => {
        if (child.type === "Group" && child.position) {
            child.rotation.y = time * 0.4;
        }
    })

    renderer.render(scene, camera);

}

function App() {
    init();


    console.log(scene);

    for (let i = 0; i < 3; i++) {
        // loadJellyfish0();
    }

    for (let i = 0; i < 30; i++) {
        // loadJellyfish3();
    }

    loadJellyfish0(new THREE.Vector3(-20, 0, 0));
    loadJellyfish0(new THREE.Vector3(0, 0, -60));
    //loadJellyfish0(new THREE.Vector3(30, 0, 30));
    loadJellyfish0(new THREE.Vector3(60, 0, -20));
    loadModelGirl(new THREE.Vector3(20, -0.1, -20));
    // loadJellyfish4(new THREE.Vector3(0, 0, 30));
    // loadModels("jellyfish_4/scene.gltf", new THREE.Vector3(90, 0, 0));
    // loadVeribot(new THREE.Vector3(-120, 2, 0));
    // loadJellyfish1();
    // loadJellyfish2();
    // loadJellyfish3();

    animate();
    return <React.Fragment />;
}

export default App;
