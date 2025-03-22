# Meshifai

AI-powered tools for 3D model generation.

## Installation

```bash
npm install meshifai
```

## Usage

### Text to 3D Model

Convert text descriptions into 3D models with a single function call.

```javascript
import { textTo3d } from 'meshifai';

// Basic usage
const downloadUrl = await textTo3d("A futuristic spaceship");

console.log("Download your 3D model:", downloadUrl);

// With variance option for more creative results
const creativeUrl = await textTo3d("A medieval castle", { variance: 0.3 });

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

## Examples

### Using named import

```javascript
import { textTo3d } from 'meshifai';

async function main() {
  try {
    // Generate a 3D model with just one line
    const url = await textTo3d("A medieval castle on a hill");
    
    console.log("Your 3D model is ready!");
    console.log("Download URL:", url);
    
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
```

### Using default import

```javascript
import meshifai from 'meshifai';

async function main() {
  try {
    // Generate a 3D model with the textTo3d function
    const url = await meshifai.textTo3d("A cute cartoon dog");
    console.log("Model URL:", url);
    
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
```

## Future Services

More AI-powered 3D services coming soon!

## License

MIT