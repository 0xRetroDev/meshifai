// src/index.js

import { textTo3d, generateTexturedModel, generateUntexturedModel } from './services/textTo3d.js';

const meshifai = { 
  textTo3d,
  generateTexturedModel,
  generateUntexturedModel
};

export { textTo3d, generateTexturedModel, generateUntexturedModel };

export default meshifai;