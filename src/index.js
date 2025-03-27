// src/index.js
// Main export file for the meshifai package

import { 
  textTo3d, 
  generateTexturedModel, 
  generateUntexturedModel,
  checkServiceAvailability
} from './services/textTo3d.js';

const meshifai = { 
  textTo3d,
  generateTexturedModel,
  generateUntexturedModel,
  checkAvailability: checkServiceAvailability
};

export { 
  textTo3d, 
  generateTexturedModel, 
  generateUntexturedModel,
  checkServiceAvailability as checkAvailability
};

export default meshifai;