let scene, free_camera, first_pearson_camera;
let debug_mode = true;



let player = new THREE.Group();



let diamond;
const loader = new THREE.TextureLoader();

function init() {


    scene = new THREE.Scene();

    const light = new THREE.DirectionalLight(0x444444, 4, 100);
    light.position.set(50, 50, 50); //default; light shining from top
    light.castShadow = true; // default false

    scene.add(light);

    scene.add(new THREE.DirectionalLightHelper(light, 5))


    free_camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    first_pearson_camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    first_pearson_camera.position.set(0, 2, 0);
    player.add(first_pearson_camera);


    free_camera.position.z = 100;

    scene.background = new THREE.CubeTextureLoader().setPath('textures/skybox/').load([
        'px.png',
        'nx.png',
        'py.png',
        'ny.png',
        'pz.png',
        'nz.png'
    ]);


    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls = new THREE.OrbitControls(free_camera, renderer.domElement);
    controls.update();


    document.body.appendChild(renderer.domElement);


    plane = new THREE.Mesh(new THREE.BoxGeometry(200, 1, 200), new THREE.MeshLambertMaterial({ color: 0x888888, opacity: 0.8, transparent: true }))
    plane.position.set(0, -0.5, 0);
    scene.add(plane);

    diamond = new THREE.Mesh(new THREE.SphereGeometry(5, 4, 2), new THREE.MeshLambertMaterial({ color: 0x6666ff, opacity: 0.9, transparent: true }))

    diamond.position.set(0, 0, 0);
    scene.add(diamond);

    const axesHelper = new THREE.AxesHelper(5);
    if (debug_mode) scene.add(axesHelper);

    let ambient = new THREE.AmbientLight(0x555555, 0.5);
    scene.add(ambient);


    player.add(new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), new THREE.MeshLambertMaterial({ color: 0xff0000 })))
    scene.add(player);

    player.position.set(0, 1.1, 0);


    render();
}



camera_counter = 0;
step = 0.1;
window.addEventListener('keydown', function (event) {


    // console.log(event.key);

    switch (event.key) {
        case 'a': // Left a
            player.rotation.y += 0.07;
            console.log(player.position); ww
            break;

        case 'd': // Right d 
            console.log(player.position);
            player.rotation.y -= 0.07;
            break;

        case 'w': // Up w
            console.log(player.position);
            player.position.z -= Math.cos(player.rotation.y) * step;
            player.position.x -= Math.sin(player.rotation.y) * step;
            break;


        case 's': // Down s
            console.log(player.position);
            player.position.z += Math.cos(player.rotation.y) * step;
            player.position.x += Math.sin(player.rotation.y) * step;
            break;


        case ' ': //space
            camera_counter++;
            console.log(camera_counter)
            break;

    }
}, false);

window.addEventListener('mouseup', function (event) {
    first_pearson_camera.rotation


}, false);



let framecounter = 0;
function render() {

    framecounter++;
    diamond.rotation.y += 0.01;


    diamond.position.y = Math.sin(framecounter / 10) + 15;






    if (camera_counter % 2 == 0) {
        renderer.render(scene, free_camera);
    }
    else renderer.render(scene, first_pearson_camera);



    requestAnimationFrame(render);






}

init();