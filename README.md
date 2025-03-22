# Meshifai

AI-powered tools for 3D model generation

## Installation

```bash
npm install @0xretrodev/meshifai
```

## Usage

### Text to 3D Model

Convert text descriptions into 3D models with a single function call.

```javascript
// Method 1: Named import
import { textTo3d } from '@0xretrodev/meshifai';

// Basic usage
const downloadUrl = await textTo3d("A futuristic spaceship");

console.log("Download your 3D model:", downloadUrl);

// Method 2: Default import
import meshifai from '@0xretrodev/meshifai';

// Object-style usage
const creativeUrl = await meshifai.textTo3d("A medieval castle", { variance: 0.3 });

console.log("Download your creative 3D model:", creativeUrl);
```

#### Options

The `textTo3d` function accepts an optional second parameter with options:

```javascript
// The variance parameter (0-1) controls how creative the model generation is
// Higher values produce more varied results
const url = await textTo3d("A luxury sports car", { 
  variance: 0.5 
});
```

## Model Format

The generated 3D models are in `.glb` format (GL Transmission Format Binary), which is widely supported by:

- 3D modeling software like Blender
- Game engines like Unity and Unreal
- Web-based 3D viewers
- AR/VR applications

## Future Services

More AI-powered 3D services coming soon!

## License

MIT