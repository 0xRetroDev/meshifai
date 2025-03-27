# MeshifAI

AI-powered tools for 3D model generation

![image](https://github.com/user-attachments/assets/33fe2890-45d8-4d6b-af55-3bc3430a53d1)

## Installation

```bash
npm install @0xretrodev/meshifai
```

## Usage

### Text to 3D Model

MeshifAI supports generating both textured and untextured 3D models from text prompts.

```javascript
import meshifai from '@0xretrodev/meshifai';

// Generate an untextured model (faster and more reliable)
const result = await meshifai.textTo3d('A red apple');
console.log(`Download URL: ${result.modelUrl}`);

// Generate an untextured model with custom variance (0-1)
// Higher values = more creative, lower = more precise
const customResult = await meshifai.textTo3d('A red apple', { 
  variance: 0.5
});
console.log(`Download URL: ${customResult.modelUrl}`);

// Generate a textured model with PBR materials
const texturedResult = await meshifai.textTo3d('A red apple', { 
  textured: true 
});
console.log(`Download URL: ${texturedResult.modelUrl}`);

// Generate a high-quality textured model by increasing polygon count
const highQualityResult = await meshifai.textTo3d('A red apple', { 
  textured: true,
  polygons: 50000  // Default is 25000, higher = better quality
});
console.log(`Download URL: ${highQualityResult.modelUrl}`);
```

### Check API Availability

You can check the availability of MeshifAI's services before making requests:

```javascript
// Check service availability
const availability = await meshifai.checkAvailability();
console.log(`Textured API available: ${availability.textured}`);
console.log(`Untextured API available: ${availability.untextured}`);
```

## Model Types

### Untextured Models
- Faster generation (typically 5-15 seconds)
- Simple geometry without materials
- Controllable creativity with the `variance` parameter
- Reliable for basic shapes and prototyping

### Textured Models (PBR)
- Includes physically-based rendering materials
- Much more detailed and realistic appearance
- Longer generation time (typically 60-180 seconds)
- Quality can be adjusted with the `polygons` parameter
- Great for final assets and presentations
- Can be unreliable at times

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

## Support

For support requests, please [contact us](mailto:hello@0xretro.dev) or open an issue.