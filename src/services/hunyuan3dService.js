// src/services/hunyuan3dService.js
// Service for generating textured 3D models with Hunyuan3D

import fetch from 'node-fetch';

/**
 * Generates a textured 3D model using Hunyuan3D
 * @param {string} prompt -
 * @returns {Promise<string>} 
 */
export async function generateTexturedModel(prompt) {
  try {
    // Generate a random session hash
    const sessionHash = Array(10)
      .fill(0)
      .map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
      .join('');
    
    // Prepare the payload
    const payload = {
      data: [
        prompt,        // Text prompt
        null,          // Second parameter is null
        true,          // do_removebg
        0,             // sseed
        25,            // sstep
        0,             // SSEED
        50,            // SSTEP
        "face",        // color
        true,          // bake
        true,          // render
        10000,         // max_faces
        false,         // force
        "auto",        // front
        ["180°"],      // others
        1              // align_times
      ],
      event_data: null,
      fn_index: 4,
      trigger_id: 11,
      session_hash: sessionHash
    };
    
    // STEP 1: Make the initial POST request
    const initialResponse = await fetch('https://tencent-hunyuan3d-1.hf.space/queue/join?__theme=system', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Referer': 'https://tencent-hunyuan3d-1.hf.space/?__theme=system',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
      },
      body: JSON.stringify(payload)
    });
    
    if (!initialResponse.ok) {
      throw new Error(`Initial request failed with status: ${initialResponse.status}`);
    }
    
    const initialData = await initialResponse.json();
    
    if (!initialData.event_id) {
      throw new Error('No event ID received');
    }
    
    const eventId = initialData.event_id;
    
    // STEP 2: Stream results using SSE
    const streamUrl = `https://tencent-hunyuan3d-1.hf.space/queue/data?session_hash=${sessionHash}`;
    
    // Setup variable to store the GLB URL
    let glbUrl = null;
    
    // Make the streaming request with proper headers
    const streamResponse = await fetch(streamUrl, {
      headers: {
        'Accept': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Referer': 'https://tencent-hunyuan3d-1.hf.space/?__theme=system',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
      }
    });
    
    if (!streamResponse.ok) {
      throw new Error(`Stream request failed with status: ${streamResponse.status}`);
    }
    
    if (!streamResponse.body) {
      throw new Error('Stream response has no body');
    }
    
    // Process the stream
    for await (const chunk of streamResponse.body) {
      const chunkText = chunk.toString();
      const lines = chunkText.split('\n');
      
      for (const line of lines) {
        if (!line.trim() || !line.startsWith('data: ')) continue;
        
        const eventData = line.substring(6);
        
        try {
          const parsedEvent = JSON.parse(eventData);
          
          // Check for completion event
          if (parsedEvent.msg === 'process_completed' && parsedEvent.output && parsedEvent.output.data) {
            // Extract the GLB file URL
            for (const item of parsedEvent.output.data) {
              if (item && item.path) {
                const fileType = item.path.split('.').pop();
                
                // Look for GLB file
                if (fileType === 'glb') {
                  glbUrl = item.url;
                  break;
                }
                // Fallback to OBJ if no GLB found yet
                else if (fileType === 'obj' && !glbUrl) {
                  glbUrl = item.url;
                }
              }
            }
            
            // If we found a GLB URL, stop processing
            if (glbUrl) {
              break;
            }
          } 
          // Also stop if the server closes the stream
          else if (parsedEvent.msg === 'close_stream') {
            break;
          }
        } catch (e) {
          // Silently ignore parsing errors
        }
      }
      
      // If we found a GLB URL, stop processing chunks
      if (glbUrl) break;
    }
    
    // If we found a GLB URL, return it
    if (glbUrl) {
      return glbUrl;
    } else {
      throw new Error('No GLB file found in the response');
    }
  } catch (error) {
    console.error(`Hunyuan3D error: ${error.message}`);
    throw new Error(`Failed to generate textured 3D model: ${error.message}`);
  }
}