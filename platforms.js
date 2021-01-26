class Platforms{
    constructor(posx,posy,posz, height, width, depth)
        {
            var g = new THREE.BoxGeometry(width, height, depth);
            var mat = new THREE.MeshLambertMaterial({ color: 0x888888, opacity: 0.8, transparent: true })
            var m = new THREE.Mesh(g,mat );

            m.position.x = posx;
            m.position.y = posy;
            m.position.z= posz;
            
            THREE.Object3D.call( this );
            
            
            scene.add(m);
            
            this.par = m;
        }

        change_texture(path){
            var loader = THREE.TextureLoader();
            this.par.material.map = loader.load( path );
        }

}