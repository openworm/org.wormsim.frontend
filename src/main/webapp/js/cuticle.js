

    var camera, 
    	scene,
    	dae,
    	renderer,
    	controls, 
    	topLight, 
    	bottomLight, 
    	$container, 
    	rotate;
    
    // model names
    var CUTICLE = "cuticle", MUSCLES = "muscles", NEURONS ="neurons";
    var modelMap = {};
    var loadedModelMap = {};
    modelMap[CUTICLE] = "/org.wormsim.frontend/resources/files/cuticleNotBent.dae";
    modelMap[MUSCLES] = "/org.wormsim.frontend/resources/files/muscles.dae";
    modelMap[NEURONS] = "/org.wormsim.frontend/resources/files/neurons.dae";
    
    start();
    animate();

    function start() {

        rotate = false;
        $container = $('#worm-model-container');
        $container.html('');
        $container.on('mousedown', function() {
            rotate = false;
        });
        
        $('#body').on('click', function(){
        	
        	// make all groups visible
        	for (var i=0; i < scene.children.length; i++) {
        		
        		child = scene.children[i];
        		
        		if (child.name === CUTICLE || child.name === MUSCLES || child.name === NEURONS ){
        			child.visible = true;
        		}
        	}
        	
        	render();
        });
        
        $('#muscles').on('click', function(){
        	
        	// make muscles and neurons visible
        	for (var i=0; i < scene.children.length; i++) {
        		
        		child = scene.children[i];
        		
        		if (child.name === MUSCLES || child.name === NEURONS ){
        			child.visible = true;
        		} else if (child.name === CUTICLE) {
        			child.visible = false;
        		}
        		
        	}
        	
        	render();
        });
        
        $('#nerves').on('click', function(){
        	
        	// make only neurons visible
        	for (var i=0; i < scene.children.length; i++) {
        		
        		child = scene.children[i];
        		
        		if (child.name === NEURONS ){
        			child.visible = true;
        		} else if (child.name === CUTICLE || child.name === MUSCLES) {
        			child.visible = false;
        		}
        		
        	}
        	
        	render();
        });

        camera = new THREE.PerspectiveCamera(45, $container.innerWidth() / $container.innerHeight(), 0.1, 500000);
        camera.position.x = -3.08;
        camera.position.y = 0.33;
        camera.position.z = -16;

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

        var spotLight = new THREE.SpotLight( 0xffffff );
        spotLight.position.set( 100, 1000, 100 );
        spotLight.castShadow = true;
        spotLight.shadowMapWidth = 1024;
        spotLight.shadowMapHeight = 1024;
        spotLight.shadowCameraNear = 500;
        spotLight.shadowCameraFar = 4000;
        spotLight.shadowCameraFov = 30;
        scene.add( spotLight );
        
        load(CUTICLE, modelMap.cuticle);
        //load(MUSCLES, modelMap.muscles);
        //load(NEURONS, modelMap.neurons);

        // new renderer, required for streaming animation files
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize($container.innerWidth(), $container.innerHeight());
        renderer.autoClear = true;
    }

    function load(groupName, daeLocation){
    	var manager = new THREE.LoadingManager();
        manager.onProgress = function(item, loaded, total) {
            console.log(item, loaded, total);
        };
        
    	var loader = new THREE.ColladaLoader(manager);
        loader.options.convertUpAxis = true;
        
        loader.load(daeLocation, function(collada) {
            dae = collada.scene;
            dae.name = groupName;
            dae.position.set(4,-2.5,-1);
            dae.scale.set(0.7, 0.7, 0.7);
            dae.rotation.set(0, -0.2, 0.2);
            
            $container.html(renderer.domElement);
            loadedModelMap[groupName] = dae;
            scene.add(loadedModelMap[groupName]);
            
            render();
        }, function(progress) {
            // TODO: show some progress if this is taking long
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
    
    /*
    Resize canvas when the user manually resizes window
    */
    window.addEventListener('resize', function() {
    	var width = $container.width();
        var height = $container.height();
        
        camera.aspect = (width) / (height);
        camera.updateProjectionMatrix();

    	renderer.setSize(width, height);
    	
    	render();
    }, false);
   
