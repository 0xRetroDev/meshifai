// src/services/textTo3d.js

import { generateTexturedModel } from './hunyuan3dService.js';
import { generateUntexturedModel } from './cube3dService.js';

/** 
 * Generates a 3D model from a text prompt 
 * @param {string} prompt 
 * @param {Object} options
 * @param {boolean} options.textured 
 * @param {number} options.variance 
 * @returns {Promise<{modelUrl: string, textured: boolean}>} 
 */
export async function textTo3d(prompt, options = {}) {
  if (!prompt || typeof prompt !== 'string') {
    throw new Error('A text prompt is required');
  }

  const { textured = false, variance = 0.3 } = options;

  try {
    if (textured) {
      // Generate a textured model using Hunyuan3D
      const modelUrl = await generateTexturedModel(prompt);
      return { modelUrl, textured: true };
    } else {
      // Generate an untextured model using Cube3D
      const modelUrl = await generateUntexturedModel(prompt, { variance });
      return { modelUrl, textured: false };
    }
  } catch (error) {
    console.error(`Error in textTo3d service:`, error);
    throw new Error(`Failed to generate 3D model: ${error.message}`);
  }
}


export { generateTexturedModel, generateUntexturedModel };