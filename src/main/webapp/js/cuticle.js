var camera, scene, dae, renderer, controls, topLight, bottomLight, $container, rotate;
var clock = new THREE.Clock();
clock.start();
// model names
var CUTICLE = "cuticle", MUSCLES = "muscles", NEURONS = "neurons";
var modelMap = {};
var loadedModelMap = {};
modelMap[CUTICLE] = "/resources/files/cuticleNotBent.dae";
modelMap[MUSCLES] = "/resources/files/muscles.dae";
modelMap[NEURONS] = "/resources/files/neurons.dae";

var light;
var radius = 20;
var constant = 0;
var floor;

start();
animate();

function start() {

	rotate = false;
	$container = $('#worm-model-container');
	$container.html('');
	$container.on('mousedown', function() {
		rotate = false;
	});

	$('#body').on(
			'click',
			function() {

				// make all groups visible
				for (var i = 0; i < scene.children.length; i++) {

					child = scene.children[i];

					if (child.name === CUTICLE || child.name === MUSCLES
							|| child.name === NEURONS) {
						child.visible = true;
					}
				}

				render();
			});

	$('#muscles').on('click', function() {

		// make muscles and neurons visible
		for (var i = 0; i < scene.children.length; i++) {

			child = scene.children[i];

			if (child.name === MUSCLES || child.name === NEURONS) {
				child.visible = true;
			} else if (child.name === CUTICLE) {
				child.visible = false;
			}

		}

		render();
	});

	$('#nerves').on('click', function() {

		// make only neurons visible
		for (var i = 0; i < scene.children.length; i++) {

			child = scene.children[i];

			if (child.name === NEURONS) {
				child.visible = true;
			} else if (child.name === CUTICLE || child.name === MUSCLES) {
				child.visible = false;
			}

		}

		render();
	});

	camera = new THREE.PerspectiveCamera(45, $container.innerWidth()
			/ $container.innerHeight(), 1, 500);

	camera.position.x = 8;
	camera.position.y = 16;
	camera.position.z = 25;
	camera.rotation.x = -0.5;
	camera.rotation.y = 0;
	camera.rotation.z = 0;

	scene = new THREE.Scene();

	var floorMaterial = new THREE.MeshPhongMaterial({
		color : 0xAAAAAA,
		side : THREE.DoubleSide
	});
	floor = new THREE.Mesh(new THREE.PlaneGeometry(30000, 30000, 1, 1),
			floorMaterial);
	floor.rotation.x = Math.PI / 2;
	floor.receiveShadow = true;
	floorMaterial.receiveShadow = true;

	scene.add(floor);

	light = new THREE.SpotLight(0xffffff);
	light.position.set(0, 10, 0);
	light.lookAt(floor);
	light.angle = Math.PI / 4;
	light.intensity = 1.2;
	light.distance = 0;

	light.castShadow = true; // only necessary if you want to cast shadows

	light.exponent = 0; // useful for narrowing the beam
	light.shadowCameraNear = 1;
	light.shadowCameraFar = 60;
	light.shadowCameraFov = 30;
	light.shadowDarkness = 0.9; // default is 0.5

	scene.add(light);
	
	scene.fog = new THREE.Fog( 0xffffff, 1, 5000 );
	scene.fog.color.setHSL( 0.6, 0, 1 );

	var cone = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 10, 20, 1000),
			new THREE.MeshBasicMaterial({
				color : new THREE.Color(0xffffff),
				transparent : true,
				opacity : 0.15,
			}));

	scene.add(cone);
	cone.position.setY(cone.geometry.parameters.height / 2);

	// var axisHelper = new THREE.AxisHelper( 5 );
	// scene.add( axisHelper );

	load(CUTICLE, modelMap.cuticle);

	// new renderer, required for streaming animation files
	renderer = new THREE.WebGLRenderer({
		antialias : true,
		alpha : true
	});
	renderer.shadowMapBias = 0.0039;
	renderer.shadowMapDarkness = 0.5;
	renderer.shadowMapWidth = 1024;
	renderer.shadowMapHeight = 1024;
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;
	renderer.shadowMapCullFace = THREE.CullFaceBack;
	renderer.domElement.style.position = "relative";
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.autoClear = true;
}

function load(groupName, daeLocation) {
	var manager = new THREE.LoadingManager();
	manager.onProgress = function(item, loaded, total) {
		console.log(item, loaded, total);
	};

	var loader = new THREE.ColladaLoader(manager);
	loader.options.convertUpAxis = true;

	loader.load(daeLocation, function(collada) {
		dae = collada.scene;
		dae.name = groupName;
		dae.scale.set(2, 2, 2);
		

		$container.html(renderer.domElement);
		dae.children[0].children[0].material = new THREE.MeshPhongMaterial({
			color : 0xAAAAAA,
			transparent : false,
			shading:THREE.SmoothShading,
			shininess : 50, 
		});
		loadedModelMap[groupName] = dae;
		loadedModelMap[groupName].position.set(0, 1, 0);
		loadedModelMap[groupName].rotation.set(0, 0, Math.PI / 2);
		floor.position.z = loadedModelMap[groupName].position.z - 10;
		scene.add(loadedModelMap[groupName]);
		render();
	}, function(progress) {
		// TODO: show some progress if this is taking long
	});
}

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	var timer = Date.now() * 0.00005;

	if (loadedModelMap[CUTICLE]) {
		loadedModelMap[CUTICLE].rotation.y += 0.01;
		if (TWEEN)
			TWEEN.update();

		renderer.render(scene, camera);

	}

}

/*
 * Set the ambient light to the given color. Accepts argument in the form of
 * '#XXXXXX'
 */
$.fn.setWormColor = function(color) {
	var color = new THREE.Color(color);
	console.log(color);
	setMaterial(loadedModelMap[CUTICLE], color);

	function setMaterial(node, color) {
		if (node.material) {
			node.material.color = color;
			node.material.transparent = false;
		}
		if (node.children) {
			for (var i = 0; i < node.children.length; i++) {
				setMaterial(node.children[i], color);
			}
		}

	}
}.bind(this);

function moveCameraToPosition(targetCoordinates, targetRotation) {
	console.log("cuticle.js move worm to position");
	console.log(loadedModelMap[CUTICLE]);

	var start = {
		"position.x" : camera.position.x,
		"position.y" : camera.position.y,
		"position.z" : camera.position.z,
		"rotation.x" : camera.rotation.x,
		"rotation.y" : camera.rotation.y,
		"rotation.z" : camera.rotation.z
	};
	var target = {
		"position.x" : targetCoordinates.x,
		"position.y" : targetCoordinates.y,
		"position.z" : targetCoordinates.z,
		"rotation.x" : targetRotation.x,
		"rotation.y" : targetRotation.y,
		"rotation.z" : targetRotation.z
	};

	var tween = new TWEEN.Tween(start).to(target, 1000);

	tween.onUpdate(function() {
		console.log("update");
		camera.position.x = start["position.x"];
		camera.position.y = start["position.y"];
		camera.position.z = start["position.z"];
		camera.rotation.x = start["rotation.x"];
		camera.rotation.y = start["rotation.y"];
		camera.rotation.z = start["rotation.z"];

	});
	tween.start();

}

/*
 * Resize canvas when the user manually resizes window
 */
window.addEventListener('resize', function() {
	var width = $container.width();
	var height = $container.height();

	camera.aspect = (width) / (height);
	camera.updateProjectionMatrix();

	renderer.setSize(width, height);

	render();
}, false);
