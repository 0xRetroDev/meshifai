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
import meshifai from '@retrodev/meshifai';

// Generate an untextured model (faster and more reliable)
const result = await textTo3d('A red apple');
console.log(`Download URL: ${result.modelUrl}`);

// Generate an untextured model with custom variance
const customResult = await textTo3d('A red apple', { 
  textured: false,
  variance: 0.5
});
console.log(`Download URL: ${customResult.modelUrl}`);

// Generate a textured model (experimental, takes longer to generate, but looks amazing!)
const texturedResult = await meshifai.textTo3d('A red apple', { textured: true });
console.log(`Download URL: ${texturedResult.modelUrl}`);
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

## Support

For support requests, please [contact us](mailto:hello@0xretro.dev) or open an issue.
