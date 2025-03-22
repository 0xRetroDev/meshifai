# Meshifai

Easyt to use AI-powered tools for 3D model generation.

## Installation

```bash
npm install meshifai
```

## Services

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

## TypeScript Support

The package includes TypeScript definitions:

```typescript
import { textTo3d } from 'meshifai';

async function example(): Promise<void> {
  const url: string = await textTo3d("A cute cartoon dog", { variance: 0.2 });
  console.log(url);
}
```

## Future Services

More AI-powered 3D services coming soon!

## License

MIT
