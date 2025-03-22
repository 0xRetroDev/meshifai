// src/index.js
import { textTo3d } from './services/textTo3d.js';

// Create the meshifai object with all services
const meshifai = {
  textTo3d
};

// Named export for direct import
export { textTo3d };

// Default export for object-style import
export default meshifai;