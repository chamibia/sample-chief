#!/usr/bin/env node

const sharp = require('sharp');
const glob = require('glob');
const fs = require('fs').promises;
const path = require('path');

class ImageOptimizer {
  constructor() {
    this.publicDir = path.join(process.cwd(), 'public');
    this.backupDir = path.join(this.publicDir, 'original-backups');
    this.totalOriginalSize = 0;
    this.totalOptimizedSize = 0;
    this.processedCount = 0;
    this.skippedCount = 0;
    this.errorCount = 0;
  }

  // Create progress bar
  createProgressBar(current, total, barLength = 40) {
    const percentage = Math.round((current / total) * 100);
    const filledLength = Math.round((barLength * current) / total);
    const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
    return `\r[${ bar }] ${ percentage }% (${ current }/${ total })`;
  }

  // Format file size
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  // Get file stats
  async getFileSize(filePath) {
    try {
      const stats = await fs.stat(filePath);
      return stats.size;
    } catch (error) {
      return 0;
    }
  }

  // Create backup directory
  async ensureBackupDir() {
    try {
      await fs.access(this.backupDir);
    } catch {
      await fs.mkdir(this.backupDir, { recursive: true });
      console.log(`✓ Created backup directory: ${this.backupDir}`);
    }
  }

  // Create backup of original file
  async createBackup(originalPath) {
    const relativePath = path.relative(this.publicDir, originalPath);
    const backupPath = path.join(this.backupDir, relativePath);
    
    // Ensure backup subdirectory exists
    const backupSubdir = path.dirname(backupPath);
    await fs.mkdir(backupSubdir, { recursive: true });
    
    await fs.copyFile(originalPath, backupPath);
    return backupPath;
  }

  // Optimize single image
  async optimizeImage(imagePath) {
    try {
      const ext = path.extname(imagePath).toLowerCase();
      const originalSize = await this.getFileSize(imagePath);
      
      if (originalSize === 0) {
        throw new Error('File not found or empty');
      }

      // Create backup
      const backupPath = await this.createBackup(imagePath);
      
      let sharpInstance = sharp(imagePath);
      
      // Apply optimization based on file type
      if (ext === '.jpg' || ext === '.jpeg') {
        sharpInstance = sharpInstance.jpeg({ 
          quality: 85,
          progressive: true,
          mozjpeg: true 
        });
      } else if (ext === '.png') {
        sharpInstance = sharpInstance.png({ 
          compressionLevel: 9,
          progressive: true 
        });
      } else {
        throw new Error(`Unsupported file type: ${ext}`);
      }

      // Process and save optimized image
      await sharpInstance.toFile(imagePath + '.tmp');
      await fs.rename(imagePath + '.tmp', imagePath);
      
      const optimizedSize = await this.getFileSize(imagePath);
      const savings = originalSize - optimizedSize;
      const savingsPercent = ((savings / originalSize) * 100).toFixed(1);
      
      this.totalOriginalSize += originalSize;
      this.totalOptimizedSize += optimizedSize;
      this.processedCount++;

      return {
        path: imagePath,
        originalSize,
        optimizedSize,
        savings,
        savingsPercent,
        backupPath
      };
    } catch (error) {
      this.errorCount++;
      throw error;
    }
  }

  // Find all images in public directory
  async findImages() {
    const patterns = [
      path.join(this.publicDir, '**/*.jpg'),
      path.join(this.publicDir, '**/*.jpeg'),
      path.join(this.publicDir, '**/*.png')
    ];

    let allImages = [];
    for (const pattern of patterns) {
      const files = await glob.glob(pattern, {
        ignore: [
          path.join(this.backupDir, '**/*'),
          '**/node_modules/**',
          '**/.next/**'
        ]
      });
      allImages = allImages.concat(files);
    }
    
    return [...new Set(allImages)]; // Remove duplicates
  }

  // Main optimization process
  async optimize() {
    console.log('🖼️  Starting image optimization...\n');
    
    try {
      await this.ensureBackupDir();
      
      const images = await this.findImages();
      
      if (images.length === 0) {
        console.log('📭 No images found to optimize.');
        return;
      }
      
      console.log(`📁 Found ${images.length} image(s) to optimize\n`);
      
      // Process images
      for (let i = 0; i < images.length; i++) {
        const imagePath = images[i];
        const relativePath = path.relative(this.publicDir, imagePath);
        
        process.stdout.write(this.createProgressBar(i, images.length) + ` Processing: ${relativePath}`);
        
        try {
          const result = await this.optimizeImage(imagePath);
          
          // Clear progress line and show result
          process.stdout.write('\r' + ' '.repeat(120) + '\r');
          
          if (result.savings > 0) {
            console.log(`✓ ${relativePath}`);
            console.log(`  ${this.formatBytes(result.originalSize)} → ${this.formatBytes(result.optimizedSize)} (${result.savingsPercent}% reduction)`);
          } else {
            console.log(`→ ${relativePath} (no size reduction)`);
            this.skippedCount++;
          }
          
        } catch (error) {
          process.stdout.write('\r' + ' '.repeat(120) + '\r');
          console.log(`✗ ${relativePath} - Error: ${error.message}`);
        }
      }
      
      // Final progress bar
      process.stdout.write(this.createProgressBar(images.length, images.length) + ' Complete!\n\n');
      
      // Summary
      this.printSummary();
      
    } catch (error) {
      console.error('❌ Optimization failed:', error.message);
      process.exit(1);
    }
  }

  // Print optimization summary
  printSummary() {
    const totalSavings = this.totalOriginalSize - this.totalOptimizedSize;
    const totalSavingsPercent = this.totalOriginalSize > 0 
      ? ((totalSavings / this.totalOriginalSize) * 100).toFixed(1)
      : 0;

    console.log('📊 Optimization Summary:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📸 Images processed: ${this.processedCount}`);
    console.log(`⏭️  Images skipped: ${this.skippedCount}`);
    console.log(`❌ Errors: ${this.errorCount}`);
    console.log(`📦 Original size: ${this.formatBytes(this.totalOriginalSize)}`);
    console.log(`🗜️  Optimized size: ${this.formatBytes(this.totalOptimizedSize)}`);
    console.log(`💾 Total savings: ${this.formatBytes(totalSavings)} (${totalSavingsPercent}%)`);
    console.log(`🗂️  Backups saved to: ${path.relative(process.cwd(), this.backupDir)}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    if (this.processedCount > 0) {
      console.log('✅ Image optimization complete!');
    } else {
      console.log('ℹ️  No images were optimized.');
    }
  }
}

// Run optimization if script is executed directly
if (require.main === module) {
  const optimizer = new ImageOptimizer();
  optimizer.optimize().catch(error => {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  });
}

module.exports = ImageOptimizer;