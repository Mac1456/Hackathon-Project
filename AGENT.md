# Brain Rot Simulator - Agent Configuration

## Commands
- **Dev server**: `cd brain-rot-simulator && npm run dev`
- **Build**: `cd brain-rot-simulator && npm run build`
- **Preview**: `cd brain-rot-simulator && npm run preview`
- **Install**: `cd brain-rot-simulator && npm install`

## Architecture
- **Main project**: Vite + Three.js + TypeScript 3D game in `brain-rot-simulator/`
- **Module structure**: `src/main.ts` (entry), `src/player.ts` (character), `src/world.ts` (terrain), `src/ui.ts` (HTML UI)
- **Assets**: `public/assets/` for models and sounds
- **Core tech**: Three.js for 3D rendering, simple AABB collision detection
- **Audio**: THREE.AudioListener + AudioLoader for meme sounds

## Code Style
- **Language**: TypeScript with ES modules (`"type": "module"`)
- **Imports**: Use ES6 imports, relative paths for local modules
- **Naming**: CamelCase for classes (Player), kebab-case for files
- **Three.js**: Use `THREE.CapsuleGeometry` for characters, `THREE.PlaneGeometry` for terrain
- **Physics**: Simple velocity-based movement with gravity
- **Collision**: AABB bounding box checks, prevent pass-through
- **UI**: HTML divs with CSS transforms for floating elements
- **Meme theme**: Character "Tun Tun Tun Sahoor", brainrot NPCs, Skibidi enemies
