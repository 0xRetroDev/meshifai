// src/services/textTo3d.js
import { Client } from "@gradio/client";

/**
 * Generates a 3D model from a text prompt
 * @param {string} prompt - Text description of the 3D model you want to create
 * @param {Object} options - Optional parameters
 * @param {number} options.variance - Variance parameter for generation (default: 0)
 * @returns {Promise<string>} - Download URL for the generated 3D model
 */
export async function textTo3d(prompt, options = {}) {
  if (!prompt || typeof prompt !== 'string') {
    throw new Error('A text prompt is required');
  }

  const { variance = 0 } = options;

  try {
    // Connect to the Gradio app
    const client = await Client.connect("Roblox/cube3d-interactive");
    
    // Generate the 3D model
    const response = await client.predict("/handle_text_prompt", { 
      input_prompt: prompt, 
      variance 
    });
    
    // Check if we got a valid response
    if (!response || !response.data || !response.data[0] || !response.data[0].path) {
      throw new Error('Invalid response from the model server');
    }
    
    // Extract file path to create download link
    const BASE_DOWNLOAD_URL = "https://roblox-cube3d-interactive.hf.space/gradio_api/file=";
    const filePath = response.data[0].path;
    
    // Return the download URL
    const downloadUrl = `${BASE_DOWNLOAD_URL}${filePath}`;
    
    return downloadUrl;
    
  } catch (error) {
    console.error("Error details:", error);
    throw new Error(`Failed to generate 3D model: ${error.message}`);
  }
}