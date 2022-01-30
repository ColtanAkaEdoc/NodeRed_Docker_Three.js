
//import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.js';
function Init(){
  var server = window.location.href.split("http://")[1].split("/")[0];
  console.log("Page location is " + server)
  
  //---------------------Websocket to Modify--------------------------
  //two websockets to update parameters
  var socket1 = new  WebSocket("ws://" + server + "/ws/receive"); //Input
  var socket2 = new  WebSocket("ws://" + server + "/ws/publish"); //Output
  var cubeRotationSpeed = 0.02;
  var cubeSize = 1.0;
  let cubeColor = "blue"
  var socket1Opened = false
  
  
  socket1.onopen = function() {
      socket1Opened = true
    var message = {
      'payload': 'Client connected'
    };
    socket1.send(JSON.stringify(message));
  };
  
  socket2.onopen = function() {
    var message = {
      'payload': 'Client connected'
    };
    socket1.send(JSON.stringify(message));
  };
  
  socket2.onclose = function(){
    console.log('Connection closed');
  };
  
  socket2.onerror = function(error) {
    console.log('Error detected: ' + JSON.stringify(error));
  };
  
  socket2.onmessage = function(e) {
    var server_message = e.data;
    var responseObject = JSON.parse(server_message);
  
    //alert(JSON.stringify(responseObject));
    //Do the required stuff
    console.log(responseObject.payload);
    if (responseObject.payload.cubeRotationSpeed){
        cubeRotationSpeed = responseObject.payload.cubeRotationSpeed;
    }else if(responseObject.payload.cubeColor){
        cubeColor = responseObject.payload.cubeColor;
    }else if(responseObject.payload.cubeSize){
      cubeSize =responseObject.payload.cubeSize;
    }
    console.log(e);
    console.log(this);
  }
  //---------------------THREE.JS---------------------------------
  // var scene = new THREE.Scene();
  
  // // Make highly-transparent plane
  // // var fadeMaterial = new THREE.MeshBasicMaterial({
  // //     color: 0x000000,
  // //     transparent: true,
  // //     opacity: 0.02
  // // });
  // //var fadePlane = new THREE.PlaneBufferGeometry(1, 1);
  // //var fadeMesh = new THREE.Mesh(fadePlane, fadeMaterial);
  
  // // Create Object3D to hold camera and transparent plane
  // var camGroup = new THREE.Object3D();
  // var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  // camGroup.add(camera);
  // //camGroup.add(fadeMesh);
  
  // // Put plane in front of camera
  // //fadeMesh.position.z = -0.1;
  
  // // Make plane render before particles
  // //fadeMesh.renderOrder = -1;
  
  // // Add camGroup to scene
  // scene.add(camGroup);
  
  
  // var renderer = new THREE.WebGLRenderer( { preserveDrawingBuffer: true, antialias: true } );
  // //renderer.autoClearColor = false;
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);
  
  // var geometry = new THREE.BoxGeometry(1,1,1);
  // //var color = new THREE.Color(0xff0000)
  // var material = new THREE.MeshPhongMaterial({color: "blue"});
  // var cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);
  
  // var color = 0xFFFFFF;
  // var intensity = 1;
  // var light = new THREE.AmbientLight(color, intensity);
  // scene.add(light);
  
  // cube.position.z = -5;
  
  // var step = .03;
  
  
  // function animate(){
  
  //     cube.rotation.x += cubeRotationSpeed;
  //     cube.rotation.y += 0.2;
  //     cube.position.x += step;
  //     cube.material.color = new THREE.Color(cubeColor);
  //     //--Logic to Send direction change
  //     if(Math.abs(cube.position.x) > 5.0)
  //     {
  //         step = -step;
  //         if (socket1Opened){
  //           socket1.send("ping");
  //         }
  //     }
  //     renderer.render(scene, camera);
  
  //     requestAnimationFrame(animate); //Looks recursive, but handles the rendering, renders scene when the tab is opened
  // }
  //  animate();
  //---------------------OWN THREE.JS---------------------------------
  var loader = new THREE.ObjectLoader();
  var scene = new THREE.Scene();
  var camera; 
  var loaded = 0;
  var PerspectiveCamera = new THREE.PerspectiveCamera();
  var Cube = new THREE.Mesh();
  loader.load("http://localhost:1880/ThreeJS/scene.json",function (obj){
    scene.add(obj);
    console.log(obj);
    PerspectiveCamera = obj.children[3];
    Cube = obj.children[0];
    console.log(Cube);
    loaded = 1;
  });
  // // while(loaded == 0){
  // //   //console.log("While LOOP");
  // // }
  // // console.log("After While LOOP");
  // console.log(scene);
  // console.log(scene.children[0].children[3]);
  // camera = scene.children[0].children[3]
  
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  function animate(){
    //Cube.scale(cubeSize, cubeSize, cubeSize);
      renderer.render(scene, PerspectiveCamera);
      Cube.scale.set(cubeSize,cubeSize,cubeSize);
      requestAnimationFrame(animate); //Looks recursive, but handles the rendering, renders scene when the tab is opened
  }
  animate();
}

let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new Init();
});
