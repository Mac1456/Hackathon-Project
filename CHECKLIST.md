# ✅ Brain Rot Simulator – Detailed Project Checklist

This checklist breaks down the project into granular, actionable steps suitable for an AI assistant.

## 1. Project Setup & Initialization
- [ ] Initialize a new Vite project using the vanilla-ts template: `npm create vite@latest brain-rot-simulator -- --template vanilla-ts`
- [ ] `cd` into the project directory.
- [ ] Install Three.js and its TypeScript types: `npm install three && npm install -D @types/three`
- [ ] Clear the boilerplate from `src/main.ts`, `style.css`, and `index.html`.
- [ ] In `src/main.ts`, set up a basic Three.js scene: `Scene`, `PerspectiveCamera`, `WebGLRenderer`, and an animation loop.
- [ ] Add basic lighting to the scene (e.g., `AmbientLight` and `DirectionalLight`).

## 2. World & Terrain
- [ ] Create a `world.ts` file.
- [ ] In `world.ts`, create a function to generate a large ground plane using `PlaneGeometry` and add it to the scene.
- [ ] In `world.ts`, create a function to generate and scatter several static obstacles (walls, platforms) using `BoxGeometry`.
- [ ] Import and call these functions from `main.ts`.

## 3. Player Character & Movement
- [ ] Create a `player.ts` file.
- [ ] In `player.ts`, create a `Player` class or object.
- [ ] The `Player` should create a `CapsuleGeometry` mesh as its physical representation.
- [ ] The `Player` should have properties for velocity and a `canJump` state.
- [ ] In `player.ts`, implement an `update` method that applies gravity to the player's velocity.
- [ ] Implement event listeners for `keydown` and `keyup` to control player movement (WASD) and jumping (Spacebar).
- [ ] In the animation loop in `main.ts`, call the player's `update` method.

## 4. Collision Detection
- [ ] In the player's `update` method, add AABB (Axis-Aligned Bounding Box) collision detection.
- [ ] Check for collisions between the player and the ground plane, preventing the player from falling through.
- [ ] Check for collisions between the player and the obstacles, preventing the player from passing through them.
- [ ] Reset the player's `canJump` state to `true` upon landing on the ground.

## 5. Floating Name Tag (UI)
- [ ] Create a `ui.ts` file.
- [ ] In `index.html`, add a `<div>` with an ID (e.g., `name-tag`) for the label.
- [ ] In `ui.ts`, create a function that takes the player's mesh and the camera as input.
- [ ] In this function, project the player's 3D position to 2D screen space.
- [ ] Update the CSS `transform` of the name tag `<div>` to follow the player on screen.
- [ ] Call this UI update function from the animation loop in `main.ts`.

## 6. Sound
- [ ] Add a folder `public/assets/sounds` and place a placeholder `jump.mp3` file inside.
- [ ] In `main.ts`, set up the `AudioListener` and attach it to the camera.
- [ ] Use the `AudioLoader` to load `jump.mp3`.
- [ ] When the player jumps, trigger the loaded sound to play.
- [ ] (Stretch) Load a `collision.mp3` sound and play it upon collision with an obstacle. 