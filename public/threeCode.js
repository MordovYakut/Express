let div = document.querySelector('#threejs');
const objloader = new THREE.ObjectLoader();
window.addEventListener('resize', onWindowResize);

function onWindowResize() {
    camera.aspect = div.clientWidth / div.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(div.clientWidth, div.clientHeight);
}

const clock = new THREE.Clock();
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(70, div.clientWidth / div.clientHeight, 0.1, 100);
camera.position.set(0, 0.7, 3);
cameraTarget = new THREE.Vector3(0, 0.4, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true, div });
renderer.setSize(div.clientWidth, div.clientHeight);

div.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

scene.background = new THREE.Color('black');
scene.fog = new THREE.Fog('black', 1, 5);
let hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight.position.set(0, 200, 0);
scene.add(hemiLight);
function createscene(){


    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);

    directionalLight.position.set(25, 25, 10);
    directionalLight.castShadow = true;

    directionalLight.shadow.mapSize.width = 2000; // default
    directionalLight.shadow.mapSize.height = 2000; // default
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = - 10;
    directionalLight.shadow.camera.left = - 10;
    directionalLight.shadow.camera.right = 10;
    scene.add(directionalLight);
    let directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);

    directionalLight1.position.set(-15, -30, 40);
    directionalLight1.castShadow = true;

    directionalLight1.shadow.mapSize.width = 2000; // default
    directionalLight1.shadow.mapSize.height = 2000; // default
    directionalLight1.shadow.camera.top = 10;
    directionalLight1.shadow.camera.bottom = - 10;
    directionalLight1.shadow.camera.left = - 10;
    directionalLight1.shadow.camera.right = 10;
    scene.add(directionalLight1);

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(4000, 4000),
        new THREE.MeshPhongMaterial({ color: 0x808080, dithering: true })
);
plane.rotation.x = - Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);
}
//-----------------------------------------------------------------------------------------------



camera.position.z = 2;
function createbox(size, material,boxcolor){
    scene.children.forEach(function(object){
        scene.remove(object);});
    createscene();
    const boxWidth = size;
    const boxHeight = size;
    const boxDepth = size;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    let material1;
    if(material == "MeshPhongMaterial"){
        material1 = new THREE.MeshPhongMaterial({ color: boxcolor });  // greenish blue
    }
    if(material=="MeshBasicMaterial"){
        material1 = new THREE.MeshBasicMaterial({ color: boxcolor });  // greenish blue
    }
    const cube = new THREE.Mesh(geometry, material1);
    cube.castShadow = true;
    
    cube.position.y = 0.5;
    cube.position.x = -0.5;
    
    return cube;
}
function createSphere(size, material,boxcolor)
{
    scene.children.forEach(function(object){
        scene.remove(object);
    });
    createscene();
    const geometry = new THREE.SphereGeometry(size, 32, 16);
    let material1;
    if(material == "MeshPhongMaterial"){
        material1 = new THREE.MeshPhongMaterial({ color: boxcolor });  // greenish blue
    }
    if(material=="MeshBasicMaterial"){
        material1 = new THREE.MeshBasicMaterial({ color: boxcolor });  // greenish blue
    }
    const sphere = new THREE.Mesh(geometry, material1);
    sphere.castShadow = true;
    
    sphere.position.y = 0.5;
    sphere.position.x = -0.5;
    
    return sphere;
}

function render(time) {
    time *= 0.001;  // конвертировать время в секунды

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}
requestAnimationFrame(render);