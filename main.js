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
renderer.render(scene, camera)
