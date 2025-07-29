import './style.css';
import * as THREE from 'three';
import { Player } from './player';
import { createGround, createObstacles, createSkyscrapers, createArenaBoundaries } from './world';
import { UI } from './ui';
import { createNPCs } from './npc';
import { AudioManager } from './audio';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Sky blue

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Add renderer to DOM
const app = document.querySelector<HTMLDivElement>('#app')!;
app.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(20, 30, 10);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 200;
directionalLight.shadow.camera.left = -100; // Larger shadow coverage
directionalLight.shadow.camera.right = 100;
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.bottom = -100;
scene.add(directionalLight);

// Add some atmospheric lighting
const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x4CAF50, 0.3);
scene.add(hemiLight);

// Create world
const ground = createGround();
scene.add(ground);

// Create obstacles
const obstacles = createObstacles();
obstacles.forEach(obstacle => scene.add(obstacle));

// Create skyscrapers for background
const skyscrapers = createSkyscrapers();
skyscrapers.forEach(skyscraper => scene.add(skyscraper));

// Create arena boundaries
const boundaries = createArenaBoundaries();
boundaries.forEach(boundary => scene.add(boundary));

// Create player
const player = new Player();
scene.add(player.mesh);

// Create NPCs
const npcs = createNPCs();
npcs.forEach(npc => scene.add(npc.mesh));

// Create Audio Manager
const audioManager = new AudioManager(camera);
player.setAudioManager(audioManager);

// Create UI
const ui = new UI(player.mesh, camera);

// Camera setup - adjusted for larger world
camera.position.set(0, 20, 40);
camera.lookAt(0, 0, 0);

// Add orbit controls with larger range
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 10;
controls.maxDistance = 150; // Much larger range for bigger world
controls.maxPolarAngle = Math.PI / 2.2; // Prevent camera from going underground

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Game loop
const clock = new THREE.Clock();

function animate(): void {
  requestAnimationFrame(animate);
  
  const deltaTime = clock.getDelta();
  
  // Update player
  player.update(deltaTime);
  
  // Check collisions (including arena boundaries)
  const allObstacles = [...obstacles, ...boundaries];
  player.checkCollisions(allObstacles, npcs);
  
  // Update NPCs
  npcs.forEach(npc => npc.update(deltaTime));
  
  // Update UI
  ui.update();
  
  // Update camera controls
  controls.update();
  
  // Optional: Make camera loosely follow player (can be disabled for full manual control)
  const followPlayer = false; // Set to true to enable auto-follow
  if (followPlayer) {
    const targetPosition = new THREE.Vector3(
      player.mesh.position.x,
      player.mesh.position.y + 8,
      player.mesh.position.z + 15
    );
    camera.position.lerp(targetPosition, 0.02);
    controls.target.copy(player.mesh.position);
  }
  
  // Render
  renderer.render(scene, camera);
}

// Start the game
animate();

console.log('🧠 Brain Rot Simulator initialized!');
console.log('🎮 Controls:');
console.log('  • WASD: Move around');
console.log('  • Spacebar: Jump');
console.log('  • Mouse: Orbit camera (drag to rotate, scroll to zoom)');
console.log('  • Run into NPCs to push them around!');
console.log('🎯 Features:');
console.log('  • Floating name tag follows player');
console.log('  • Physics-based movement with gravity');
console.log('  • Collision detection with obstacles and NPCs');
console.log('  • Procedurally generated world with trees, walls, and platforms');
console.log('  • Audio feedback for jumps and collisions');
console.log('  • Skyscraper cityscape background');
console.log('  • Arena boundaries to keep gameplay contained');
