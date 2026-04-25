import { Jimp, intToRGBA, rgbaToInt } from 'jimp';
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
      
      const width = typeof image.bitmap === "object" ? image.bitmap.width : (typeof image.getWidth === 'function' ? image.getWidth() : image.bitmap.width);
      const height = typeof image.bitmap === "object" ? image.bitmap.height : (typeof image.getHeight === 'function' ? image.getHeight() : image.bitmap.height);
      
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (width * y + x) << 2;
          const r = image.bitmap.data[idx];
          const g = image.bitmap.data[idx + 1];
          const b = image.bitmap.data[idx + 2];
          const a = image.bitmap.data[idx + 3];

          if (a === 0) continue; // Skip strictly transparent pixels
          
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          
          // If the pixel is mostly grayscale (low saturation) AND is relatively bright
          if (max - min < 35 && max > 100) {
             // Inverting the lightness gives us a remarkably clean anti-aliased dark mode
             const newLum = 255 - max; 
             image.bitmap.data[idx] = newLum;
             image.bitmap.data[idx + 1] = newLum;
             image.bitmap.data[idx + 2] = newLum;
          } 
          // What if it's very bright white but has slight red tint?
          else if (r > 200 && g > 200 && b > 200) {
             // Hard inversion for very bright pixels to be safe
             image.bitmap.data[idx] = 255 - r;
             image.bitmap.data[idx + 1] = 255 - g;
             image.bitmap.data[idx + 2] = 255 - b;
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
