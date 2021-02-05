//import * as Diamond from 'diamond.js';
//import * as Platforms from 'platforms.js'
import { PointerLockControls } from './js/jsm/controls/PointerLockControls.js';



function distance(vector1, vector2) {


    return (Math.pow(vector2.x - vector1.x, 2) + Math.pow(vector2.y - vector1.y, 2) + Math.pow(vector2.z - vector1.z, 2));



}
function add_platform(position, size) {



    let box = new THREE.Mesh(new THREE.BoxGeometry(size.x, size.y, size.z, 10, 10, 10), new THREE.MeshBasicMaterial({ color: 0x0048ff, transparent: true, opacity: 0.9 }));

    box.position.copy(position);
    geometry_arr.push(box);
    scene.add(box);


    let wireframe = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.BoxGeometry(size.x + 0.1, size.y + 0.1, size.z + 0.1, 1, 1, 1)), new THREE.LineBasicMaterial({ color: 0x00d0ff, linewidth: 1 }));
    wireframe.position.copy(position);
    scene.add(wireframe);

}
var timer = new THREE.Clock();

function play() {
    Element.prototype.remove = function () {
        this.parentElement.removeChild(this);
    }
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
        for (var i = this.length - 1; i >= 0; i--) {
            if (this[i] && this[i].parentElement) {
                this[i].parentElement.removeChild(this[i]);


            }
        }
    }

    controls.lock();
    document.getElementById("start").remove();
    document.getElementById("menu").remove();
    timer.start();
    music_start();
};

let sun_sprite;

let listener;
let sound;
let audioLoader;
let music_plays = false;
let mute_on = false;

let player_mesh;
let scene, player_camera;
let debug_mode = true;
let renderer, controls;
let ambient;
let player = new THREE.Group();
let Aim_point;



let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let jump = false;
let canJump = false;
let free_camera_bool = false;
let ctrl = false;
let shift = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
let raycaster;

let geometry_arr = [];
let frustum = new THREE.Frustum();

