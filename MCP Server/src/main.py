#!/usr/bin/env python3
"""
Story Flow MCP Server - Main Entry Point
"""
import asyncio
import logging
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from rest_server import app
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from fastapi import Request

# Mount static files (React build)
frontend_dist = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../Client/dist'))
app.mount("/static", StaticFiles(directory=os.path.join(frontend_dist, 'assets')), name="static")

@app.get("/")
def serve_index():
    return FileResponse(os.path.join(frontend_dist, "index.html"))

# Fallback cho mọi route không phải API (SPA)
@app.middleware("http")
async def spa_fallback(request: Request, call_next):
    if request.url.path.startswith("/api") or request.url.path.startswith("/static") or request.url.path.startswith("/docs") or request.url.path.startswith("/openapi"):
        return await call_next(request)
    if request.url.path == "/":
        return await call_next(request)
    # fallback cho route SPA
    if os.path.exists(os.path.join(frontend_dist, request.url.path.lstrip("/"))):
        return FileResponse(os.path.join(frontend_dist, request.url.path.lstrip("/")))
    return FileResponse(os.path.join(frontend_dist, "index.html"))

if __name__ == "__main__":
    try:
        import uvicorn
        uvicorn.run(app, host="0.0.0.0", port=8000)
    except KeyboardInterrupt:
        logging.info("Server stopped by user")
    except Exception as e:
        logging.error(f"Server error: {e}")
        sys.exit(1) 