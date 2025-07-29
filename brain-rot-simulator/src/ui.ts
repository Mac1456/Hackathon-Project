import * as THREE from 'three';

export class UI {
  private nameTag: HTMLDivElement;
  private readonly player: THREE.Mesh;
  private readonly camera: THREE.Camera;

  constructor(player: THREE.Mesh, camera: THREE.Camera) {
    this.player = player;
    this.camera = camera;
    this.nameTag = this.createNameTag();
  }

  private createNameTag(): HTMLDivElement {
    const nameTag = document.createElement('div');
    nameTag.id = 'name-tag';
    nameTag.textContent = 'Tun Tun Tun Sahoor';
    nameTag.style.position = 'absolute';
    nameTag.style.color = '#FFD700';
    nameTag.style.fontFamily = 'Arial, sans-serif';
    nameTag.style.fontSize = '18px';
    nameTag.style.fontWeight = 'bold';
    nameTag.style.textShadow = '2px 2px 4px rgba(0,0,0,0.8)';
    nameTag.style.pointerEvents = 'none';
    nameTag.style.userSelect = 'none';
    nameTag.style.zIndex = '100';
    nameTag.style.transform = 'translate(-50%, -50%)';
    
    document.body.appendChild(nameTag);
    return nameTag;
  }

  public update(): void {
    // Get player's world position
    const playerPosition = this.player.position.clone();
    playerPosition.y += 3; // Float above the player

    // Project 3D position to 2D screen coordinates
    const vector = playerPosition.clone();
    vector.project(this.camera);

    // Convert to screen coordinates
    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (vector.y * -0.5 + 0.5) * window.innerHeight;

    // Update name tag position
    this.nameTag.style.left = `${x}px`;
    this.nameTag.style.top = `${y}px`;

    // Hide if behind camera or too far
    const distance = this.camera.position.distanceTo(this.player.position);
    if (vector.z > 1 || distance > 50) {
      this.nameTag.style.display = 'none';
    } else {
      this.nameTag.style.display = 'block';
    }
  }

  public destroy(): void {
    if (this.nameTag && this.nameTag.parentElement) {
      this.nameTag.parentElement.removeChild(this.nameTag);
    }
  }
}