var grey1;
function init() {




    scene = new THREE.Scene();

    const light = new THREE.DirectionalLight(0x333333, 4, 100);
    light.position.set(50, 50, 50); //default; light shining from top


    scene.add(light);




    player_camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 10000);
    player_camera.position.set(0, 0.9, 0);

    player.add(player_camera);

    controls = new PointerLockControls(player_camera, document.body);


    scene.background = new THREE.CubeTextureLoader().setPath('textures/skybox/').load([
        'px.png', // px
        'nx.png', // nx
        'py.png', // py
        'ny.png', // ny
        'pz.png', // pz
        'nz.png'  // nz
    ]);


    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    render.sortObjects = false;


    document.body.appendChild(renderer.domElement);

    listener = new THREE.AudioListener();
    player_camera.add(listener);

    sound = new THREE.Audio(listener);

    audioLoader = new THREE.AudioLoader();

    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);
    Aim_point = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 10), new THREE.MeshBasicMaterial({ visible: false }));
    player.add(Aim_point);
    let ambient = new THREE.AmbientLight(0x555555, 0.5);
    scene.add(ambient);
    player_mesh = new THREE.Mesh(new THREE.BoxGeometry(0.25, 3, 0.25), new THREE.MeshBasicMaterial({ color: 0xff0000, visible: false }));
    player.add(player_mesh);
    scene.add(player);
    sun_sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.TextureLoader().load('textures/slonce.png') }));
    sun_sprite.position.set(0, 100, 1400)
    sun_sprite.scale.set(500, 500, 500)

    sun_sprite.renderOrder = 120;
    scene.add(sun_sprite);

    player.position.set(0, 50, -45);




    let plane = new THREE.Mesh(new THREE.BoxGeometry(100, 0.5, 100, 10, 10, 10), new THREE.MeshLambertMaterial({ color: 0x49126b }));

    geometry_arr.push(plane);

    scene.add(plane);
    let plane_lines = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.BoxGeometry(100.01, 0.51, 100.01, 6, 6, 6)), new THREE.LineBasicMaterial({ color: 0xff59fc, linewidth: 2 }));

    scene.add(plane_lines);




    let moutains_r = new THREE.Mesh(new THREE.PlaneGeometry(1898, 240), new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('textures/gory.png'), side: THREE.DoubleSide, transparent: true, depthWrite: false }));
    moutains_r.position.set(-700, 120, 0);
    moutains_r.scale.set(2, 2, 2);
    moutains_r.rotation.set(3.1415 / 2, 3.1415 / 2, -3.1415 / 2)

    moutains_r.renderOrder = 110;

    scene.add(moutains_r);

    let moutains_background_r = new THREE.Mesh(new THREE.PlaneGeometry(1898, 240), new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('textures/gory_2s.png'), transparent: true }));
    moutains_background_r.side = THREE.DoubleSide;
    moutains_background_r.position.set(-850, 380, 0);
    moutains_background_r.scale.set(3.5, 3.5, 3.5);
    moutains_background_r.rotation.set(3.1415 / 2, 3.1415 / 2, -3.1415 / 2)


    scene.add(moutains_background_r);


    let moutains_r_2 = new THREE.Mesh(new THREE.PlaneGeometry(1898, 240), new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('textures/gory.png'), side: THREE.DoubleSide, transparent: true, depthWrite: false }));
    moutains_r_2.position.set(-700, 120, 3796);
    moutains_r_2.scale.set(2, 2, 2);
    moutains_r_2.rotation.set(3.1415 / 2, 3.1415 / 2, -3.1415 / 2)

    moutains_r_2.renderOrder = 110;

    scene.add(moutains_r_2);

    let moutains_background_r_2 = new THREE.Mesh(new THREE.PlaneGeometry(1898, 240), new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('textures/gory_2s.png'), transparent: true }));
    moutains_background_r_2.side = THREE.DoubleSide;
    moutains_background_r_2.position.set(-850, 380, 6643);
    moutains_background_r_2.scale.set(3.5, 3.5, 3.5);
    moutains_background_r_2.rotation.set(3.1415 / 2, 3.1415 / 2, -3.1415 / 2)


    scene.add(moutains_background_r_2);


    let moutains_l_b = new THREE.Mesh(new THREE.PlaneGeometry(1460, 240), new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('textures/gory.png'), side: THREE.DoubleSide, transparent: true, depthWrite: false }));

    moutains_l_b.position.set(700, 120, -1989);
    moutains_l_b.scale.set(2, 2, 2);


    moutains_l_b.renderOrder = 100;

    scene.add(moutains_l_b);

    let moutains_background_l_b = new THREE.Mesh(new THREE.PlaneGeometry(1400, 240), new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('textures/gory_2s.png'), transparent: true }));
    moutains_background_l_b.side = THREE.DoubleSide;
    moutains_background_l_b.position.set(850, 380, -2189);
    moutains_background_l_b.scale.set(3.5, 3.5, 3.5);


    scene.add(moutains_background_l_b);
    /*
        let moutains_l_f = new THREE.Mesh(new THREE.PlaneGeometry(1460, 240), new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('textures/gory.png'), side: THREE.DoubleSide, transparent: true, depthWrite: false }));
    
        moutains_l_f.position.set(700, 120, 3796 + 11898);
        moutains_l_f.scale.set(2, 2, 2);
        moutains_l_f.rotation.y = 3.1415 / 2;
    
        moutains_l_f.renderOrder = 100;
    
        scene.add(moutains_l_f);
    
        let moutains_background_l_f = new THREE.Mesh(new THREE.PlaneGeometry(1400, 240), new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('textures/gory_2s.png'), transparent: true }));
        moutains_background_l_f.side = THREE.DoubleSide;
        moutains_background_l_f.position.set(850, 380, 3796 + 1898);
        moutains_background_l_f.scale.set(3.5, 3.5, 3.5);
        moutains_background_l_f.rotation.y = 3.1415 / 2;
        scene.add(moutains_background_l_f);
    */



    let moutains_l = new THREE.Mesh(new THREE.PlaneGeometry(1898, 240), new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('textures/gory.png'), side: THREE.DoubleSide, transparent: true, depthWrite: false }));

    moutains_l.position.set(700, 120, 0);
    moutains_l.scale.set(2, 2, 2);
    moutains_l.rotation.set(3.1415 / 2, -3.1415 / 2, 3.1415 / 2)

    moutains_l.renderOrder = 110;

    scene.add(moutains_l);

    let moutains_background_l = new THREE.Mesh(new THREE.PlaneGeometry(1898, 240), new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('textures/gory_2s.png'), transparent: true }));
    moutains_background_l.side = THREE.DoubleSide;
    moutains_background_l.position.set(850, 380, 0);
    moutains_background_l.scale.set(3.5, 3.5, 3.5);
    moutains_background_l.rotation.set(3.1415 / 2, -3.1415 / 2, 3.1415 / 2)

    scene.add(moutains_background_l);




    let moutains_l_2 = new THREE.Mesh(new THREE.PlaneGeometry(1898, 240), new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('textures/gory.png'), side: THREE.DoubleSide, transparent: true, depthWrite: false }));

    moutains_l_2.position.set(700, 120, 3796);
    moutains_l_2.scale.set(2, 2, 2);
    moutains_l_2.rotation.set(3.1415 / 2, -3.1415 / 2, 3.1415 / 2)

    moutains_l_2.renderOrder = 110;

    scene.add(moutains_l_2);

    let moutains_background_l_2 = new THREE.Mesh(new THREE.PlaneGeometry(1898, 240), new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('textures/gory_2s.png'), transparent: true }));
    moutains_background_l_2.side = THREE.DoubleSide;
    moutains_background_l_2.position.set(850, 380, 6643);
    moutains_background_l_2.scale.set(3.5, 3.5, 3.5);
    moutains_background_l_2.rotation.set(3.1415 / 2, -3.1415 / 2, 3.1415 / 2)

    scene.add(moutains_background_l_2);





    // groun the lowes point 
    let ground = new THREE.Mesh(new THREE.PlaneGeometry(1600, 4000), new THREE.MeshBasicMaterial({ color: 0x49126b }));
    ground.rotation.x = -3.1415 / 2;
    ground.position.y = -100;
    scene.add(ground);

    let ground_lines = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.PlaneGeometry(1600, 4000, 25, 50)), new THREE.LineBasicMaterial({ color: 0xff59fc, linewidth: 4 }));

    ground_lines.position.y = -99.5;
    ground_lines.rotation.x = -3.1415 / 2
    scene.add(ground_lines);


    let ground_2 = new THREE.Mesh(new THREE.PlaneGeometry(1600, 4000), new THREE.MeshBasicMaterial({ color: 0x49126b }));
    ground_2.rotation.x = -3.1415 / 2;
    ground_2.position.y = -100;
    ground_2.position.z = 4000;
    scene.add(ground_2);

    let ground_lines_2 = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.PlaneGeometry(1600, 4000, 25, 50)), new THREE.LineBasicMaterial({ color: 0xff59fc, linewidth: 4 }));

    ground_lines_2.position.y = -99.5;
    ground_lines_2.rotation.x = -3.1415 / 2
    ground_lines_2.position.z = 4000;
    scene.add(ground_lines_2);






    ambient = new THREE.AmbientLight(0x555555, 0.5);



    add_platform(new THREE.Vector3(0, -5, 85), new THREE.Vector3(50, 8, 60));
    add_platform(new THREE.Vector3(-40, 0, 240), new THREE.Vector3(50, 6, 70));

    add_platform(new THREE.Vector3(40, 5, 350), new THREE.Vector3(30, 8, 80));

    add_platform(new THREE.Vector3(-20, 9, 450), new THREE.Vector3(30, 2, 80));

    add_platform(new THREE.Vector3(-30, 8, 600), new THREE.Vector3(50, 4, 80));
    add_platform(new THREE.Vector3(20, 14, 750), new THREE.Vector3(50, 3, 50));

    add_platform(new THREE.Vector3(60, 15, 880), new THREE.Vector3(40, 2, 80));


    add_platform(new THREE.Vector3(90, 20, 990), new THREE.Vector3(40, 4, 60));


    add_platform(new THREE.Vector3(60, 30, 1100), new THREE.Vector3(60, 3, 110));


    add_platform(new THREE.Vector3(90, 35, 1300), new THREE.Vector3(40, 5, 80));
    add_platform(new THREE.Vector3(110, 40, 1500), new THREE.Vector3(30, 4, 80));

    add_platform(new THREE.Vector3(140, 45, 1600), new THREE.Vector3(20, 3, 80));

    add_platform(new THREE.Vector3(130, 60, 1750), new THREE.Vector3(40, 3, 80));
    add_platform(new THREE.Vector3(120, 55, 1850), new THREE.Vector3(40, 3, 120));

    add_platform(new THREE.Vector3(110, 45, 1950), new THREE.Vector3(40, 3, 60));


    add_platform(new THREE.Vector3(120, 49, 2000), new THREE.Vector3(40, 3, 70));
    add_platform(new THREE.Vector3(110, 51, 2100), new THREE.Vector3(30, 3, 60));

    add_platform(new THREE.Vector3(100, 55, 2250), new THREE.Vector3(40, 3, 90));



    add_platform(new THREE.Vector3(80, 40, 2400), new THREE.Vector3(40, 3, 60));

    add_platform(new THREE.Vector3(60, 45, 2500), new THREE.Vector3(40, 3, 90));

    add_platform(new THREE.Vector3(40, 40, 2600), new THREE.Vector3(30, 4, 80));

    add_platform(new THREE.Vector3(30, 36, 2700), new THREE.Vector3(30, 3, 50));


    add_platform(new THREE.Vector3(40, 40, 2800), new THREE.Vector3(30, 2, 80));

    add_platform(new THREE.Vector3(50, 45, 2900), new THREE.Vector3(30, 1, 90));


    add_platform(new THREE.Vector3(60, 50, 3000), new THREE.Vector3(30, 6, 90));



    add_platform(new THREE.Vector3(50, 50, 3100), new THREE.Vector3(40, 6, 60));

    //add_platform(new THREE.Vector3(70, 55, 3150), new THREE.Vector3(30, 2, 120));


    add_platform(new THREE.Vector3(80, 55, 3250), new THREE.Vector3(80, 3, 100));


    add_platform(new THREE.Vector3(70, 55, 3350), new THREE.Vector3(80, 3, 100));





    add_platform(new THREE.Vector3(70, 65, 3500), new THREE.Vector3(80, 2, 80));

    //    add_platform(new THREE.Vector3(40, 75, 3600), new THREE.Vector3(80, 3, 80));

    add_platform(new THREE.Vector3(0, 80, 3600), new THREE.Vector3(80, 3, 80));


    add_platform(new THREE.Vector3(-40, 90, 3500), new THREE.Vector3(80, 3, 80));

    add_platform(new THREE.Vector3(-90, 105, 3550), new THREE.Vector3(80, 2, 80));
    add_platform(new THREE.Vector3(-140, 115, 3500), new THREE.Vector3(80, 2, 80));



    add_platform(new THREE.Vector3(-110, 125, 3450), new THREE.Vector3(80, 4, 80));


    add_platform(new THREE.Vector3(-120, 135, 3300), new THREE.Vector3(80, 1, 80));

    add_platform(new THREE.Vector3(-160, 145, 3200), new THREE.Vector3(60, 3, 70));
    add_platform(new THREE.Vector3(-180, 150, 3100), new THREE.Vector3(60, 2, 70));


    add_platform(new THREE.Vector3(-100, 155, 3050), new THREE.Vector3(60, 2, 50));


    add_platform(new THREE.Vector3(-180, 160, 3000), new THREE.Vector3(90, 1, 90));


    let dyjamond = new THREE.Mesh(new THREE.SphereGeometry(4, 4, 2), new THREE.MeshBasicMaterial({ color: 0x17d2fc, transparent: true, opacity: 0.9 }));
    dyjamond.position.set(-180, 155, 2900);
    geometry_arr.push(dyjamond);
    scene.add(dyjamond);


    document.getElementById("start").onclick = function () { play() };
    document.getElementById("sound").onclick = function () { mute() };


    timer.start();
    scene.add(ambient);
    render();
}

