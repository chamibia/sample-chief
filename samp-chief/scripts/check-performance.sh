#!/bin/bash

# Pre-push script to identify large files and performance issues
# Usage: ./scripts/check-performance.sh

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# File size limits (in MB)
IMAGE_LIMIT=2
VIDEO_LIMIT=20
WARNING_LIMIT=1

echo -e "${BLUE}🔍 Sample Chief Performance Check${NC}"
echo "=================================="

# Change to project root
cd "$(dirname "$0")/.."

# Function to convert bytes to MB
bytes_to_mb() {
    echo "scale=2; $1 / 1024 / 1024" | bc -l 2>/dev/null || echo "0"
}

# Function to get file size
get_file_size() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        stat -f%z "$1" 2>/dev/null || echo "0"
    else
        # Linux
        stat -c%s "$1" 2>/dev/null || echo "0"
    fi
}

# Initialize counters
large_images=0
large_videos=0
total_issues=0
total_size=0

echo -e "${BLUE}📸 Checking Images...${NC}"

# Check images in public/assets
if [ -d "public/assets" ]; then
    while IFS= read -r -d '' file; do
        if [ -f "$file" ]; then
            size_bytes=$(get_file_size "$file")
            size_mb=$(bytes_to_mb $size_bytes)
            total_size=$(echo "$total_size + $size_bytes" | bc -l 2>/dev/null || echo "$total_size")
            
            # Check if file is too large
            if (( $(echo "$size_mb > $IMAGE_LIMIT" | bc -l 2>/dev/null) )); then
                echo -e "${RED}❌ LARGE IMAGE: ${file} (${size_mb}MB) > ${IMAGE_LIMIT}MB limit${NC}"
                large_images=$((large_images + 1))
                total_issues=$((total_issues + 1))
            elif (( $(echo "$size_mb > $WARNING_LIMIT" | bc -l 2>/dev/null) )); then
                echo -e "${YELLOW}⚠️  WARNING: ${file} (${size_mb}MB) > ${WARNING_LIMIT}MB${NC}"
            else
                echo -e "${GREEN}✅ ${file} (${size_mb}MB)${NC}"
            fi
        fi
    done < <(find public/assets -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.JPG" -o -name "*.png" -o -name "*.PNG" -o -name "*.webp" \) -print0 2>/dev/null)
else
    echo -e "${YELLOW}⚠️  public/assets directory not found${NC}"
fi

echo ""
echo -e "${BLUE}🎥 Checking Videos...${NC}"

# Check videos
if [ -d "public/assets" ]; then
    while IFS= read -r -d '' file; do
        if [ -f "$file" ]; then
            size_bytes=$(get_file_size "$file")
            size_mb=$(bytes_to_mb $size_bytes)
            total_size=$(echo "$total_size + $size_bytes" | bc -l 2>/dev/null || echo "$total_size")
            
            # Check if video is too large
            if (( $(echo "$size_mb > $VIDEO_LIMIT" | bc -l 2>/dev/null) )); then
                echo -e "${RED}❌ LARGE VIDEO: ${file} (${size_mb}MB) > ${VIDEO_LIMIT}MB limit${NC}"
                large_videos=$((large_videos + 1))
                total_issues=$((total_issues + 1))
            else
                echo -e "${GREEN}✅ ${file} (${size_mb}MB)${NC}"
            fi
        fi
    done < <(find public/assets -type f \( -name "*.mp4" -o -name "*.mov" -o -name "*.MP4" -o -name "*.MOV" -o -name "*.webm" \) -print0 2>/dev/null)
else
    echo -e "${YELLOW}⚠️  No videos found or public/assets directory missing${NC}"
fi

# Calculate total size in MB
total_size_mb=$(bytes_to_mb $total_size)

echo ""
echo "=================================="
echo -e "${BLUE}📊 SUMMARY${NC}"
echo "=================================="
echo -e "Large Images (>${IMAGE_LIMIT}MB): ${large_images}"
echo -e "Large Videos (>${VIDEO_LIMIT}MB): ${large_videos}"
echo -e "Total Issues: ${total_issues}"
echo -e "Total Asset Size: ${total_size_mb}MB"

# Performance recommendations
if [ $total_issues -gt 0 ]; then
    echo ""
    echo -e "${RED}🚨 PERFORMANCE ISSUES FOUND${NC}"
    echo "=================================="
    echo -e "${YELLOW}Recommendations:${NC}"
    echo "1. Compress large images using: ./scripts/optimize-images.sh"
    echo "2. Use online tools like TinyPNG or Squoosh.app"
    echo "3. Consider WebP format for better compression"
    echo "4. For videos, use HandBrake or FFmpeg to compress"
    echo ""
    echo -e "${YELLOW}Quick fixes:${NC}"
    
    if [ $large_images -gt 0 ]; then
        echo "• Image compression: Use Photoshop 'Export for Web' at 60-75% quality"
        echo "• Target: <2MB per image"
    fi
    
    if [ $large_videos -gt 0 ]; then
        echo "• Video compression: Reduce resolution or bitrate"
        echo "• Target: <20MB per video"
    fi
    
    echo ""
    echo -e "${YELLOW}💡 RECOMMENDATION: Consider optimizing large files for better performance${NC}"
    echo -e "${BLUE}ℹ️  This is informational only - push will continue${NC}"
else
    echo -e "${GREEN}✅ All files are within size limits!${NC}"
    
    if (( $(echo "$total_size_mb > 50" | bc -l 2>/dev/null) )); then
        echo -e "${YELLOW}⚠️  Note: Total asset size is ${total_size_mb}MB. Consider optimizing for better performance.${NC}"
    fi
fi

echo ""
echo -e "${GREEN}✅ Performance check complete - proceeding with push${NC}"
exit 0