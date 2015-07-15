

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
modelMap[CUTICLE] = "/resources/files/cuticleNotBent.dae";
modelMap[MUSCLES] = "/resources/files/muscles.dae";
modelMap[NEURONS] = "/resources/files/neurons.dae";

var spotlight;
var radius = 20;
var constant = 0;
var plane;

var shouldMoveWorm = true;

start();
animate();

var position = {x: 0, y: 300};
var target = {x: 400, y: 50};

function start() {

    rotate = false;
    $container = $('#worm-model-container');
    $container.html('');
    $container.on('mousedown', function () {
        rotate = false;
    });

    $('#body').on('click', function () {

        // make all groups visible
        for (var i = 0; i < scene.children.length; i++) {

            child = scene.children[i];

            if (child.name === CUTICLE || child.name === MUSCLES || child.name === NEURONS) {
                child.visible = true;
            }
        }

        render();
    });

    $('#muscles').on('click', function () {

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

    $('#nerves').on('click', function () {

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

    camera = new THREE.PerspectiveCamera(45, $container.innerWidth() / $container.innerHeight(), 1, 1000);
    camera.position.x = 0;
    camera.position.y = 1;
    camera.position.z = 0;

    scene = new THREE.Scene();
    var ambient = new THREE.AmbientLight(0x101030);
    scene.add(ambient);

    plane = createMesh(new THREE.PlaneGeometry(200, 200, Math.round(2), Math.round(2)));
    plane.rotation.x = 2
    // add it to the scene.
    scene.add(plane);
    /*
    var line_material = new THREE.LineBasicMaterial({color: 0x303030}),
            geometry = new THREE.Geometry(),
            floor = -75, step = 25;

    for (var i = 0; i <= 40; i++) {

        geometry.vertices.push(new THREE.Vector3(-500, floor, i * step - 500));
        geometry.vertices.push(new THREE.Vector3(500, floor, i * step - 500));

        geometry.vertices.push(new THREE.Vector3(i * step - 500, floor, -500));
        geometry.vertices.push(new THREE.Vector3(i * step - 500, floor, 500));

    }

    var line = new THREE.Line(geometry, line_material, THREE.LinePieces);
    scene.add(line);
    */
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

    load(CUTICLE, modelMap.cuticle);
    //load(MUSCLES, modelMap.muscles);
    //load(NEURONS, modelMap.neurons);

    // new renderer, required for streaming animation files
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize($container.innerWidth(), $container.innerHeight());
    renderer.autoClear = true;
}

function createMesh(geom) {
    // assign two materials
    var meshMaterial = new THREE.MeshPhongMaterial({color: 0x000000});
    meshMaterial.castShadow = true;
    var wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;

    // create a multimaterial
    var plane = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);

    return plane;
}

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
        //dae.scale.set(0.7, 0.7, 0.7);
        //dae.rotation.set(0, -0.2, 0.2);
        $container.html(renderer.domElement);
        loadedModelMap[groupName] = dae;
        loadedModelMap[groupName].position.set(-6, 0, -25);
        loadedModelMap[groupName].rotation.set(0.4, 0.9, 1.5);
        plane.position.z = loadedModelMap[groupName].position.z;
        scene.add(loadedModelMap[groupName]);
        render();
    }, function (progress) {
        // TODO: show some progress if this is taking long
    });
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    var timer = Date.now() * 0.00005;
    //if (loadedModelMap[CUTICLE])
    if (loadedModelMap[CUTICLE])
    {
        if (shouldMoveWorm)
            loadedModelMap[CUTICLE].rotation.y += 0.01;
        if (TWEEN)
            TWEEN.update();
        renderer.render(scene, camera);

        /*
         if (loadedModelMap[CUTICLE])
         camera.position.x = -3 + loadedModelMap[CUTICLE].position.x + radius * Math.cos(constant);
         if (loadedModelMap[CUTICLE])
         camera.position.z = loadedModelMap[CUTICLE].position.z + radius * Math.sin(constant);
         constant += 0.001;
         if (loadedModelMap[CUTICLE])
         camera.lookAt(loadedModelMap[CUTICLE].position);
         */
    }

}

/*
 Set the ambient light to the given color. Accepts argument in the form of '#XXXXXX'
 */
$.fn.setWormColor = function (color) {
    //Chop off leading #
    //topLight.color.setHex('0x' + color.substr(1, color.length));
    //bottomLight.color.setHex('0x' + color.substr(1, color.length));
    //var material = new THREE.MeshBasicMaterial({color: '0x' + color.substr(1, color.length) });
    //material.doubleSided = true;
    var color = new THREE.Color( color );
    console.log(color);
    setMaterial(loadedModelMap[CUTICLE], color);
    
    function setMaterial(node, color) {
        if(node.material ) for(var i=0;i<node.material.materials.length;i++)
                                node.material.materials[i].color = color;
               
        if (node.children) {
            for (var i = 0; i < node.children.length; i++) {
                setMaterial(node.children[i], color);
            }
        }
        
    }
}.bind(this);

function moveWormToPosition(targetCoordinates, shouldMoveWormParam) {
    shouldMoveWorm = shouldMoveWormParam;
    console.log("cuticle.js move worm to position");
    console.log(loadedModelMap[CUTICLE]);
    var position = {x: loadedModelMap[CUTICLE].position.x, y: loadedModelMap[CUTICLE].position.y, z: loadedModelMap[CUTICLE].position.z, rotationY: loadedModelMap[CUTICLE].rotation.y};
    var target = {x: targetCoordinates.x, y: targetCoordinates.y, z: targetCoordinates.z, rotationY: 6.2};

    var tween = new TWEEN.Tween(position).to(target, 500);

    tween.onUpdate(function () {
        console.log("update");
        loadedModelMap[CUTICLE].position.x = position.x;
        loadedModelMap[CUTICLE].position.y = position.y;
        loadedModelMap[CUTICLE].position.z = position.z;
        if (shouldMoveWorm == false)
            loadedModelMap[CUTICLE].rotation.y = position.rotationY;
    });
    tween.onComplete(function () {
    	defaultColorChange();
    })
    tween.start();



}

/*
 Resize canvas when the user manually resizes window
 */
window.addEventListener('resize', function () {
    var width = $container.width();
    var height = $container.height();

    camera.aspect = (width) / (height);
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

    render();
}, false);