let s_v_przemieszczenia = new THREE.Vector3(0, 0, 0);
let s_position = new THREE.Vector3(0, 50, -45);

function music_start() {
    audioLoader.load('sounds/tapes.mp3', function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.2);
        sound.play();
        music_plays = true;
    });
}

function mute() {
    if (mute_on) {
        if (!music_plays) {
            sound.play();
            music_plays = true;
        }
        else {
            sound.setVolume(0.2);
            mute_on = false;
        }
    }
    else {
        sound.setVolume(0.0);
        mute_on = true;
    }
}

function music_stop() {
    sound.pause();
    music_plays = false;
}


const onKeyDown = function (event) {

    switch (event.code) {

        case 'ArrowUp':
        case 'KeyW':
            moveForward = true;
            break;

        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = true;
            break;

        case 'ArrowDown':
        case 'KeyS':
            moveBackward = true;
            break;

        case 'ArrowRight':
        case 'KeyD':
            moveRight = true;
            break;

        case 'Space':

            if (canJump) jump = true;
            canJump = false;


            break;

        case 'ShiftLeft':
            shift = true;

            break;



        case 'KeyE':
            s_v_przemieszczenia.copy(v_przemieszczenia);
            s_position.copy(player.position);


            break;


    }



};

const onKeyUp = function (event) {

    switch (event.code) {

        case 'ArrowUp':
        case 'KeyW':
            moveForward = false;

            break;

        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = false;
            break;

        case 'ArrowDown':
        case 'KeyS':
            moveBackward = false;
            break;

        case 'ArrowRight':
        case 'KeyD':
            moveRight = false;
            break;
        case 'KeyU':
            controls.lock();
            break;
        case 'Space':
            canJump = false;
            break;


        case 'ShiftLeft':
            shift = false;

            break;
        case 'KeyR':
            player.position.copy(s_position);
            // timer = new THREE.Clock(true);
            v_przemieszczenia.copy(s_v_przemieszczenia);
            break;

        case 'KeyP':
            player.position.set(0, 50, -45);
            timer = new THREE.Clock(true);
            v_przemieszczenia.set(0, 0, 0);
            s_position.set(0, 50, -45);
            s_v_przemieszczenia.set(0, 0, 0);

            break;

        case 'KeyM':
            if (mute_on) {
                sound.setVolume(0.2);
                mute_on = false;
            }
            else mute();
            break;

        case 'KeyN':
            if (music_plays) music_stop();
            else music_start();
            break;
        case 'KeyL':
            console.log(player.position);
            break;
    }




};



