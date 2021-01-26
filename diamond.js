
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

