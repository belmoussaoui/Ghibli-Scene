const loader = new THREE.FileLoader();
var file1, file2;
var ghibliMaterial;
loader.load(
    "./shaders/fragment.glsl",

    function(data) {
        file1 = data;
    }
);

loader.load(
    "./shaders/vertex.glsl",

    function(data) {
        file2 = data;
        ghibliMaterial = new THREE.ShaderMaterial({
            vertexShader: file2,
            fragmentShader: file1
        });
    }
);

const scene = new THREE.Scene();

// setup camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.z = 7;
camera.position.y = 1;
scene.add(camera);

// setup render
const canvas = document.querySelector("canvas#play");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// camera
const controls = new THREE.OrbitControls(camera, canvas);
controls.autoRotate = false;
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI / 2;
controls.maxDistance = 10;
controls.minDistance = 3;
controls.enablePan = false;

const trunkMaterial = new THREE.MeshToonMaterial({ color: 0x44341f });

const gltfLoader = new THREE.GLTFLoader();
gltfLoader.load("./models/tree.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);
    model.position.y = 1.1;
    model.scale.set(0.5, 0.5, 0.5);
    model.traverse((mesh) => {
        if (mesh.name == "Cylinder") {
            mesh.material = trunkMaterial;
            mesh.castShadow = true;

            return;
        }
        mesh.material = ghibliMaterial;
        mesh.castShadow = true;
    });
});

function createFloor() {
    const geometry = new THREE.CircleGeometry(5, 64);
    const material = new THREE.ShadowMaterial({
        color: 0xd3ba89,
        side: THREE.DoubleSide,
        transparent: true,
    });
    material.opacity = 1;
    const circle = new THREE.Mesh(geometry, material);
    circle.rotation.x = Math.PI / 2;
    circle.position.y = -1.83;
    scene.add(circle);
    circle.receiveShadow = true;
}

function createLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(10, 20, 0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(-1, 5, 1);
    scene.add(pointLight);
}

createFloor();
createLight();

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

function onWindowResize() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

window.addEventListener("resize", onWindowResize, false);