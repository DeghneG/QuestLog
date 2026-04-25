import { Jimp } from 'jimp';
import path from 'path';
import fs from 'fs';

const files = ['ml.png', 'valo.png', 'cf.png', 'lol.png', 'ros.png'];
const dir = 'F:/GabPort/public';

async function processImages() {
  for (const file of files) {
    const imgPath = path.join(dir, file);
    if (!fs.existsSync(imgPath)) continue;
    
    console.log(`Processing ${file}...`);
    try {
      const image = await Jimp.read(imgPath);
      
      // Handle the Jimp 1.x mapping differences
      const width = typeof image.bitmap === "object" ? image.bitmap.width : (typeof image.getWidth === 'function' ? image.getWidth() : image.bitmap.width);
      const height = typeof image.bitmap === "object" ? image.bitmap.height : (typeof image.getHeight === 'function' ? image.getHeight() : image.bitmap.height);
      
      const getPixel = (x, y) => {
        const idx = (width * y + x) << 2;
        return [
          image.bitmap.data[idx],
          image.bitmap.data[idx + 1],
          image.bitmap.data[idx + 2],
          image.bitmap.data[idx + 3]
        ];
      };
      
      const bg = getPixel(1, 1); // Sample slightly inward
      
      if (bg[0] < 180 || bg[1] < 180 || bg[2] < 180) {
          console.log(`Skipping ${file}, top-left background is not prominently white/bright. Color: R${bg[0]} G${bg[1]} B${bg[2]}`);
          continue;
      }

      console.log(`Flood filling white background to black for ${file}`);

      const visited = new Uint8Array(width * height);
      const queue = [ [0, 0] ]; // Using an array with a pointer for fast BFS
      let qIndex = 0;
      visited[0] = 1;
      
      // Increased tolerance carefully to hit antialiasing, but not devour colors.
      const limit = 60; 
      
      while(qIndex < queue.length) {
        const [x, y] = queue[qIndex++];
        
        const idx = (width * y + x) << 2;
        // set pixel to pitch black
        image.bitmap.data[idx] = 0;   // R
        image.bitmap.data[idx+1] = 0; // G
        image.bitmap.data[idx+2] = 0; // B
        
        const neighbors = [[x+1,y], [x-1,y], [x,y+1], [x,y-1]];
        for (let [nx, ny] of neighbors) {
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const nIdx = nx + ny * width;
            if (visited[nIdx] === 0) {
              visited[nIdx] = 1;
              const px = getPixel(nx, ny);
              const dist = Math.sqrt(Math.pow(px[0]-bg[0],2) + Math.pow(px[1]-bg[1],2) + Math.pow(px[2]-bg[2],2));
              if (dist < limit && px[3] > 10) {
                 queue.push([nx, ny]);
              } else if (dist < limit + 30) {
                 // edge smoothing/anti-aliasing bleed
                 const nIdx2 = (width * ny + nx) << 2;
                 image.bitmap.data[nIdx2] = 0;
                 image.bitmap.data[nIdx2+1] = 0;
                 image.bitmap.data[nIdx2+2] = 0;
              }
            }
          }
        }
      }
      
      if (image.writeAsync) await image.writeAsync(imgPath);
      else image.write(imgPath);
      
      console.log(`Saved ${file}`);
    } catch(err) { console.error(err); }
  }
}
processImages();
