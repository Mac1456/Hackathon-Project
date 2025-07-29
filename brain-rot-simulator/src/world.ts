import * as THREE from 'three';

/**
 * Creates and returns a large ground plane for the game world
 */
export function createGround(): THREE.Mesh {
  const groundGeometry = new THREE.PlaneGeometry(300, 300); // Much larger playground
  const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x4CAF50 });
  
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2; // Rotate to be horizontal
  ground.receiveShadow = true;
  
  return ground;
}

/**
 * Creates various obstacles and world features
 */
export function createObstacles(): THREE.Object3D[] {
  const obstacles: THREE.Object3D[] = [];
  
  // Create some walls - spread across larger area
  for (let i = 0; i < 8; i++) {
    const wallGeometry = new THREE.BoxGeometry(3, 5, 0.8);
    const wallMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    
    wall.position.set(
      (Math.random() - 0.5) * 140, // Spread across larger area
      2.5,
      (Math.random() - 0.5) * 140
    );
    wall.castShadow = true;
    wall.receiveShadow = true;
    
    obstacles.push(wall);
  }
  
  // Create some platforms - more and spread out
  for (let i = 0; i < 6; i++) {
    const platformGeometry = new THREE.BoxGeometry(8, 1.5, 8);
    const platformMaterial = new THREE.MeshLambertMaterial({ color: 0xFF9800 });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    
    platform.position.set(
      (Math.random() - 0.5) * 120,
      1.5 + Math.random() * 4,
      (Math.random() - 0.5) * 120
    );
    platform.castShadow = true;
    platform.receiveShadow = true;
    
    obstacles.push(platform);
  }
  
  // Create some "brainrot trees" (cylinders with spheres on top) - more spread out
  for (let i = 0; i < 12; i++) {
    const treeGroup = new THREE.Group();
    
    // Trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.4, 0.5, 5);
    const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 2.5;
    trunk.castShadow = true;
    
    // Crown
    const crownGeometry = new THREE.SphereGeometry(2.5);
    const crownMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
    const crown = new THREE.Mesh(crownGeometry, crownMaterial);
    crown.position.y = 6;
    crown.castShadow = true;
    
    treeGroup.add(trunk);
    treeGroup.add(crown);
    
    treeGroup.position.set(
      (Math.random() - 0.5) * 150, // Spread across much larger area
      0,
      (Math.random() - 0.5) * 150
    );
    
    obstacles.push(treeGroup);
  }
  
  return obstacles;
}

/**
 * Creates skyscraper buildings for background and arena borders
 */
export function createSkyscrapers(): THREE.Object3D[] {
  const skyscrapers: THREE.Object3D[] = [];
  
  // Create a ring of skyscrapers around the arena
  const arenaRadius = 120; // Increase distance to match larger ground
  const numSkyscrapers = 16;
  
  for (let i = 0; i < numSkyscrapers; i++) {
    const angle = (i / numSkyscrapers) * Math.PI * 2;
    const x = Math.cos(angle) * arenaRadius;
    const z = Math.sin(angle) * arenaRadius;
    
    // Randomize skyscraper dimensions
    const width = 4 + Math.random() * 3;
    const height = 20 + Math.random() * 20;
    const depth = 4 + Math.random() * 3;
    
    const skyscraperGroup = new THREE.Group();
    
    // Main building - position so base sits on ground (y=0)
    const buildingGeometry = new THREE.BoxGeometry(width, height, depth);
    const buildingMaterial = new THREE.MeshLambertMaterial({ 
      color: new THREE.Color().setHSL(0.55 + Math.random() * 0.15, 0.4, 0.3 + Math.random() * 0.3)
    });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.y = height / 2; // Half height so base sits on y=0
    building.castShadow = true;
    building.receiveShadow = true;
    
    // Add some windows (smaller boxes on the surface) - simplified for better performance
    const windowRows = Math.floor(height / 4);
    const windowCols = Math.floor(width / 2);
    
    for (let row = 1; row < windowRows; row++) {
      for (let col = 0; col < windowCols; col++) {
        if (Math.random() > 0.4) { // Not all windows are lit
          const windowGeometry = new THREE.BoxGeometry(0.4, 1.2, 0.1);
          const windowMaterial = new THREE.MeshLambertMaterial({ 
            color: Math.random() > 0.6 ? 0xFFFF88 : 0x88AAFF,
            emissive: Math.random() > 0.8 ? 0x111122 : 0x000000
          });
          const windowObj = new THREE.Mesh(windowGeometry, windowMaterial);
          
          windowObj.position.set(
            -width/2 + (col + 0.5) * (width / windowCols),
            height/2 - height/2 + row * (height / windowRows),
            depth/2 + 0.05
          );
          
          skyscraperGroup.add(windowObj);
        }
      }
    }
    
    // Add antenna/spire on some buildings
    if (Math.random() > 0.7) {
      const antennaGeometry = new THREE.CylinderGeometry(0.1, 0.1, 4);
      const antennaMaterial = new THREE.MeshLambertMaterial({ color: 0x444444 });
      const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
      antenna.position.y = height + 2;
      skyscraperGroup.add(antenna);
    }
    
    skyscraperGroup.add(building);
    skyscraperGroup.position.set(x, 0, z); // Place group at ground level
    
    // Don't rotate buildings - let them stand upright naturally
    // skyscraperGroup.lookAt(0, 0, 0); // This was causing the tilting
    
    skyscrapers.push(skyscraperGroup);
  }
  
  // Add some background skyscrapers (further away and simpler)
  for (let i = 0; i < 10; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = 160 + Math.random() * 40;
    const x = Math.cos(angle) * distance;
    const z = Math.sin(angle) * distance;
    
    const height = 25 + Math.random() * 35;
    const width = 5 + Math.random() * 4;
    const depth = 5 + Math.random() * 4;
    
    const buildingGeometry = new THREE.BoxGeometry(width, height, depth);
    const buildingMaterial = new THREE.MeshLambertMaterial({ 
      color: new THREE.Color().setHSL(0.55 + Math.random() * 0.2, 0.3, 0.25 + Math.random() * 0.2)
    });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.set(x, height / 2, z); // Base sits on ground
    building.castShadow = true;
    
    skyscrapers.push(building);
  }
  
  return skyscrapers;
}

/**
 * Creates arena boundaries using invisible walls
 */
export function createArenaBoundaries(): THREE.Object3D[] {
  const boundaries: THREE.Object3D[] = [];
  const arenaSize = 90; // Much larger arena to match the bigger ground
  const wallHeight = 20;
  
  // Create 4 invisible walls around the arena
  const positions = [
    { x: 0, z: arenaSize, rx: 0 },    // North
    { x: 0, z: -arenaSize, rx: 0 },   // South  
    { x: arenaSize, z: 0, rx: 0 },    // East
    { x: -arenaSize, z: 0, rx: 0 }    // West
  ];
  
  positions.forEach(pos => {
    const wallGeometry = new THREE.BoxGeometry(arenaSize * 2, wallHeight, 1);
    const wallMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xFF0000,
      transparent: true,
      opacity: 0.0 // Invisible but still blocks movement
    });
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.set(pos.x, wallHeight / 2, pos.z);
    wall.rotation.y = pos.rx;
    boundaries.push(wall);
  });
  
  return boundaries;
}
