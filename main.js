console.log("hello world");

const scene = new THREE.Scene();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 5;
camera.position.y = 1;
scene.add(camera)

console.log(sizes);

const canvas = document.querySelector('canvas#play')
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)

const controls = new THREE.OrbitControls(camera, canvas);

function createFloor() {
    const geometry = new THREE.CircleGeometry(2.5, 64); //taille,nb segments
    const material = new THREE.MeshBasicMaterial({
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
    const material = new THREE.MeshBasicMaterial({ color: 0xb76935, side: THREE.DoubleSide });
    const cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);
    //console.log("cylinder")
}

function createCone() {
    const geometry = new THREE.ConeGeometry(5, 20, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x188E2A, side: THREE.DoubleSide });
    const cone = new THREE.Mesh(geometry, material);
    cone.scale.x = 0.3;
    cone.scale.y = 0.12;
    cone.position.y = 1.5;
    cone.scale.z = 0.3;
    scene.add(cone);
}

createFloor();
createCylinder();
createCone();

function animate() {
    requestAnimationFrame(animate); //crée une boucle qui permet de dessiner la scene à chaque fois que la page est chargée
    controls.update();
    renderer.render(scene, camera);
}

animate();

function onWindowResize() {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
}

window.addEventListener('resize', onWindowResize, false)