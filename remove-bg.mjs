import { Jimp } from "jimp";
import fs from "fs";
import path from "path";

const files = ["lol.png", "Val.jpg", "ml.png", "cf.png", "ros.png", "bl.png"];
const dir = "f:/GabPort/public";

async function processImage(filename) {
  const filepath = path.join(dir, filename);
  if (!fs.existsSync(filepath)) {
    console.log("Not found:", filepath);
    return;
  }
  try {
    const image = await Jimp.read(filepath);
    
    // In Jimp 1.x, we access image.bitmap directly
    const width = typeof image.bitmap === "object" ? image.bitmap.width : (typeof image.getWidth === 'function' ? image.getWidth() : image.bitmap.width);
    const height = typeof image.bitmap === "object" ? image.bitmap.height : (typeof image.getHeight === 'function' ? image.getHeight() : image.bitmap.height);
    
    // Sample a few pixels from corners to determine the dominant background color
    const c1 = typeof image.getPixelColor === 'function' ? image.getPixelColor(1, 1) : 0;
    
    // Depending on jimp version API (Jimp 0.x vs 1.x vs 2.x), getPixelColor or getPixelColor()
    let bgCol;
    if (typeof image.getPixelColor === 'function') {
      bgCol = image.getPixelColor(0, 0);
    } else {
      bgCol = image.bitmap.data[0] << 24 | image.bitmap.data[1] << 16 | image.bitmap.data[2] << 8 | image.bitmap.data[3];
    }

    const { r: bgR, g: bgG, b: bgB } = Jimp.intToRGBA ? Jimp.intToRGBA(bgCol) : { r: (bgCol >> 24) & 255, g: (bgCol >> 16) & 255, b: (bgCol >> 8) & 255 };

    const distanceLimit = 35; // Tolerance

    if (image.scan) {
      image.scan(0, 0, width, height, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        
        const dist = Math.sqrt(
          Math.pow(r - bgR, 2) + Math.pow(g - bgG, 2) + Math.pow(b - bgB, 2)
        );

        if (dist < distanceLimit) {
          this.bitmap.data[idx + 3] = 0; // Transparent
        }
      });
    }

    // Save as same file extension but PNG to keep transparency if it was JPG
    const ext = path.extname(filename);
    let outName = filename;
    if (ext.toLowerCase() === '.jpg' || ext.toLowerCase() === '.jpeg') {
        outName = filename.replace(ext, '.png');
    }
    const outPath = path.join(dir, outName);
    
    if (image.writeAsync) {
      await image.writeAsync(outPath);
    } else {
       image.write(outPath);
    }
    console.log("Processed:", filename, "saved as", outName);
  } catch (err) {
    console.error("Error processing", filename, err);
  }
}

async function main() {
  for (const f of files) {
    await processImage(f);
  }
}

main();