document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);



let framecounter = 0;
const f_velocity = 0.1 / 4 * 2, b_velocity = 0.08 / 4 * 2, s_velocity = 0.08 / 4 * 2, j_velocity = 1;
const friction = 0.08;
const air_handling = 0.3;
const shift_ratio = 0.5;
const speed_ratio = 0.7;
var v_direction = new THREE.Vector3(0, 0, 0);

var v_przemieszczenia = new THREE.Vector3(0, 0, 0);
let c_f = true, c_b = true, c_l = true, c_r = true, c_u = true, c_d = true;

var contact_array = [];


function set_time() {
    document.getElementById("time").innerHTML = timer.getElapsedTime().toFixed(2);


}

function render() {
    set_time();
    sun_sprite.position.z = 1000 + player.position.z;

    framecounter++;

    player_camera.getWorldDirection(v_direction);
    Aim_point.position.set(10 * v_direction.x, player_mesh.position.y, 10 * v_direction.z);
    player_mesh.lookAt(Aim_point.position);
    player_mesh.rotation.x = 0;
    player_mesh.rotation.z = 0;


    v_przemieszczenia.x *= 1 - (friction * !c_d);
    v_przemieszczenia.z *= 1 - (friction * !c_d);
    if (shift && !c_d) v_przemieszczenia.x = 0;
    if (shift && !c_d) v_przemieszczenia.z = 0;

    v_przemieszczenia.y -= (0.05 / 2); // gravity

    v_przemieszczenia.z += v_direction.z * f_velocity * speed_ratio * moveForward * (1 - c_d * air_handling) * (1 - shift * shift_ratio);
    v_przemieszczenia.x += v_direction.x * f_velocity * speed_ratio * moveForward * (1 - c_d * air_handling) * (1 - shift * shift_ratio);
    v_przemieszczenia.z -= v_direction.z * b_velocity * speed_ratio * moveBackward * (1 - c_d * air_handling);
    v_przemieszczenia.x -= v_direction.x * b_velocity * speed_ratio * moveBackward * (1 - c_d * air_handling);


    v_przemieszczenia.x += (v_direction.z) * s_velocity * speed_ratio * moveLeft * (1 - c_d * air_handling);
    v_przemieszczenia.z -= (v_direction.x) * s_velocity * speed_ratio * moveLeft * (1 - c_d * air_handling);
    v_przemieszczenia.x -= (v_direction.z) * s_velocity * speed_ratio * moveRight * (1 - c_d * air_handling);
    v_przemieszczenia.z += (v_direction.x) * s_velocity * speed_ratio * moveRight * (1 - c_d * air_handling);


    v_przemieszczenia.y += j_velocity * jump * c_u * !c_d * (1 - shift * shift_ratio);
    if (jump) jump = false;

    if (!shift && Math.abs(v_przemieszczenia.x) < 0.02) v_przemieszczenia.x = 0;
    if (!shift && Math.abs(v_przemieszczenia.y) < 0.02) v_przemieszczenia.y = 0;
    if (!shift && Math.abs(v_przemieszczenia.z) < 0.02) v_przemieszczenia.z = 0;

    const max_vel = 4;
    if (v_przemieszczenia.x > max_vel) v_przemieszczenia.x = max_vel;
    if (v_przemieszczenia.x < -max_vel) v_przemieszczenia.x = -max_vel;

    if (v_przemieszczenia.y > max_vel) v_przemieszczenia.y = max_vel;
    v_przemieszczenia.y = Math.max(v_przemieszczenia.y, -3);

    if (v_przemieszczenia.z > max_vel) v_przemieszczenia.z = max_vel;
    if (v_przemieszczenia.z < -max_vel) v_przemieszczenia.z = -max_vel;

    {



        c_f = true; // front
        c_b = true; // bottom
        c_l = true; // left
        c_r = true; // right
        c_u = true; // up
        c_d = true; // down 

        /*
        
                if (moveForward) {
                    local_player.position.z += v_direction.z * f_velocity * speed_ratio;
                    local_player.position.x += v_direction.x * f_velocity * speed_ratio;
        
                } else if (moveBackward) {
                    local_player.position.z -= v_direction.z * b_velocity * speed_ratio;
                    local_player.position.x -= v_direction.x * b_velocity * speed_ratio;
                }
                if (moveLeft) {
                    local_player.position.x += (v_direction.z) * s_velocity * speed_ratio;
                    local_player.position.z -= (v_direction.x) * s_velocity * speed_ratio;
                } else if (moveRight) {
                    local_player.position.x -= (v_direction.z) * s_velocity * speed_ratio;
                    local_player.position.z += (v_direction.x) * s_velocity * speed_ratio;
                }
                local_player.position.y -= 0.25;
                if (jump) local_player.position.y += 30;
        
        */
        let local_player = player.clone();


        local_player.position.set(player.position.x + v_przemieszczenia.x, player.position.y + v_przemieszczenia.y, player.position.z + v_przemieszczenia.z);



        var originPoint = local_player.position.clone();

        for (var vertexIndex = 0; vertexIndex < player_mesh.geometry.vertices.length; vertexIndex++) {// przez wszystkie 

            var localVertex = player_mesh.geometry.vertices[vertexIndex].clone();

            var globalVertex = localVertex.applyMatrix4(player_mesh.matrix);

            var directionVector = globalVertex.sub(player_mesh.position);

            var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());

            var collisionResults = ray.intersectObjects(geometry_arr);

            if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
                contact_array.push(true);

            }
            else contact_array.push(false);


        }

    }


    if (contact_array[0] || contact_array[1] || contact_array[4] || contact_array[5]) {
        c_u = false;
        v_przemieszczenia.y = Math.min(v_przemieszczenia.y, 0);
    }
    if (contact_array[2] || contact_array[3] || contact_array[6] || contact_array[7]) {
        c_d = false;
        canJump = true;
        v_przemieszczenia.y = Math.max(v_przemieszczenia.y, 0);

    }
    else { canJump = false; }


    /*
     if ((contact_array[4] && contact_array[7]) || (contact_array[3] && contact_array[0])) {   c_f = false; console.log("front");}
     if ((contact_array[2] && contact_array[5]) || (contact_array[1] && contact_array[6])) { c_b = false; console.log("back"); }
     if ((contact_array[7] && contact_array[5]) || (contact_array[6] && contact_array[0])) { c_r = false; console.log("right"); }
     if ((contact_array[1] && contact_array[3]) || (contact_array[4] && contact_array[2])) { c_l = false; console.log("left"); }
    */

    contact_array = [];
    { // controls 


        /*
        
                if (moveForward && c_f && !c_d) {
                    player.position.z += v_direction.z * f_velocity * speed_ratio;
                    player.position.x += v_direction.x * f_velocity * speed_ratio;
                } else if (moveBackward && c_b && !c_d) {
                    player.position.z -= v_direction.z * b_velocity * speed_ratio;
                    player.position.x -= v_direction.x * b_velocity * speed_ratio;
                }
                if (moveLeft && c_l && !c_d) {
                    player.position.x += (v_direction.z) * s_velocity * speed_ratio;
                    player.position.z -= (v_direction.x) * s_velocity * speed_ratio;
                } else if (moveRight && c_r && !c_d) {
                    player.position.x -= (v_direction.z) * s_velocity * speed_ratio;
                    player.position.z += (v_direction.x) * s_velocity * speed_ratio;
                }
                if (jump && c_u) {
        
                    player.position.y += 30;
        
                    jump = false;
                    canJump = false;
                }
                else if (c_d) player.position.y -= 0.25;
                speed_ratio = 1;
        */


    }
    player.position.set(player.position.x + v_przemieszczenia.x, player.position.y + v_przemieszczenia.y, player.position.z + v_przemieszczenia.z);
    if (player.position.y < -100) {

        player.position.copy(s_position);
        // timer = new THREE.Clock(true);
        v_przemieszczenia.copy(s_v_przemieszczenia);

    }

    if (distance(new THREE.Vector3(player.position.x, player.position.y, player.position.z), new THREE.Vector3(-180, 155, 2900)) < 20) {
        timer.stop();
        document.getElementById("time").innerHTML = timer.getElapsedTime().toFixed(2) + " NEW PB!";
    }
    if (free_camera_bool) renderer.render(scene, player_camera);
    else renderer.render(scene, player_camera);


    requestAnimationFrame(render);

}

init();