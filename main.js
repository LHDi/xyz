/* import * as THREE from './three.module.js';
import * as dat from './dat.gui.module.js';
const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas });
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

//setting the camera
const fov = 40;
const aspect = 2;  // the canvas default
const near = .1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 50, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

//setting the lightening
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.PointLight(color, intensity);
light.position.set(0, 0, 0);
scene.add(light);


const objects = [];
const radius = 1;
const widthSegments = 50;
const heightSegments = 50;

const Sphere = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);

// Solar System
const solarSystem = new THREE.Object3D();
addObject(0, 0, solarSystem);

// Sun
const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xFFFF00 })
const sun = new THREE.Mesh(Sphere, sunMaterial)
sun.scale.set(5, 5, 5);
addObject(0, 0, sun, solarSystem);

// Earth Orbit
const earthOrbit = new THREE.Object3D();
addObject(15, 0, earthOrbit, solarSystem);

// Earth
const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233FF, emissive: 0x112244 });
const earth = new THREE.Mesh(Sphere, earthMaterial);
addObject(0, 0, earth, earthOrbit);

// Moon
const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 });
const moon = new THREE.Mesh(Sphere, moonMaterial);
moon.scale.set(.5, .5, .5)
addObject(2, 0, moon, earthOrbit);


const gui = new dat.GUI();

// Turns both axes and grid visible on/off
// dat.GUI requires a property that returns a bool
// to decide to make a checkbox so we make a setter
// and getter for `visible` which we can tell dat.GUI
// to look at.
class AxisGridHelper {
    constructor(node, units = 10) {
        const axes = new THREE.AxesHelper();
        axes.material.depthTest = false;
        axes.renderOrder = 2;  // after the grid
        node.add(axes);

        const grid = new THREE.GridHelper(units, units);
        grid.material.depthTest = false;
        grid.renderOrder = 1;
        node.add(grid);

        this.grid = grid;
        this.axes = axes;
        this.visible = false;
    }
    get visible() {
        return this._visible;
    }
    set visible(v) {
        this._visible = v;
        this.grid.visible = v;
        this.axes.visible = v;
    }
}

// add an AxesHelper to each node
function makeAxisGrid(node, label, units) {
    const helper = new AxisGridHelper(node, units);
    gui.add(helper, 'visible').name(label);
}

makeAxisGrid(solarSystem, 'solarSystem', 25);
makeAxisGrid(sun, 'sun');
makeAxisGrid(earthOrbit, 'earthOrbit');
makeAxisGrid(earth, 'earth');
makeAxisGrid(moon, 'moon');

function addObject(x, y, obj, parent) {
    const spread = 1;
    obj.position.x = x * spread;
    obj.position.y = y * spread;

    (parent || scene).add(obj);
    objects.push(obj);
}

function addSolidGeometry(x, y, geometry) {
    const mesh = new THREE.Mesh(geometry, createMaterial());
    addObject(x, y, mesh);
}

function render(time) {
    time *= 0.001;  // convert time to seconds
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    objects.forEach((obj) => {
        obj.rotation.y = time;
    });
    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

renderer.render(scene, camera)



requestAnimationFrame(render); */

import * as THREE from './node_modules/three/build/three.module.js';
const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas });
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const camera = new THREE.PerspectiveCamera(40, 2, .1, 1000);
camera.position.set(0, 20, 50);
camera.up.set(0, 1, 0);
camera.lookAt(0, 0, 0);

const light = new THREE.PointLight();
const subLight1 = new THREE.DirectionalLight(0xFFFFFF, .3);
subLight1.position.set(20, 0, 20)
const subLight2 = new THREE.DirectionalLight(0xFFFFFF, .3);
subLight1.position.set(-20, 0, 20)
light.position.set(0, 0, 0);
scene.add(light);
scene.add(subLight1);
scene.add(subLight2);

const objects = [];

const sphereGeometry = new THREE.SphereBufferGeometry(1, 50, 50);

{
    const Earth = new THREE.Object3D();
    const earthTexture = new THREE.TextureLoader().load("./textures/earthTex.jpg");
    const earthMaterial = new THREE.MeshPhongMaterial()
    earthMaterial.map = earthTexture;
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);

    earthMesh.position.set(20, 0, 0)
    objects.push(earthMesh);
    Earth.add(earthMesh);
    Earth.rotation.speed = .2
    objects.push(Earth);
    scene.add(Earth);
}

{
    const Sun = new THREE.Object3D();
    Sun.scale.set(5, 5, 5);
    Sun.position.set(0, 0, 0);
    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xFFFF00 });
    const sunTexture = new THREE.TextureLoader().load('./textures/sunTex.jpg');
    sunMaterial.emissiveMap = sunTexture;
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    Sun.add(sunMesh);
    Sun.rotation.speed = '0';
    scene.add(Sun);
    objects.push(Sun);
}


renderer.render(scene, camera);

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

function render(time) {
    time *= 0.001;  // convert time to seconds
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    objects.forEach((obj) => {
        const speed = obj.rotation.speed || 1;
        obj.rotation.y = time * speed;
    });
    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

requestAnimationFrame(render);