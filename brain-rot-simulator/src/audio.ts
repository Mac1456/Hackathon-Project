import * as THREE from 'three';

export class AudioManager {
  private listener: THREE.AudioListener;
  private loader: THREE.AudioLoader;
  private jumpSound: THREE.Audio | null = null;
  private collisionSound: THREE.Audio | null = null;

  constructor(camera: THREE.Camera) {
    this.listener = new THREE.AudioListener();
    camera.add(this.listener);
    
    this.loader = new THREE.AudioLoader();
    this.loadSounds();
  }

  private loadSounds(): void {
    // Create placeholder audio buffers since we don't have actual sound files
    this.createPlaceholderSounds();
  }

  private createPlaceholderSounds(): void {
    // Create a simple beep sound for jumping
    const jumpBuffer = this.createBeepBuffer(200, 0.1); // 200Hz beep for 0.1s
    this.jumpSound = new THREE.Audio(this.listener);
    this.jumpSound.setBuffer(jumpBuffer);
    this.jumpSound.setVolume(0.3);

    // Create a different beep for collision
    const collisionBuffer = this.createBeepBuffer(100, 0.2); // 100Hz beep for 0.2s
    this.collisionSound = new THREE.Audio(this.listener);
    this.collisionSound.setBuffer(collisionBuffer);
    this.collisionSound.setVolume(0.2);
  }

  private createBeepBuffer(frequency: number, duration: number): THREE.AudioBuffer {
    const sampleRate = 44100;
    const samples = sampleRate * duration;
    const buffer = new AudioBuffer({
      numberOfChannels: 1,
      length: samples,
      sampleRate: sampleRate
    });
    
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < samples; i++) {
      channelData[i] = Math.sin(2 * Math.PI * frequency * i / sampleRate) * 0.3;
    }
    
    return buffer;
  }

  public playJumpSound(): void {
    if (this.jumpSound && !this.jumpSound.isPlaying) {
      this.jumpSound.play();
    }
  }

  public playCollisionSound(): void {
    if (this.collisionSound && !this.collisionSound.isPlaying) {
      this.collisionSound.play();
    }
  }
}
