// src/services/textTo3d.js

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
    // Base URLs for API interaction
    const API_BASE_URL = 'https://roblox-cube3d-interactive.hf.space/gradio_api';
    const BASE_DOWNLOAD_URL = `${API_BASE_URL}/file=`;
    
    // Step 1: Initialize prediction with the text prompt
    const initResponse = await fetch(`${API_BASE_URL}/call/handle_text_prompt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [prompt, variance]
      })
    });
    
    if (!initResponse.ok) {
      throw new Error(`HTTP error! Status: ${initResponse.status}`);
    }
    
    const initData = await initResponse.json();
    
    // Extract the event ID from the response
    const eventId = initData.event_id;
    if (!eventId) {
      throw new Error('No event ID received from server');
    }
    
    // Step 2: Wait for the model to generate
    // The model typically takes 5-15 seconds to generate
    await new Promise(resolve => setTimeout(resolve, 12000));
    
    // Step 3: Fetch the result directly
    const resultResponse = await fetch(`${API_BASE_URL}/call/handle_text_prompt/${eventId}`);
    
    if (!resultResponse.ok) {
      throw new Error(`Failed to fetch result: ${resultResponse.status}`);
    }
    
    // Get the raw text response
    const resultText = await resultResponse.text();
    
    // Parse the SSE format - specifically looking for the data after 'event: complete'
    const completionMatch = resultText.match(/event: complete\s*\n\s*data: (\[.*\])/);
    if (!completionMatch || !completionMatch[1]) {
      throw new Error('Could not find completion data in the response');
    }
    
    // Parse the JSON data
    try {
      const jsonData = JSON.parse(completionMatch[1]);
      
      // Check if we have a file path
      if (!jsonData || !jsonData[0] || !jsonData[0].path) {
        throw new Error('No file path found in the completion data');
      }
      
      // Extract the file path
      const filePath = jsonData[0].path;
      
      // Construct the download URL
      const downloadUrl = `${BASE_DOWNLOAD_URL}${filePath}`;
      
      return downloadUrl;
      
    } catch (error) {
      console.error('Failed to parse completion data:', error);
      throw new Error('Failed to parse the model data from the server');
    }
    
  } catch (error) {
    console.error('Error details:', error);
    throw new Error(`Failed to generate 3D model: ${error.message}`);
  }
}