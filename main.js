//import * as Diamond from 'diamond.js';
//import * as Platforms from 'platforms.js'
import { PointerLockControls } from './js/jsm/controls/PointerLockControls.js';



function distance(vector1, vector2) {


    return (Math.pow(vector2.x - vector1.x, 2) + Math.pow(vector2.y - vector1.y, 2) + Math.pow(vector2.z - vector1.z, 2));



}



let sun_sprite;
let mountines;


let player_mesh;
let scene, free_camera, first_pearson_camera, player_camera;
let debug_mode = true;
let renderer, controls;
let ambient;
let player = new THREE.Group();
let Aim_point;


var timer = new THREE.Clock();
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

var grey1;
function init() {




    scene = new THREE.Scene();

    const light = new THREE.DirectionalLight(0x333333, 4, 100);
    light.position.set(50, 50, 50); //default; light shining from top


    scene.add(light);

    scene.add(new THREE.DirectionalLightHelper(light, 5))


    player_camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 10000);
    player_camera.position.set(0, 0.9, 0);

    player.add(player_camera);

    controls = new PointerLockControls(player_camera, document.body);


    scene.background = new THREE.CubeTextureLoader().setPath('textures/skybox/').load([
        'px.jpg', // px
        'nx.jpg', // nx
        'py.jpg', // py
        'ny.jpg', // ny
        'pz.jpg', // pz
        'nz.jpg'  // nz
    ]);


    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);




    document.body.appendChild(renderer.domElement);



    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);


    // player_camera.add(Aim_point = new THREE.Mesh(new THREE.SphereGeometry(0.05, 32, 32), new THREE.MeshBasicMaterial({ color: 0xff0000 })));
    // Aim_point.position.set(0, 0, 2);
    Aim_point = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 10), new THREE.MeshBasicMaterial({ visible: false }));

    player.add(Aim_point);

    let ambient = new THREE.AmbientLight(0x555555, 0.5);
    scene.add(ambient);

    player_mesh = new THREE.Mesh(new THREE.BoxGeometry(0.25, 3, 0.25), new THREE.MeshBasicMaterial({ color: 0xff0000, visible: false }));

    player.add(player_mesh);

    scene.add(player);

    let point_light = new THREE.DirectionalLight(0x17d2fc, 5, 100);
    point_light.position.set(0, 100, 1400); //default; light shining from t

    sun_sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.TextureLoader().load('textures/slonce.png') }));
    sun_sprite.position.set(0, 100, 1400)
    sun_sprite.scale.set(500, 500, 500)
    sun_sprite.add(point_light);
    //sun_sprite.scale(new THREE.Vector3(30, 30, 30));
    scene.add(sun_sprite);

    player.position.set(0, 50, 0);

    let plane = new THREE.Mesh(new THREE.BoxGeometry(1000, 0.5, 2000, 10, 10, 10), new THREE.MeshLambertMaterial({ color: 0x49126b }));

    geometry_arr.push(plane);
    scene.add(plane);
    let plane_lines = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.BoxGeometry(1000.01, 0.51, 2000.01, 80, 80, 160)), new THREE.LineBasicMaterial({ color: 0xff59fc, linewidth: 2 }));




    //   plane_lines.material.color = 0xff59fc;
    scene.add(plane_lines);

    let moutains_r = new THREE.Mesh(new THREE.PlaneGeometry(1898, 240), new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('textures/gory.png'), transparent: true }));
    moutains_r.position.set(-700, 120, 0);
    moutains_r.scale.set(2, 2, 2);
    moutains_r.rotation.set(3.1415 / 2, 3.1415 / 2, -3.1415 / 2)

    scene.add(moutains_r)
    let moutains_background_r = new THREE.Mesh(new THREE.PlaneGeometry(1898, 240), new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('textures/gory_2s.png'), transparent: true }));
    moutains_background_r.position.set(-850, 380, 0);
    moutains_background_r.scale.set(3.5, 3.5, 3.5);
    moutains_background_r.rotation.set(3.1415 / 2, 3.1415 / 2, -3.1415 / 2)

    scene.add(moutains_background_r)





    let moutains_l = new THREE.Mesh(new THREE.PlaneGeometry(7680, 971), new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('textures/gory_3.png'), transparent: true }));
    moutains_l.position.set(700, 120, 0);
    moutains_l.scale.set(0.9, 0.9, 0.9);
    moutains_l.rotation.set(3.1415 / 2, -3.1415 / 2, 3.1415 / 2)

    scene.add(moutains_l)
    let moutains_background_l = new THREE.Mesh(new THREE.PlaneGeometry(7680, 971), new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('textures/gory_3.png'), transparent: true }));
    moutains_background_l.position.set(850, 380, 0);
    moutains_background_l.scale.set(1, 1, 1);
    moutains_background_l.rotation.set(3.1415 / 2, -3.1415 / 2, 3.1415 / 2)
    scene.add(moutains_background_l)


    /*
        let ground = new THREE.Mesh(new THREE.PlaneGeometry(1600, 4000), new THREE.MeshLambertMaterial({ color: 0x49126b }));
        ground.rotation.set(3.1415 / 2, 3.1415 / 2, -3.1415 / 2)
    
        ground.position.y = -300;
        scene.add(ground);
    
        let ground_lines = new THREE.LineSegments(new THREE.WireframeGeometry(ground), new THREE.LineBasicMaterial({ color: 0xff59fc, linewidth: 2 }));
        ground_lines.position.y = -299.5;
        scene.add(ground_lines);
    */




    ambient = new THREE.AmbientLight(0x555555, 0.5);

    grey1 = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5, 10, 10, 10), new THREE.MeshBasicMaterial({ color: 0xfa7d0f, transparent: true, opacity: 0.9 }));

    grey1.position.set(5, 0, 5);
    geometry_arr.push(grey1);
    scene.add(grey1);

    let grey2 = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5, 10, 10, 10), new THREE.MeshBasicMaterial({ color: 0x17d2fc, transparent: true, opacity: 0.9 }));

    grey2.position.set(-5, 2.5, 5);
    geometry_arr.push(grey2);
    scene.add(grey2);

    let grey3 = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5, 10, 10, 10), new THREE.MeshBasicMaterial({ color: 0xff59fc, transparent: true, opacity: 0.9 }));
    grey3.rotation.x += 3.1425 / 2;
    grey3.position.set(5, 5, -5);
    geometry_arr.push(grey3);
    scene.add(grey3);


    let grey4 = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5, 10, 10, 10), new THREE.MeshBasicMaterial({ color: 0x444444, transparent: true, opacity: 0.9 }));

    grey4.position.set(-5, 7, -5);
    geometry_arr.push(grey4);
    scene.add(grey4);

    let dyjamond = new THREE.Mesh(new THREE.SphereGeometry(4, 4, 2), new THREE.MeshBasicMaterial({ color: 0x17d2fc, transparent: true, opacity: 0.9 }));
    dyjamond.position.set(-100, 2.5, 100);
    geometry_arr.push(dyjamond);
    scene.add(dyjamond);





    timer.start();
    scene.add(ambient);
    render();
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

        case 'KeyF':
            ctrl = true;


            break;
        case 'KeyP':

            free_camera_bool = true;
            break;
        case 'KeyE':
            console.log(player.position);
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
            player.position.set(0, 50, 0);
            timer = new THREE.Clock(true);
            v_przemieszczenia.set(0, 0, 0);
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

    if (distance(new THREE.Vector3(player.position.x, player.position.y, player.position.z), new THREE.Vector3(-100, 2.5, 100)) < 20) {
        timer.stop();
        document.getElementById("time").innerHTML = timer.getElapsedTime().toFixed(2) + " NEW PB!";
    }
    if (free_camera_bool) renderer.render(scene, player_camera);
    else renderer.render(scene, player_camera);






    requestAnimationFrame(render);

}

init();