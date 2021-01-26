//import * as Diamond from 'diamond.js';
//import * as Platforms from 'platforms.js'

class Diamond{
    constructor(posx, posy, posz, color)
        {  
            var g = new THREE.SphereGeometry(5, 4, 2);
            var mat = new THREE.MeshLambertMaterial({ color: color, opacity: 0.9, transparent: true })
            var m = new THREE.Mesh(g,mat );
            
            m.position.x = posx;
            m.position.y = posy;
            m.position.z= posz;
            
            THREE.Object3D.call( this );
            
            
            scene.add(m);
            
            
            this.par = m;


            var animate =function(){
                requestAnimationFrame(animate);
                m.rotation.y += 0.01;
        
                m.position.y = Math.sin(framecounter / 10) + 15;
                 }
          
            animate();
        }
    

    color(col) //zmienia kolor diamonda
        {
            this.par.material.color.setHex(col);
        }

    getPosition() //zwraca pozycje diamenta
        {
            return this.par.position;
        }

}




class Platforms{
    constructor(posx,posy,posz, height, width, depth)
        {
            var g2 = new THREE.BoxGeometry(width, height, depth);
            var mat2 = new THREE.MeshStandardMaterial({ color: 0x888888, opacity: 0.95, transparent: true })
            var l = new THREE.Mesh(g2,mat2 );

            l.position.x = posx;
            l.position.y = posy;
            l.position.z= posz;
            
            THREE.Object3D.call( this );
            
            
            scene.add(l);
            
            this.par2 = l;
        }

        change_color(color){
            this.par2.material.color.setHex( color );
        }

        getPosition() //zwraca pozycje platformy
        {
            return this.par.position;
        }

}

let scene, free_camera, first_pearson_camera;
let debug_mode = true;
let renderer, controls;

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


    let plane = new Platforms(0, -40, 0, 100, 100, 100);
    plane.change_color(0x99ff22);
 



    let  diamond = new Diamond(0,15,0,0xffff88); 
    let  diamond2 = new Diamond(10,10,-10,0xff3388); 
    let  diamond3 = new Diamond(40,30,10,0x33ff88); 
    
    diamond.color(0xffffff); //zmienia kolor


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