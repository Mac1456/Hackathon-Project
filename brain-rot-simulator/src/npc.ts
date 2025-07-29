import * as THREE from 'three';

export class NPC {
  public mesh: THREE.Mesh;
  public velocity: THREE.Vector3;
  private readonly name: string;
  
  constructor(name: string, position: THREE.Vector3, color: number = 0x9C27B0) {
    this.name = name;
    
    // Create NPC geometry (smaller capsule than player)
    const geometry = new THREE.CapsuleGeometry(0.4, 1.5, 4, 8);
    const material = new THREE.MeshLambertMaterial({ color });
    
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(position);
    this.mesh.castShadow = true;
    
    this.velocity = new THREE.Vector3(0, 0, 0);
  }

  public update(deltaTime: number): void {
    // Simple idle animation - bob up and down slightly
    const time = Date.now() * 0.001;
    this.mesh.position.y = 1 + Math.sin(time + this.mesh.position.x) * 0.1;
    
    // Apply gravity to velocity
    this.velocity.y += -25 * deltaTime;
    
    // Simple ground collision
    if (this.mesh.position.y <= 1) {
      this.mesh.position.y = 1;
      this.velocity.y = 0;
    }
  }

  public applyForce(force: THREE.Vector3): void {
    this.velocity.add(force);
    this.mesh.position.add(this.velocity.clone().multiplyScalar(0.1));
    
    // Damping
    this.velocity.multiplyScalar(0.95);
  }

  public getName(): string {
    return this.name;
  }
}

export function createNPCs(): NPC[] {
  const npcs: NPC[] = [];
  
  const npcData = [
    { name: "Brainrot Bob", color: 0x9C27B0, position: new THREE.Vector3(25, 1, 15) },
    { name: "Skibidi Sam", color: 0xE91E63, position: new THREE.Vector3(-30, 1, -20) },
    { name: "Ohio Oliver", color: 0x3F51B5, position: new THREE.Vector3(40, 1, -35) },
    { name: "Sigma Steve", color: 0x009688, position: new THREE.Vector3(-20, 1, 45) },
    { name: "Rizz Rick", color: 0xFF5722, position: new THREE.Vector3(-45, 1, 20) },
    { name: "Mewing Mike", color: 0xFFC107, position: new THREE.Vector3(30, 1, -50) },
    { name: "Gyatt Gary", color: 0x795548, position: new THREE.Vector3(-35, 1, -45) },
    { name: "Fanum Felix", color: 0x607D8B, position: new THREE.Vector3(50, 1, 30) }
  ];
  
  npcData.forEach(data => {
    npcs.push(new NPC(data.name, data.position, data.color));
  });
  
  return npcs;
}
