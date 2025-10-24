#!/bin/bash

# Image Optimization Script for Sample Chief
# This script compresses large images while maintaining quality

echo "🖼️  Starting image optimization..."

# Function to compress images
compress_image() {
    local input="$1"
    local output="$2"
    local quality="$3"
    
    if command -v convert &> /dev/null; then
        # Using ImageMagick
        convert "$input" -quality "$quality" -strip "$output"
        echo "✅ Compressed: $input -> $output"
    elif command -v magick &> /dev/null; then
        # Using ImageMagick 7+
        magick "$input" -quality "$quality" -strip "$output"
        echo "✅ Compressed: $input -> $output"
    else
        echo "❌ ImageMagick not found. Please install: brew install imagemagick"
        exit 1
    fi
}

# Navigate to project assets
cd "$(dirname "$0")/../public/assets/projects"

echo "📂 Current directory: $(pwd)"

# Find and compress large images (>2MB)
echo "🔍 Finding images larger than 2MB..."

find . -name "*.jpg" -o -name "*.jpeg" -o -name "*.JPG" | while read -r file; do
    size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
    size_mb=$((size / 1024 / 1024))
    
    if [ "$size_mb" -gt 2 ]; then
        echo "📏 Found large file: $file (${size_mb}MB)"
        
        # Create backup
        backup="${file}.backup"
        if [ ! -f "$backup" ]; then
            cp "$file" "$backup"
            echo "💾 Created backup: $backup"
        fi
        
        # Compress with 75% quality
        compress_image "$file" "$file" 75
        
        # Check new size
        new_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        new_size_mb=$((new_size / 1024 / 1024))
        
        echo "📊 Reduced from ${size_mb}MB to ${new_size_mb}MB"
    fi
done

echo "🎉 Image optimization complete!"
echo "💡 To restore originals: find . -name '*.backup' -exec sh -c 'cp \"$1\" \"${1%.backup}\"' _ {} \;"