# 🧠 Brain Rot Simulator – Product Requirements Document (PRD)

## 1. Overview
A meme-themed 3D playground built with Three.js, where players control a goofy character (“Tun Tun Tun Sahoor”) to explore a flat world, jump, collide with obstacles, and trigger meme sounds. The game is designed for rapid prototyping in a 4-hour hackathon, focusing on fun, modularity, and meme energy.

---

## 2. Goals & Non-Goals

### Goals
- A playable, in-browser 3D game using Three.js.
- A controllable meme character with WASD movement, jumping, and sound triggers.
- A simple, flat terrain populated with basic geometric obstacles.
- A floating name tag that follows the player character.
- A modular codebase that separates concerns for easy feature branching and development.

### Non-Goals
- Advanced graphics, shaders, or lighting.
- A complex physics engine (simple AABB collision is sufficient).
- Multiplayer functionality (unless all MVP features are completed).
- Persistent user data or accounts.

---

## 3. Features & Technical Requirements

### Core MVP
- **3D Meme Character**
  - **Placeholder**: Use `THREE.CapsuleGeometry` for the player model.
  - **Name**: The character's logical name is “Tun Tun Tun Sahoor”.
- **Movement & Controls**
  - **Controls**: WASD for horizontal movement, Spacebar for jumping.
  - **Physics**: Implement a simple physics loop.
    - **Gravity**: Apply a constant downward velocity to the player.
    - **Jumping**: Apply a single upward impulse when the spacebar is pressed.
- **World & Environment**
  - **Terrain**: A large, flat `THREE.PlaneGeometry` for the ground.
  - **Generated Assets**: The world will be populated with procedurally generated assets like trees, buildings, and ramps. Initially, these will be created using basic `THREE.js` geometries, with the possibility of swapping them for glTF models later.
- **Interactive NPCs**
  - **Concept**: The world will be populated with several non-hostile, brainrot-themed NPCs.
  - **Interaction**: These NPCs can be physically interacted with (e.g., pushed around), similar to the NPCs in Goat Simulator. They should react with simple physics-based responses.
  - **Placeholders**: Initially, NPCs will be represented by simple `CapsuleGeometry` or `BoxGeometry` placeholders.
- **Collision Detection**
  - **Method**: Use simple Axis-Aligned Bounding Box (AABB) checks.
  - **Behavior**: Prevent the player from passing through the floor, obstacles, and NPCs.
- **Soundboard**
  - **Engine**: Use `THREE.AudioListener` attached to the camera and `THREE.AudioLoader`.
  - **Triggers**: Play a placeholder sound (`sahoor.mp3`) when the player jumps and a different sound on collision.
- **Floating Name Tag**
  - **Implementation**: Use an HTML `<div>` element positioned absolutely.
  - **Logic**: In the render loop, project the player's 3D world position to 2D screen coordinates and update the `<div>`'s CSS `transform` property to follow the player.

### Stretch Goals
- **AI Enemy**: A simple "Skibidi Toilet" character that moves towards the player (distinct from passive NPCs).
- **Second Character**: “Ballerina Capuchinna” (a new model that can be swapped).
- **Ragdoll/Knockback**: Apply a small, opposing force on collision.
- **Particle Effects**: Use `THREE.Points` to create simple particles on jump or landing.

---

## 4. Technical Stack
- **Project Setup**: Vite with the `vanilla-ts` template.
- **Core Engine**: Three.js (`three` and `@types/three`).
- **Language**: TypeScript.
- **Code Formatting**: Prettier/ESLint.
- **Asset Sources**:
  - **3D Models**: Sketchfab, Mixamo
  - **Meme Sounds**: MyInstants, FreeSound

---

## 5. Modularity & File Structure
- `src/main.ts`: Main entry point, scene setup, render loop.
- `src/player.ts`: Player class/object, including movement, physics, and model.
- `src/world.ts`: Terrain and obstacle generation.
- `src/ui.ts`: Manages the floating name tag and any other HTML UI.
- `public/assets/`: For storing models and sounds. 