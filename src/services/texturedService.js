// src/services/texturedService.js
// Service for generating textured 3D models with MeshifAI's textured API

import fetch from 'node-fetch';

// API configuration
const API_CONFIG = {
  BASE_URL: 'https://api.meshifai.com/v1/experimental/text-to-3d.php',
  POLLING_INTERVAL: 5000, // Poll every 5 seconds
  MAX_POLLING_ATTEMPTS: 60 // Max 5 minutes of polling (60 * 5s = 300s = 5min)
};

/**
 * Generates a textured 3D model using MeshifAI API
 * @param {string} prompt - Text description of the desired 3D model
 * @param {Object} options - Additional options
 * @param {number} options.polygons - Number of polygons (default: 25000)
 * @returns {Promise<string>} URL to the generated model
 */
export async function generateTexturedModel(prompt, options = {}) {
  try {
    const { polygons = 25000 } = options;
    
    // Create the request parameters
    const requestParams = {
      prompt: prompt.trim(),
      faceLimit: polygons,
      pbr: true
    };
    
    // Make the initial request to start model generation
    const initialResponse = await fetch(API_CONFIG.BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestParams)
    });
    
    if (!initialResponse.ok) {
      const errorText = await initialResponse.text();
      throw new Error(`API request failed with status: ${initialResponse.status}, details: ${errorText}`);
    }
    
    const initialData = await initialResponse.json();
    
    // If we immediately got a download URL, return it
    if (initialData.status === true && initialData.download_url) {
      return initialData.download_url;
    }
    
    // If we got a task ID, poll for the result
    if (initialData.taskId) {
      const modelUrl = await pollForResult(initialData.taskId);
      return modelUrl;
    }
    
    // If we didn't get a download URL or task ID, something went wrong
    throw new Error('API response did not contain a download URL or task ID');
    
  } catch (error) {
    console.error(`MeshifAI textured API error: ${error.message}`);
    throw new Error(`Failed to generate textured 3D model: ${error.message}`);
  }
}

/**
 * Polls the API for the result of a task
 * @param {string} taskId - ID of the task to poll for
 * @returns {Promise<string>} URL to the generated model
 * @private
 */
async function pollForResult(taskId) {
  // Validate task ID
  if (!taskId) {
    throw new Error('No task ID provided for polling');
  }
  
  let attempts = 0;
  
  while (attempts < API_CONFIG.MAX_POLLING_ATTEMPTS) {
    try {
      // Wait for the polling interval
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.POLLING_INTERVAL));
      
      // Check task status
      const statusResponse = await fetch(`${API_CONFIG.BASE_URL}?id=${encodeURIComponent(taskId)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!statusResponse.ok) {
        throw new Error(`Status check failed with status: ${statusResponse.status}`);
      }
      
      const statusData = await statusResponse.json();
      
      // If the model is ready, return the download URL
      if (statusData.status === true && statusData.download_url) {
        return statusData.download_url;
      }
      
      // If the task failed, throw an error
      if (statusData.status === 'failed') {
        throw new Error('Model generation failed');
      }
      
      // If the task is still in progress (queued/in_progress), continue polling
      attempts++;
      
    } catch (error) {
      console.error(`Polling error: ${error.message}`);
      throw error;
    }
  }
  
  // If we've reached the maximum number of polling attempts, throw an error
  throw new Error('Model generation timed out after maximum polling attempts');
}