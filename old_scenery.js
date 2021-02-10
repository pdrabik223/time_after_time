

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














function add_platform(position, size) { // add platform



    let box = new THREE.Mesh(new THREE.BoxGeometry(size.x, size.y, size.z, 10, 10, 10), new THREE.MeshBasicMaterial({ color: 0x0048ff, transparent: true, opacity: 0.9 }));

    box.position.copy(position);
    geometry_arr.push(box);
    scene.add(box);


    let wireframe = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.BoxGeometry(size.x + 0.1, size.y + 0.1, size.z + 0.1, 1, 1, 1)), new THREE.LineBasicMaterial({ color: 0x00d0ff, linewidth: 1 }));
    wireframe.position.copy(position);
    scene.add(wireframe);

}
