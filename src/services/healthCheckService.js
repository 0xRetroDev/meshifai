// src/services/healthCheckService.js
// Simple service for checking MeshifAI API availability

import fetch from 'node-fetch';

// Health check endpoint
const HEALTH_CHECK_URL = 'https://api.meshifai.com/v1/health/health-check.php';

/**
 * Check if MeshifAI services are available
 * @returns {Promise<{untextured: boolean, textured: boolean}>} 
 *          Simple object indicating if each service is available
 */
export async function checkAvailability() {
  try {
    const response = await fetch(HEALTH_CHECK_URL);
    
    if (!response.ok) {
      // If health check fails, assume services are down
      return { untextured: false, textured: false };
    }
    
    const data = await response.json();
    
    // Extract service status
    const services = data.services || {};
    
    return {
      untextured: services.untextured?.status === 'Operational',
      textured: services.textured?.status === 'Operational'
    };
  } catch (error) {
    // If request fails, assume services are down
    console.error(`Health check error: ${error.message}`);
    return { untextured: false, textured: false };
  }
}