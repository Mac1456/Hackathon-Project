import * as THREE from 'three';
import { AudioManager } from './audio';

export class Player {
  public mesh: THREE.Mesh;
  public velocity: THREE.Vector3;
  public canJump: boolean;
  private audioManager: AudioManager | null = null;
  
  private readonly SPEED = 8;
  private readonly JUMP_STRENGTH = 10;
  private readonly GRAVITY = -25;
  
  private keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    space: false
  };

  constructor() {
    // Create capsule geometry for the player character
    const geometry = new THREE.CapsuleGeometry(0.5, 2, 4, 8);
    const material = new THREE.MeshLambertMaterial({ color: 0xFF6B6B });
    
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, 2, 0);
    this.mesh.castShadow = true;
    
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.canJump = true;
    
    this.setupControls();
  }

  private setupControls(): void {
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'KeyW':
          this.keys.w = true;
          break;
        case 'KeyA':
          this.keys.a = true;
          break;
        case 'KeyS':
          this.keys.s = true;
          break;
        case 'KeyD':
          this.keys.d = true;
          break;
        case 'Space':
          this.keys.space = true;
          event.preventDefault();
          break;
      }
    });

    document.addEventListener('keyup', (event) => {
      switch (event.code) {
        case 'KeyW':
          this.keys.w = false;
          break;
        case 'KeyA':
          this.keys.a = false;
          break;
        case 'KeyS':
          this.keys.s = false;
          break;
        case 'KeyD':
          this.keys.d = false;
          break;
        case 'Space':
          this.keys.space = false;
          break;
      }
    });
  }

  public update(deltaTime: number): void {
    // Handle horizontal movement
    const direction = new THREE.Vector3();
    
    if (this.keys.w) direction.z -= 1;
    if (this.keys.s) direction.z += 1;
    if (this.keys.a) direction.x -= 1;
    if (this.keys.d) direction.x += 1;
    
    direction.normalize();
    
    // Apply movement
    this.velocity.x = direction.x * this.SPEED;
    this.velocity.z = direction.z * this.SPEED;
    
    // Handle jumping
    if (this.keys.space && this.canJump) {
      this.velocity.y = this.JUMP_STRENGTH;
      this.canJump = false;
      this.audioManager?.playJumpSound();
    }
    
    // Apply gravity
    this.velocity.y += this.GRAVITY * deltaTime;
    
    // Update position
    this.mesh.position.add(this.velocity.clone().multiplyScalar(deltaTime));
    
    // Ground collision (simple check)
    if (this.mesh.position.y <= 1) {
      this.mesh.position.y = 1;
      this.velocity.y = 0;
      this.canJump = true;
    }
  }

  public setAudioManager(audioManager: AudioManager): void {
    this.audioManager = audioManager;
  }

  public checkCollisions(obstacles: THREE.Object3D[], npcs: any[]): void {
    const playerBox = new THREE.Box3().setFromObject(this.mesh);
    
    // Check obstacle collisions
    obstacles.forEach(obstacle => {
      const obstacleBox = new THREE.Box3().setFromObject(obstacle);
      if (playerBox.intersectsBox(obstacleBox)) {
        // Simple collision response - push player away
        const center = new THREE.Vector3();
        obstacleBox.getCenter(center);
        const direction = this.mesh.position.clone().sub(center).normalize();
        this.mesh.position.add(direction.multiplyScalar(0.5));
        this.audioManager?.playCollisionSound();
      }
    });

    // Check NPC collisions
    npcs.forEach(npc => {
      const npcBox = new THREE.Box3().setFromObject(npc.mesh);
      if (playerBox.intersectsBox(npcBox)) {
        // Push NPC away (Goat Simulator style)
        const center = new THREE.Vector3();
        npcBox.getCenter(center);
        const direction = npc.mesh.position.clone().sub(this.mesh.position).normalize();
        const force = direction.multiplyScalar(2);
        npc.applyForce(force);
        this.audioManager?.playCollisionSound();
      }
    });
  }
}
