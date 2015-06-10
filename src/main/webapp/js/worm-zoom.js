
var progressValue,
	minHeight,
	$incrementSteps;
var camera,
	scene,
	dae,
	renderer,
	controls,
	topLight,
	bottomLight,
	$container,
	rotate;

var clock = new THREE.Clock();
clock.start();

// model names
var CUTICLE = "cuticle", MUSCLES = "muscles", NEURONS = "neurons";
var modelMap = {};
var loadedModelMap = {};
modelMap[CUTICLE] ="/org.wormsim.frontend/resources/files/cuticleNotBent.dae";
modelMap[MUSCLES] = "/org.wormsim.frontend/resources/files/muscles.dae";
modelMap[NEURONS] = "/org.wormsim.frontend/resources/files/neurons.dae";

var worm;

var spotlight;
var radius = 20;
var constant = 0;

var shouldMoveWorm = true;

$container = document.getElementById('worm-in-circle');

start();
animate();

function start() {

	var scaleHeight = $('.worm-render').width();
	$('#length-bar').css("height", scaleHeight + "px");

	//set number of increments
	$incrementSteps = 11;
	//set height of the progress value
	progressValue = scaleHeight / $incrementSteps;
	//set min height
	minHeight = progressValue
	//set worm length height in px dynamically
	$('.worm-length').css("height", progressValue + "px");
	$('.worm-length').css("margin-top", "-"+(progressValue/2)+ "px");

	rotate = false;
	$container = $('#worm-in-circle');
	$container.on('mousedown', function () {
		rotate = false;
	});

	camera = new THREE.PerspectiveCamera(45, $container.innerWidth() / $container.innerHeight(), 1, 1000);

	scene = new THREE.Scene();
	var ambient = new THREE.AmbientLight(0x101030);
	scene.add(ambient);

	topLight = new THREE.DirectionalLight(0xffffff, 1.0);
	topLight.position.set(0, 1, 0);

	scene.add(topLight);

	bottomLight = new THREE.DirectionalLight(0xffffff, 1.0);
	bottomLight.position.set(0, -1, 0);

	scene.add(bottomLight);

	spotlight = new THREE.SpotLight(0xffffff, 4, 40);
	camera.add(spotlight);
	spotlight.position.set(-6, 0, -25);
	spotlight.target = camera;
	console.log($container.get(0));
	controls = new THREE.TrackballControls(camera, $container.get(0));
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;
	controls.noZoom = true;
	controls.noPan = true;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;
	controls.keys = [65, 83, 68];
	controls.addEventListener('change', render);

	load(CUTICLE, modelMap.cuticle);
	load(MUSCLES, modelMap.muscles);
	load(NEURONS, modelMap.neurons);

	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer.setSize($container.innerWidth(), $container.innerHeight());
	renderer.autoClear = true;
}

var loadedItems = 0;

function load(groupName, daeLocation) {
	var manager = new THREE.LoadingManager();
	manager.onProgress = function (item, loaded, total) {
		console.log(item, loaded, total);
	};

	var loader = new THREE.ColladaLoader(manager);
	loader.options.convertUpAxis = true;

	loader.load(daeLocation, function (collada) {
		dae = collada.scene;
		dae.name = groupName;

		$container.html(renderer.domElement);
		loadedModelMap[groupName] = dae;

		dae.position.z = -60
		dae.rotation.x = 1;
		dae.rotation.z = 1

		scene.add(loadedModelMap[groupName]);
		
		if (groupName == CUTICLE) {
			setWormColor(rgb2hex(wormColor));
			worm = dae;
			controls.target.set( worm.position.x, worm.position.y, worm.position.z );
		}
		
		loadedItems++;
		
		if(loadedItems==3) {
			skinClick();
		}
		
		render();
	}, function (progress) {
		// TODO: show some progress if this is taking long
	});
}

function animate() {
	requestAnimationFrame(animate);
	render();
	controls.update();
}

function render() {
	renderer.render(scene, camera);
}

function setNewWormZ(newZ) {
	// enable zooming
	controls.noZoom = false;
	
	// set zoom increment
	if(newZ < 0) {
		controls.incrementZoomEnd(+0.2625);
	} else {
		controls.incrementZoomEnd(-0.2);
	}
	
	controls.update();
	
	// disable zooming
	controls.noZoom = true;
}

var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");

function rgb2hex(rgb) {
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
	console.log(x);
	return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}


/*
 Set the ambient light to the given color. Accepts argument in the form of '#XXXXXX'
 */
function setWormColor(color) {
	var color = new THREE.Color(color);
	console.log(color);
	setMaterial(loadedModelMap[CUTICLE], color);

	function setMaterial(node, color) {
		if (node.material)
			for (var i = 0; i < node.material.materials.length; i++)
				node.material.materials[i].color = color;

		if (node.children) {
			for (var i = 0; i < node.children.length; i++) {
				setMaterial(node.children[i], color);
			}
		}

	}
}
