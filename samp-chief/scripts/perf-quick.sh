#!/bin/bash

# Quick performance check alias
echo "🔍 Running quick performance check..."
./scripts/check-performance.sh | grep -E "(LARGE|WARNING|SUMMARY|Total)" | head -20

echo ""
echo "💡 For full report, run: yarn check-performance"