THREE.ColorManagement.enabled = false;

const scene = new THREE.Scene();

// setup camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.z = 5;
camera.position.y = 1;
scene.add(camera);

// setup render
const canvas = document.querySelector("canvas#play");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// camera
const controls = new THREE.OrbitControls(camera, canvas);


// texture loader
const textureLoader = new THREE.TextureLoader();
const gradientTexture = textureLoader.load("./textures/5.jpg");
const toonMaterial = new THREE.MeshToonMaterial({ color: 0x273e35 });
gradientTexture.generateMipmaps = false;
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
toonMaterial.gradientMap = gradientTexture;

const gltfLoader = new THREE.GLTFLoader();
gltfLoader.load("/models/tree.glb", (gltf) => {
    const model = gltf.scene;
    console.log(gltf);
    scene.add(model);
    model.position.y = 1.1;
    model.scale.set(0.5, 0.5, 0.5);
    model.traverse((mesh) => {
        mesh.material = toonMaterial;
        mesh.castShadow = true;
    });
});

function createFloor() {
    const geometry = new THREE.CircleGeometry(5, 64); // taille, nb segments
    const material = new THREE.MeshToonMaterial({
        color: 0x556b2f,
        side: THREE.DoubleSide,
    });
    const circle = new THREE.Mesh(geometry, material);
    circle.rotation.x = Math.PI / 2;
    circle.position.y = -1.515;
    scene.add(circle);
    circle.receiveShadow = true;
}

function createCylinder() {
    const geometry = new THREE.CylinderGeometry(0.2, 0.5, 3, 100);
    const material = new THREE.MeshToonMaterial({ color: 0x432f14 });
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.castShadow = true;
    scene.add(cylinder);
}

function createCone() {
    const geometry = new THREE.ConeGeometry(5, 20, 32);
    const material = new THREE.MeshToonMaterial({ color: 0x188e2a });
    const cone = new THREE.Mesh(geometry, material);
    cone.castShadow = true;
    cone.scale.x = 0.3;
    cone.scale.y = 0.12;
    cone.position.y = 1.5;
    cone.scale.z = 0.3;
    scene.add(cone);
}

function createLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.position.set(10, 20, 0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(-1, 5, 1);
    scene.add(pointLight);
}

createFloor();
createCylinder();
// createCone();
createLight();

function animate() {
    requestAnimationFrame(animate); // crée une boucle qui permet de dessiner la scene à chaque fois que la page est chargée
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
