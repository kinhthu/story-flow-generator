#!/usr/bin/env python3
"""
Entry point for Story Flow MCP REST Server
"""
import sys
import os
from pathlib import Path

# Add src directory to Python path
src_path = Path(__file__).parent / "src"
sys.path.insert(0, str(src_path))

# Now we can import from src modules
from rest_server import run_rest_server

if __name__ == "__main__":
    run_rest_server() 