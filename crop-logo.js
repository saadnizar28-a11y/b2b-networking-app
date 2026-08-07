const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const inputPath = path.join(__dirname, 'public', 'bcc-mockup-reference.png');
const outputPath = path.join(__dirname, 'public', 'bcc-logo.png');

fs.createReadStream(inputPath)
  .pipe(new PNG())
  .on('parsed', function() {
    console.log(`Dimensions: ${this.width}x${this.height}`);
    
    // Find bounding box for logo near top (y between 5% and 25%)
    let minX = this.width, maxX = 0, minY = this.height, maxY = 0;
    
    const yStart = Math.floor(this.height * 0.05);
    const yEnd = Math.floor(this.height * 0.22);
    
    for (let y = yStart; y < yEnd; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        
        // Non-black pixels (brightness > 30)
        if (r > 30 || g > 30 || b > 30) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    
    console.log(`Logo bounds: X[${minX}, ${maxX}] Y[${minY}, ${maxY}]`);
    
    // Add small padding around bounds
    const padding = 16;
    minX = Math.max(0, minX - padding);
    maxX = Math.min(this.width - 1, maxX + padding);
    minY = Math.max(0, minY - padding);
    maxY = Math.min(this.height - 1, maxY + padding);
    
    const cropW = maxX - minX + 1;
    const cropH = maxY - minY + 1;
    
    const cropped = new PNG({ width: cropW, height: cropH });
    
    for (let y = 0; y < cropH; y++) {
      for (let x = 0; x < cropW; x++) {
        const srcX = minX + x;
        const srcY = minY + y;
        const srcIdx = (this.width * srcY + srcX) << 2;
        const dstIdx = (cropW * y + x) << 2;
        
        const r = this.data[srcIdx];
        const g = this.data[srcIdx + 1];
        const b = this.data[srcIdx + 2];
        const a = this.data[srcIdx + 3];
        
        cropped.data[dstIdx] = r;
        cropped.data[dstIdx + 1] = g;
        cropped.data[dstIdx + 2] = b;
        
        // If pixel is close to dark background (#0B0B0D), make it transparent
        if (r < 25 && g < 25 && b < 25) {
          cropped.data[dstIdx + 3] = 0;
        } else {
          cropped.data[dstIdx + 3] = a;
        }
      }
    }
    
    cropped.pack().pipe(fs.createWriteStream(outputPath)).on('finish', () => {
      console.log(`Saved cropped logo to ${outputPath} (${cropW}x${cropH})`);
    });
  });
