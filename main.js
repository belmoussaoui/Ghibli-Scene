console.log("hello world");

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh);

const camera = new THREE.PerspectiveCamera(75, 800 / 600)
camera.position.z = 3
scene.add(camera)



const canvas = document.querySelector('canvas#play')


const renderer = new THREE.WebGLRenderer({ canvas: canvas })
mesh.position.x = 2;
mesh.rotation.y = Math.PI / 8;
mesh.scale.set(2, 2, 1);

function animate() {
    requestAnimationFrame(animate); //crée une boucle qui permet de dessiner la scene à chaque fois que la page est chargée
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();