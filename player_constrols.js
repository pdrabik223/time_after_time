

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
