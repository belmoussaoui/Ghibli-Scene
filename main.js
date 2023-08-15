console.log("hello world");

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)



console.log(sizes);



const canvas = document.querySelector('canvas#play')


const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)

mesh.position.x = 1;
mesh.rotation.y = Math.PI / 8;
// mesh.scale.set(2, 2, 1);
const controls = new THREE.OrbitControls(camera, canvas);


function animate() {
    requestAnimationFrame(animate); //crée une boucle qui permet de dessiner la scene à chaque fois que la page est chargée
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
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
