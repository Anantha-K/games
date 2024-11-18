'use client'
import Image from "next/image";
import dynamic from 'next/dynamic';
import CodeDisplay from './components/code';

const code = `
//coin collection
import * as THREE from 'three';
import * as CANNON from 'cannon';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Score display
const scoreElement = document.createElement('div');
scoreElement.style.position = 'absolute';
scoreElement.style.top = '20px';
scoreElement.style.left = '20px';
scoreElement.style.color = 'white';
scoreElement.style.fontSize = '24px';
document.body.appendChild(scoreElement);
let score = 0;

const World = new CANNON.World();
World.gravity.set(0, -9.82, 0);

// Create ground plane
const geometry = new THREE.PlaneGeometry(12, 12);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);
plane.rotation.x = -Math.PI / 2;
plane.position.y = 3;

const groundShape = new CANNON.Plane();
const groundBody = new CANNON.Body({
    mass: 0,
    shape: groundShape
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
groundBody.position.set(0, 3, 0);
World.addBody(groundBody);

// Create cube
const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry2, material2);
scene.add(cube);
cube.position.y = 4;

const shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
const body = new CANNON.Body({
    mass: 1,
    shape: shape,
    fixedRotation: true,
    angularDamping: 1,
});
body.position.y = 4;
World.addBody(body);

// Coin creation and management
const coins = [];
const coinBodies = [];
const coinGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 32);
const coinMaterial = new THREE.MeshBasicMaterial({ color: 0xFFD700 });





function createCoin() {
    // Random position within bounds
    const x = Math.random() * 10 - 5;
    const z = Math.random() * 10 - 5;
    const y = 3.5;

    // Create visual coin
    const coin = new THREE.Mesh(coinGeometry, coinMaterial);
    coin.position.set(x, y, z);
    coin.rotation.x = Math.PI / 2;
    scene.add(coin);
    coins.push(coin);

    // Create physics body for coin
    const coinShape = new CANNON.Cylinder(0.2, 0.2, 0.05, 32);
    const coinBody = new CANNON.Body({
        mass: 0,  // Make it static
        shape: coinShape,
        collisionResponse: false  // Don't respond physically to collisions
    });
    coinBody.position.set(x, y, z);
    coinBody.quaternion.setFromEuler(Math.PI / 2, 0, 0);
    World.addBody(coinBody);
    coinBodies.push(coinBody);

    // Store reference to visual coin in physics body
    coinBody.visualCoin = coin;
}

// Initial coin spawn
for (let i = 0; i < 5; i++) {
    createCoin();
}

// Collision event handler
body.addEventListener("collide", (event) => {
    const coinBody = event.body;
    
    // Check if the collided body is a coin
    const coinIndex = coinBodies.indexOf(coinBody);
    if (coinIndex !== -1) {
        // Remove coin and its body
        scene.remove(coinBody.visualCoin);
        World.removeBody(coinBody);
        coins.splice(coinIndex, 1);
        coinBodies.splice(coinIndex, 1);

        // Update score
        score += 10;


        // Create new coin
        createCoin();
    }
});

// Coin rotation animation
function animateCoins() {
    coins.forEach((coin, index) => {
        coin.rotation.z += 0.02;
        // Update physics body position to match visual coin
        if (coinBodies[index]) {
            coinBodies[index].position.copy(coin.position);
        }
    });
}

// Setup camera and controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
camera.position.z = 5;
camera.position.y = 5;

// Movement controls
const moveDirection = { up: 0, down: 0, left: 0, right: 0 };

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
            moveDirection.up = 1;
            break;
        case 'ArrowDown':
        case 's':
            moveDirection.down = 1;
            break;
        case 'ArrowLeft':
        case 'a':
            moveDirection.left = 1;
            break;
        case 'ArrowRight':
        case 'd':
            moveDirection.right = 1;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
            moveDirection.up = 0;
            break;
        case 'ArrowDown':
        case 's':
            moveDirection.down = 0;
            break;
        case 'ArrowLeft':
        case 'a':
            moveDirection.left = 0;
            break;
        case 'ArrowRight':
        case 'd':
            moveDirection.right = 0;
            break;
    }
});

const speed = 5;

function applyControls() {
    body.velocity.x = (moveDirection.right - moveDirection.left) * speed;
    body.velocity.z = (moveDirection.up - moveDirection.down) * speed;
    body.velocity.y = 0;
    body.quaternion.setFromEuler(0, 0, 0);
    body.angularVelocity.set(0, 0, 0);
}

const timeStep = 1 / 60;

function animate() {
    World.step(timeStep);
    applyControls();
    
    // Update cube position
    cube.position.copy(body.position);
    cube.quaternion.copy(body.quaternion);
    
    // Update coins
    animateCoins();
    
    controls.update();
    renderer.render(scene, camera);
}















//apple 

import * as THREE from 'three';
import * as CANNON from 'cannon';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Physics world setup
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Score display
const scoreElement = document.createElement('div');
scoreElement.style.position = 'absolute';
scoreElement.style.top = '20px';
scoreElement.style.left = '20px';
scoreElement.style.color = 'white';
scoreElement.style.fontSize = '24px';
document.body.appendChild(scoreElement);
let score = 0;

// Ground physics
const groundShape = new CANNON.Plane();
const groundBody = new CANNON.Body({
    mass: 0,
    shape: groundShape,
    material: new CANNON.Material({ friction: 0.5, restitution: 0.3 })
});
groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
world.addBody(groundBody);

// Ground visual
const geometry = new THREE.PlaneGeometry(30, 30);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);
plane.rotation.x = -Math.PI / 2;

// Tree trunk
const sgeometry = new THREE.CylinderGeometry(1, 1, 10, 10);
const smaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
const cylinder = new THREE.Mesh(sgeometry, smaterial);
scene.add(cylinder);
cylinder.position.set(0, 5, 0);

// Tree leaves
const leavesGeometry = new THREE.SphereGeometry(4, 20, 26);
const leavesMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 });
const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
leaves.position.set(0, 10, 0);
scene.add(leaves);

// Create physical basket
// Base
const basketBody = new CANNON.Body({ mass: 0 });
const baseShape = new CANNON.Box(new CANNON.Vec3(1, 0.1, 0.5));
basketBody.addShape(baseShape, new CANNON.Vec3(0, 0, 0));

// Walls
const wallShape = new CANNON.Box(new CANNON.Vec3(0.1, 0.5, 0.5));
basketBody.addShape(wallShape, new CANNON.Vec3(-1, 0.5, 0)); // Left wall
basketBody.addShape(wallShape, new CANNON.Vec3(1, 0.5, 0));  // Right wall

const backWallShape = new CANNON.Box(new CANNON.Vec3(1, 0.5, 0.1));
basketBody.addShape(backWallShape, new CANNON.Vec3(0, 0.5, -0.5)); // Back wall

basketBody.position.set(4, 0.5, 0);
world.addBody(basketBody);

// Basket visual
const basketGroup = new THREE.Group();

// Base
const basketBase = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.2, 1),
    new THREE.MeshPhongMaterial({ color: 0xff0000 })
);
basketGroup.add(basketBase);

// Walls
const wallGeometry = new THREE.BoxGeometry(0.2, 1, 1);
const leftWall = new THREE.Mesh(wallGeometry, new THREE.MeshPhongMaterial({ color: 0xff0000 }));
leftWall.position.set(-1, 0.5, 0);
basketGroup.add(leftWall);

const rightWall = new THREE.Mesh(wallGeometry, new THREE.MeshPhongMaterial({ color: 0xff0000 }));
rightWall.position.set(1, 0.5, 0);
basketGroup.add(rightWall);

const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1, 0.2),
    new THREE.MeshPhongMaterial({ color: 0xff0000 })
);
backWall.position.set(0, 0.5, -0.5);
basketGroup.add(backWall);

scene.add(basketGroup);

// Basket movement
document.addEventListener('keydown', (event) => {
    const moveSpeed = 0.2;
    if (event.key === 'ArrowLeft' || event.key === 'a') {
        basketBody.position.x -= moveSpeed;
    }
    if (event.key === 'ArrowRight' || event.key === 'd') {
        basketBody.position.x += moveSpeed;
    }
    if (event.key === 'ArrowUp' || event.key === 'w') {
        basketBody.position.z -= moveSpeed;
    }
    if (event.key === 'ArrowDown' || event.key === 's') {
        basketBody.position.z += moveSpeed;
    }
});

// Apples array to store both physics and visual objects
const apples = [];
const appleRadius = 0.25;

function createApple(position) {
    // Physics
    const appleShape = new CANNON.Sphere(appleRadius);
    const appleBody = new CANNON.Body({
        mass: 1,
        shape: appleShape,
        material: new CANNON.Material({ friction: 0.5, restitution: 0.3 })
    });
    appleBody.position.copy(position);
    
    // Visual
    const appleMesh = new THREE.Mesh(
        new THREE.SphereGeometry(appleRadius, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    appleMesh.position.copy(position);
    
    return {
        body: appleBody,
        mesh: appleMesh,
        fallen: false,
        caught: false,
        fallStarted: false,
        fallTime: Date.now() + Math.random() * 5000,
        initialPosition: position.clone()
    };
}

function getRandomPointOnSphere(radius, centerY) {
    const phi = Math.random() * 2 * Math.PI;
    const theta = Math.acos(2 * Math.random() - 1);
    const r = radius * 0.8;

    return new THREE.Vector3(
        r * Math.sin(theta) * Math.cos(phi),
        centerY + r * Math.cos(theta),
        r * Math.sin(theta) * Math.sin(phi)
    );
}

// Create initial apples
for (let i = 0; i < 15; i++) {
    const position = getRandomPointOnSphere(4, 10);
    position.x += (Math.random() - 0.5) * 0.5;
    position.y += (Math.random() - 0.5) * 0.5;
    position.z += (Math.random() - 0.5) * 0.5;
    
    const apple = createApple(position);
    scene.add(apple.mesh);
    apples.push(apple);
}

camera.position.set(15, 15, 15);
camera.lookAt(0, 0, 0);

function checkAppleLocation(apple) {
    const pos = apple.body.position;
    const basketPos = basketBody.position;
    
    // Check if apple is in basket
    if (!apple.caught && 
        pos.y < basketPos.y + 1.5 &&
        Math.abs(pos.x - basketPos.x) < 1 &&
        Math.abs(pos.z - basketPos.z) < 0.5) {
        apple.caught = true;
        score += 10;
    }
    
    // Check if apple hit the ground
    if (!apple.fallen && pos.y < 0.5) {
        apple.fallen = true;
        score = Math.max(0, score - 5);
    }
}

const timeStep = 1 / 60;

function animate() {
    world.step(timeStep);
    
    const currentTime = Date.now();
    
    // Update basket visual position
    basketGroup.position.copy(basketBody.position);
    basketGroup.quaternion.copy(basketBody.quaternion);
    
    // Update apples
    for (let i = apples.length - 1; i >= 0; i--) {
        const apple = apples[i];
        
        if (!apple.fallStarted && currentTime > apple.fallTime) {
            world.addBody(apple.body);
            apple.fallStarted = true;
        }
        
        if (apple.fallStarted) {
            apple.mesh.position.copy(apple.body.position);
            apple.mesh.quaternion.copy(apple.body.quaternion);
            checkAppleLocation(apple);
        } 
        
    
    }
    
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});






<!DOCTYPE html>
<html>
<head>
    <title>Balloon Shooter</title>
    <style>
        body { margin: 0; }
        canvas { display: block; }
        #score {
            position: fixed;
            top: 20px;
            left: 20px;
            color: white;
            font-family: Arial;
            font-size: 24px;
        }
    </style>
</head>
<body>
    <div id="score">Score: 0</div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cannon.js/0.6.2/cannon.min.js"></script>
    <script>
        let camera, scene, renderer, world;
        let balloons = [];
        let bullets = [];
        let gun;
        let score = 0;
        const scoreElement = document.getElementById('score');
        let isPointerLocked = false;

        // Initialize Three.js scene
        function initThree() {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x87CEEB); // Sky blue background
            
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            // Add lights
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(0, 10, 10);
            scene.add(directionalLight);

            camera.position.set(0, 2, 10);
            
            // Create gun model
            createGun();
            
            // Request pointer lock on click
            renderer.domElement.addEventListener('click', () => {
                if (!isPointerLocked) {
                    renderer.domElement.requestPointerLock();
                }
            });

            // Handle pointer lock change
            document.addEventListener('pointerlockchange', () => {
                isPointerLocked = document.pointerLockElement === renderer.domElement;
            });
        }

        function createGun() {
            // Simple gun model
            const gunGroup = new THREE.Group();
            
            // Gun barrel
            const barrelGeometry = new THREE.BoxGeometry(0.1, 0.1, 1);
            const barrelMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
            const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
            barrel.position.z = -0.5;
            
            // Gun handle
            const handleGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.1);
            const handle = new THREE.Mesh(handleGeometry, barrelMaterial);
            handle.position.y = -0.2;
            
            gunGroup.add(barrel);
            gunGroup.add(handle);
            
            gun = gunGroup;
            scene.add(gun);
        }

        // Initialize Cannon.js physics
        function initCannon() {
            world = new CANNON.World();
            world.gravity.set(0, -9.82, 0);
        }

        // Create a balloon
        function createBalloon() {
            const radius = 1;
            const x = Math.random() * 30 - 15;
            const y = -10;
            const z = Math.random() * -20 - 5;

            // Three.js balloon
            const geometry = new THREE.SphereGeometry(radius);
            const material = new THREE.MeshPhongMaterial({
                color: Math.random() * 0xffffff,
                shininess: 100
            });
            const balloon = new THREE.Mesh(geometry, material);
            balloon.position.set(x, y, z);
            scene.add(balloon);

            // Cannon.js physics body
            const shape = new CANNON.Sphere(radius);
            const body = new CANNON.Body({
                mass: 1,
                shape: shape,
                position: new CANNON.Vec3(x, y, z),
                velocity: new CANNON.Vec3(0, 5, 0) // Upward velocity
            });
            world.addBody(body);

            balloons.push({
                mesh: balloon,
                body: body,
                isPopped: false
            });
        }

        // Create a bullet
        function createBullet() {
            const radius = 0.1;
            
            // Get gun position and rotation
            const gunPosition = new THREE.Vector3();
            const gunRotation = new THREE.Euler();
            gun.getWorldPosition(gunPosition);
            gun.getWorldQuaternion(gunRotation);

            // Three.js bullet
            const geometry = new THREE.SphereGeometry(radius);
            const material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
            const bullet = new THREE.Mesh(geometry, material);
            bullet.position.copy(gunPosition);
            scene.add(bullet);

            // Cannon.js physics body
            const shape = new CANNON.Sphere(radius);
            const body = new CANNON.Body({
                mass: 0.1,
                shape: shape,
                position: new CANNON.Vec3(gunPosition.x, gunPosition.y, gunPosition.z)
            });

            // Calculate shooting direction based on gun rotation
            const shootingDirection = new THREE.Vector3(0, 0, -1);
            shootingDirection.applyQuaternion(gun.quaternion);
            shootingDirection.multiplyScalar(50); // Bullet speed

            body.velocity.set(shootingDirection.x, shootingDirection.y, shootingDirection.z);
            world.addBody(body);

            bullets.push({
                mesh: bullet,
                body: body,
                createdAt: Date.now()
            });
        }

        // Handle mouse movement
        function onMouseMove(event) {
            if (!isPointerLocked) return;

            const movementX = event.movementX || 0;
            const movementY = event.movementY || 0;

            // Rotate gun based on mouse movement
            gun.rotation.y -= movementX * 0.002;
            gun.rotation.x -= movementY * 0.002;
            
            // Limit vertical rotation
            gun.rotation.x = Math.max(-Math.PI/3, Math.min(Math.PI/3, gun.rotation.x));
        }

        // Handle shooting
        function onMouseDown() {
            if (!isPointerLocked) return;
            createBullet();
        }

        // Check collisions
        function checkCollisions() {
            bullets.forEach(bullet => {
                balloons.forEach(balloon => {
                    if (!balloon.isPopped) {
                        const distance = bullet.body.position.distanceTo(balloon.body.position);
                        if (distance < 1.1) { // Collision threshold
                            popBalloon(balloon);
                        }
                    }
                });
            });
        }

        // Pop a balloon
        function popBalloon(balloon) {
            balloon.isPopped = true;
            scene.remove(balloon.mesh);
            world.remove(balloon.body);
            score += 10;

        }

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            // Update physics
            world.step(1/60);

            // Update balloon positions
            balloons.forEach(balloon => {
                if (!balloon.isPopped) {
                    balloon.mesh.position.copy(balloon.body.position);
                    balloon.mesh.quaternion.copy(balloon.body.quaternion);
                }
            });

            // Update bullet positions
            bullets = bullets.filter(bullet => {
                bullet.mesh.position.copy(bullet.body.position);
                bullet.mesh.quaternion.copy(bullet.body.quaternion);
                
                // Remove old bullets
                if (Date.now() - bullet.createdAt > 3000) {
                    scene.remove(bullet.mesh);
                    world.remove(bullet.body);
                    return false;
                }
                return true;
            });

            // Check for collisions
            checkCollisions();

            // Remove balloons that are too high
            balloons = balloons.filter(balloon => {
                if (balloon.body.position.y > 30) {
                    scene.remove(balloon.mesh);
                    world.remove(balloon.body);
                    return false;
                }
                return true;
            });

            // Spawn new balloons randomly
            if (Math.random() < 0.02) {
                createBalloon();
            }

            // Update gun position relative to camera
            gun.position.set(
                camera.position.x,
                camera.position.y - 0.5,
                camera.position.z - 2
            );

            renderer.render(scene, camera);
        }

        // Handle window resize
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        // Initialize game
        initThree();
        initCannon();
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mousedown', onMouseDown);
        window.addEventListener('resize', onWindowResize);
        animate();
    </script>
</body>
</html>

//unity

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
 
public class Gun : MonoBehaviour
{
    public Transform bulletSpawnPoint;
    public GameObject bulletPrefab;
    public float bulletSpeed = 10;
 
    void Update()
    {
        if(Input.GetKeyDown(KeyCode.Space))
        {
            var bullet = Instantiate(bulletPrefab, bulletSpawnPoint.position, bulletSpawnPoint.rotation);
            bullet.GetComponent<Rigidbody>().velocity = bulletSpawnPoint.forward * bulletSpeed;
        }
    }
}




using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class spawn : MonoBehaviour
{
    // Start is called before the first frame update
    public GameObject applePrefab;
    void Start()
    {
        InvokeRepeating("spawnapple",1f,4f);
    }

    // Update is called once per frame
    void Update()
    {
           
        
    }
    public void spawnapple(){
        float x =Random.Range(-4f,4f);
        float y =Random.Range(3f,6f);
        Vector3 newpos = new Vector3(x,y,0);
        Instantiate(applePrefab,newpos,Quaternion.identity);
    }
}




using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class force : MonoBehaviour
{
    // Start is called before the first frame update
    public Transform target;
    public float Force=5f;
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if(Input.GetKeyDown(KeyCode.Space)){
            shoot();
        }
        
    }
     public void OnCollisionEnter(Collision collision){
        if(collision.gameObject.tag=="hit"){
            shoot();
        }
    }
    public void shoot(){
        Vector3 newpos = (target.position-this.transform.position).normalized;
        GetComponent<Rigidbody>().AddForce(newpos*Force,ForceMode.Impulse);
    }
}

`;

export default function Home() {
    return (
        <div style={{ padding: '20px', backgroundColor: '#282c34', color: 'white' }}>
            <h1>Game Code</h1>
            <CodeDisplay code={code} />
        </div>
    );
}
