// src/services/textTo3d.js

import { generateTexturedModel } from './texturedService.js';
import { generateUntexturedModel } from './untexturedService.js';
import { checkAvailability } from './healthCheckService.js';

/** 
 * Generates a 3D model from a text prompt 
 * @param {string} prompt 
 * @param {Object} options
 * @param {boolean} options.textured 
 * @param {number} options.variance 
 * @param {number} options.polygons 
 * @returns {Promise<{modelUrl: string, textured: boolean}>} 
 */
export async function textTo3d(prompt, options = {}) {
  if (!prompt || typeof prompt !== 'string') {
    throw new Error('A text prompt is required');
  }

  const { textured = false, variance = 0.3, polygons = 25000 } = options;

  try {
    if (textured) {
      // Generate a textured model
      const modelUrl = await generateTexturedModel(prompt, { polygons });
      return { modelUrl, textured: true };
    } else {
      // Generate an untextured model
      const modelUrl = await generateUntexturedModel(prompt, { variance });
      return { modelUrl, textured: false };
    }
  } catch (error) {
    console.error(`Error in textTo3d service:`, error);
    throw new Error(`Failed to generate 3D model: ${error.message}`);
  }
}

/**
 * Check which services are currently available
 * @returns {Promise<{untextured: boolean, textured: boolean}>} Object indicating service availability
 */
export async function checkServiceAvailability() {
  return await checkAvailability();
}

export { generateTexturedModel, generateUntexturedModel };