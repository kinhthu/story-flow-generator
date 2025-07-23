import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import asyncio
from fastapi.responses import JSONResponse

from config.settings import settings
from services import IdeaService, StoryService, SceneService
from models.schemas import (
    IdeaRequest, StoryRequest, SceneRequest,
    IdeaResponse, StoryResponse, SceneResponse,
    BatchStoryRequest, BatchStoryResponse,
    BatchSceneRequest, BatchSceneResponse
)

logging.basicConfig(
    level=getattr(logging, settings.log_level),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Story Flow MCP Server",
    description="REST API for Story Flow Generator",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

idea_service = IdeaService()
story_service = StoryService()
scene_service = SceneService()

@app.get("/api")
async def root():
    return {
        "message": "Story Flow MCP Server",
        "version": "1.0.0",
        "endpoints": {
            "ideas": "/api/ideas",
            "stories": "/api/stories",
            "scenes": "/api/scenes"
        }
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "Story Flow MCP Server is running"}

@app.post("/api/ideas", response_model=list[IdeaResponse])
async def generate_ideas(request: IdeaRequest):
    try:
        logger.info(f"REST API: Generating ideas for topic: {request.topic}")
        ideas = await idea_service.generate_ideas(request)
        return ideas
    except Exception as e:
        logger.error(f"Error generating ideas: {e}")
        return JSONResponse(status_code=500, content={"error": "generate_ideas_failed", "detail": str(e)})

@app.post("/api/stories", response_model=StoryResponse)
async def generate_story(request: StoryRequest):
    try:
        logger.info(f"REST API: Generating story for idea: {request.idea[:50]}...")
        story = await story_service.generate_story(request)
        return story
    except Exception as e:
        logger.error(f"Error generating story: {e}")
        return JSONResponse(status_code=500, content={"error": "generate_story_failed", "detail": str(e)})

@app.post("/api/scenes", response_model=SceneResponse)
async def generate_scene(request: SceneRequest):
    try:
        logger.info(f"REST API: Generating scene for: {request.sceneDescription[:50]}...")
        scene = await scene_service.generate_scene(request)
        return scene
    except Exception as e:
        logger.error(f"Error generating scene: {e}")
        return JSONResponse(status_code=500, content={"error": "generate_scene_failed", "detail": str(e)})

@app.post("/api/stories/batch", response_model=BatchStoryResponse)
async def generate_stories_batch(request: BatchStoryRequest):
    try:
        results = await asyncio.gather(
            *[story_service.generate_story(story) for story in request.stories]
        )
        return BatchStoryResponse(stories=results)
    except Exception as e:
        logger.error(f"Error generating batch stories: {e}")
        return JSONResponse(status_code=500, content={"error": "generate_stories_batch_failed", "detail": str(e)})

@app.post("/api/scenes/batch", response_model=BatchSceneResponse)
async def generate_scenes_batch(request: BatchSceneRequest):
    try:
        results = await asyncio.gather(
            *[scene_service.generate_scene(scene) for scene in request.scenes]
        )
        return BatchSceneResponse(scenes=results)
    except Exception as e:
        logger.error(f"Error generating batch scenes: {e}")
        return JSONResponse(status_code=500, content={"error": "generate_scenes_batch_failed", "detail": str(e)})

def run_rest_server():
    logger.info("Starting Story Flow REST API Server...")
    uvicorn.run(
        "rest_server:app",
        host=settings.mcp_server_host,
        port=settings.mcp_server_port,
        reload=settings.environment == "development",
        log_level=settings.log_level.lower()
    )

if __name__ == "__main__":
    run_rest_server() 