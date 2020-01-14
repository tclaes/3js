// Variables for setup

let container;
let camera;
let renderer;
let scene;
let dinosour;

function init() {
    container = document.querySelector('.scene');

    // Create scene
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 500;

    // Camera setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 5, 50);

    const ambient = new THREE.AmbientLight(0x404040, 10);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xFFFFFF, 5);
    light.position.set(10, 10, 10);
    scene.add(light);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias:true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    //Load model
    let loader = new THREE.GLTFLoader();
    loader.load('./tyrannosarus_rex_free_model/scene.gltf', function(gltf){
        scene.add(gltf.scene);
        dinosour = gltf.scene.children[0];
        animate();
    });

}

function animate() {
    requestAnimationFrame(animate);
    dinosour.rotation.z += 0.0005;
    renderer.render(scene, camera);
 }

 function onWindowResize() {
     camera.aspect = container.clientWidth / container.clientHeight;
     camera.updateProjectionMatrix();

     renderer.setSize(container.clientWidth, container.clientHeight);
 }

window.onresize = onWindowResize;
init();