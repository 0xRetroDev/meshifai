# MeshifAI

AI-powered tools for 3D model generation

[Visit the website](https://meshifai.com/)

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

// Generate an untextured model with high resolution (better quality, slower)
const highResResult = await meshifai.textTo3d('A red apple', { 
  highRes: true
});
console.log(`Download URL: ${highResResult.modelUrl}`);

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
- Quality control with the `highRes` parameter:
  - `false` (default): Standard quality, faster generation
  - `true`: High resolution, better quality but slower generation
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

## API Parameters

### Untextured Models
- `highRes` (boolean, default: `false`): Enable high-resolution mode for better quality

### Textured Models
- `textured` (boolean): Set to `true` to generate textured models
- `polygons` (number, default: `25000`): Higher values produce better quality

## Future Services

More AI-powered 3D services coming soon!

## License

MIT

## Support

For support requests, please [contact us](mailto:hello@0xretro.dev) or open an issue.
