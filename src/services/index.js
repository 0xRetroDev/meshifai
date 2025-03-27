
import meshifai from '../index.js';

async function generateModels() {
    try {
      // 1. Generate a textured 3D model (default)
      // console.log('Generating textured 3D model...');
      // const texturedResult = await meshifai.textTo3d('A red apple', {textured: true, polygons: 25000});
      // console.log(`Textured model URL: ${texturedResult.modelUrl}`); 
      
      // 2. Generate an untextured 3D model
      //console.log('Generating untextured 3D model...');
      //const untexturedResult = await textTo3d('A red apple', { textured: false });
      //console.log(`Untextured model URL: ${untexturedResult.modelUrl}`);
      
      // 3. Generate an untextured model with custom variance
      //console.log('Generating untextured 3D model with custom variance...');
      //const customResult = await textTo3d('A red apple', { 
        //textured: false,
        //variance: 0.5
      //});
      //console.log(`Custom untextured model URL: ${customResult.modelUrl}`);
      
    } catch (error) {
      console.error('Error generating models:', error);
    }
}
  
  
  // Run the example function
  generateModels();