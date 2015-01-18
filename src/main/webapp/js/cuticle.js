$(function() {

    var camera, scene,dae,renderer, controls, topLight, bottomLight, $container, $progressBar = $('.progress-bar'), rotate;
    start();
    animate();


    function setProgressBar(percent) {
        // $progressBar.css('width', percent + '%').attr('aria-valuenow', ''+percent);
    }

    function start() {

        rotate = false;
        $container = $('#worm-model-container');
        $container.html('');
        $container.on('mousedown', function() {
            rotate = false;
        });
        
        $('#body').on('click', function(){
        	load("/org.wormsim.frontend/resources/files/cuticleNotBent.dae");
        });
        
        $('#muscles').on('click', function(){
        	load("/org.wormsim.frontend/resources/files/muscles.dae");
        });
        
        $('#nerves').on('click', function(){
        	load("/org.wormsim.frontend/resources/files/neurons.dae");
        });

        camera = new THREE.PerspectiveCamera(45, $container.innerWidth() / $container.innerHeight(), 0.1, 500000);
        camera.position.z = 5;

        scene = new THREE.Scene();
        var ambient = new THREE.AmbientLight(0x101030);
        scene.add(ambient);

        topLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
        topLight.position.set( 0, 1, 0 );

        scene.add(topLight);
        
        bottomLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
        bottomLight.position.set( 0, -1, 0 );

        scene.add(bottomLight);

        controls = new THREE.TrackballControls(camera, $container.get(0));
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;
        controls.keys = [ 65, 83, 68 ];
        controls.addEventListener('change', render);

        
        load('/org.wormsim.frontend/resources/files/cuticleNotBent.dae');

        renderer = new THREE.WebGLRenderer();
        renderer.setSize($container.innerWidth(), $container.innerHeight());

    }

    function load(daeLocation){
    	var manager = new THREE.LoadingManager();
        manager.onProgress = function(item, loaded, total) {
            console.log(item, loaded, total);
        };
        
    	var loader = new THREE.ColladaLoader(manager);
        loader.options.convertUpAxis = true;

        setProgressBar(15);

        scene.remove(dae);
        
        loader.load(daeLocation, function(collada) {
            dae = collada.scene;
            dae.position.set(0, 0, 0);
            dae.scale.set(0.7, 0.7, 0.7);
            dae.rotation.set(0.2, -0.2, 0.2);
            $container.html(renderer.domElement);
            scene.add(dae);
            setProgressBar(100);
            render();
        }, function(progress) {
            setProgressBar(Math.min(90, Math.floor(100 * progress.loaded / parseInt(progress.total, 10))));
        });
    }
    
    function animate() {
        requestAnimationFrame(animate);

        if(rotate) {
            controls.incrementRotationEnd(0.01, 0, 0);
        }
        controls.update();
    }

    function render() {
        renderer.render(scene, camera);
    }

    /*
     Set the ambient light to the given color. Accepts argument in the form of '#XXXXXX'
     */
    $.fn.setWormColor = function(color) {
        //Chop off leading #
        topLight.color.setHex('0x' + color.substr(1, color.length));
        bottomLight.color.setHex('0x' + color.substr(1, color.length));
        
        render();
    }.bind(this);

});