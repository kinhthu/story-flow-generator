#!/usr/bin/env python3
"""
Story Flow MCP Server - Simple Runner
"""
import os
import sys
from pathlib import Path

# Add src to path
src_path = Path(__file__).parent / "src"
sys.path.insert(0, str(src_path))

# Import after adding to path
from rest_server import app
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi import Request

# Mount static files (React build)
frontend_dist = Path(__file__).parent.parent / "Client" / "dist"
if frontend_dist.exists():
    app.mount("/static", StaticFiles(directory=str(frontend_dist / "assets")), name="static")

    @app.get("/")
    def serve_index():
        return FileResponse(str(frontend_dist / "index.html"))

    # Fallback cho mọi route không phải API (SPA)
    @app.middleware("http")
    async def spa_fallback(request: Request, call_next):
        if (request.url.path.startswith("/api") or 
            request.url.path.startswith("/static") or 
            request.url.path.startswith("/docs") or 
            request.url.path.startswith("/openapi") or
            request.url.path.startswith("/health")):  # Dùng startswith thay vì ==
            return await call_next(request)
        if request.url.path == "/":
            return await call_next(request)
        # fallback cho route SPA
        file_path = frontend_dist / request.url.path.lstrip("/")
        if file_path.exists():
            return FileResponse(str(file_path))
        return FileResponse(str(frontend_dist / "index.html"))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 