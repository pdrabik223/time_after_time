
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

    }





let scene, free_camera, first_pearson_camera;
let debug_mode = true;

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


    let  diamond = new Diamond(0,15,0,0xffff88); 
    let  diamond2 = new Diamond(10,10,-10,0xff3388); 
    let  diamond3 = new Diamond(40,30,10,0x33ff88); 
    
    diamond.color(0xff0000); //zmienia kolor
    
    const axesHelper = new THREE.AxesHelper(5);
    if (debug_mode) scene.add(axesHelper);



    let ambient = new THREE.AmbientLight(0x555555, 0.5);
    scene.add(ambient);



    render();
}



let framecounter = 0;

function render() {

    framecounter++;
    
    renderer.render(scene, free_camera);
    requestAnimationFrame(render);

}

init();