#!/bin/bash
# Build script for Story Flow MCP Server

echo "🚀 Building Story Flow MCP Server..."

# Build React client
echo "📦 Building React client..."
cd ../Client
npm install
npm run build
cd ../MCP\ Server

# Install Python dependencies
echo "🐍 Installing Python dependencies..."
pip install -r requirements.txt

echo "✅ Build completed!"
echo "To run locally: python run.py"
echo "To deploy: push to git and deploy with Procfile" 