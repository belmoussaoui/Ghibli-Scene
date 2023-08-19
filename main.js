const scene = new THREE.Scene();


// setup camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
camera.position.z = 5;
camera.position.y = 1;
scene.add(camera)

// setup render
const canvas = document.querySelector('canvas#play')
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(window.innerWidth, window.innerHeight)

const controls = new THREE.OrbitControls(camera, canvas);

function createFloor() {
    const geometry = new THREE.CircleGeometry(2.5, 64); // taille, nb segments
    const material = new THREE.MeshToonMaterial({
        color: 0x86E426,
        side: THREE.DoubleSide
    });
    const circle = new THREE.Mesh(geometry, material);
    circle.rotation.x = Math.PI / 2;
    circle.position.y = -1.515;
    scene.add(circle);
}

function createCylinder() {
    const geometry = new THREE.CylinderGeometry(0.2, 0.5, 3, 100);
    const material = new THREE.MeshToonMaterial({ color: 0xb76935 });
    const cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);
}

function createCone() {
    const geometry = new THREE.ConeGeometry(5, 20, 32);
    const material = new THREE.MeshToonMaterial({ color: 0x188E2A });
    const cone = new THREE.Mesh(geometry, material);
    cone.scale.x = 0.3;
    cone.scale.y = 0.12;
    cone.position.y = 1.5;
    cone.scale.z = 0.3;
    scene.add(cone);
}

function createLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
    directionalLight.position.set(-1, 0.25, 0);
    scene.add(directionalLight);
    const pointLight = new THREE.PointLight(0xff9000, 0.5);
    pointLight.position.set(-1, -0.5, 1);
    scene.add(pointLight);
}

createFloor();
createCylinder();
createCone();
createLight();

function animate() {
    requestAnimationFrame(animate); // crée une boucle qui permet de dessiner la scene à chaque fois que la page est chargée
    controls.update();
    renderer.render(scene, camera);
}

animate();

function onWindowResize() {
    let width = window.innerWidth
    let height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
}

window.addEventListener('resize', onWindowResize, false)