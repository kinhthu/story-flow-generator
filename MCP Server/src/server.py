import asyncio
import json
import logging
from typing import Any, Dict, List
from mcp.server import Server
from mcp.server.stdio import stdio_server
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from mcp_types import TextContent, Tool, ToolResult

from config.settings import settings
from services import IdeaService, StoryService, SceneService
from models.schemas import (
    IdeaRequest, StoryRequest, SceneRequest
)

logging.basicConfig(
    level=getattr(logging, settings.log_level),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class StoryFlowMCPServer:
    def __init__(self):
        self.server = Server("story-flow-mcp")
        self.idea_service = IdeaService()
        self.story_service = StoryService()
        self.scene_service = SceneService()
        self._register_tools()

    def _register_tools(self):
        @self.server.list_tools()
        async def handle_list_tools() -> List[Tool]:
            return [
                Tool(
                    name="generate_ideas",
                    description="Generate story ideas based on topic and characters",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "topic": {"type": "string"},
                            "characters": {"type": "array", "items": {"type": "string"}},
                            "numberOfIdeas": {"type": "integer", "default": 10},
                            "duration": {"type": "integer", "default": 30},
                            "sceneTime": {"type": "integer", "default": 5}
                        },
                        "required": ["topic", "characters"]
                    }
                ),
                Tool(
                    name="generate_story",
                    description="Generate complete story structure from an idea",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "videoDuration": {"type": "integer"},
                            "numberOfScenes": {"type": "integer"},
                            "characterDescription": {"type": "string"},
                            "style": {"type": "string"},
                            "idea": {"type": "string"}
                        },
                        "required": ["videoDuration", "numberOfScenes", "characterDescription", "style", "idea"]
                    }
                ),
                Tool(
                    name="generate_scene",
                    description="Generate detailed prompts for a specific scene",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "sceneDescription": {"type": "string"},
                            "characterDescription": {"type": "string"},
                            "style": {"type": "string"},
                            "feelings": {"type": "string"},
                            "setting": {"type": "string"},
                            "action": {"type": "string"}
                        },
                        "required": ["sceneDescription", "characterDescription", "style", "feelings", "setting", "action"]
                    }
                )
            ]

        @self.server.call_tool()
        async def handle_call_tool(name: str, arguments: Dict[str, Any]) -> List[ToolResult]:
            try:
                logger.info(f"Tool call: {name} with arguments: {arguments}")
                if name == "generate_ideas":
                    return await self._handle_generate_ideas(arguments)
                elif name == "generate_story":
                    return await self._handle_generate_story(arguments)
                elif name == "generate_scene":
                    return await self._handle_generate_scene(arguments)
                else:
                    raise ValueError(f"Unknown tool: {name}")
            except Exception as e:
                logger.error(f"Error in tool call {name}: {e}")
                return [
                    ToolResult(
                        content=[TextContent(type="text", text=f"Error: {str(e)}")],
                        isError=True
                    )
                ]

    async def _handle_generate_ideas(self, arguments: Dict[str, Any]) -> List[ToolResult]:
        try:
            request = IdeaRequest(**arguments)
            ideas = await self.idea_service.generate_ideas(request)
            ideas_json = [idea.dict() for idea in ideas]
            result_text = json.dumps(ideas_json, ensure_ascii=False, indent=2)
            return [ToolResult(content=[TextContent(type="text", text=result_text)])]
        except Exception as e:
            logger.error(f"Error generating ideas: {e}")
            raise

    async def _handle_generate_story(self, arguments: Dict[str, Any]) -> List[ToolResult]:
        try:
            request = StoryRequest(**arguments)
            story = await self.story_service.generate_story(request)
            story_dict = story.dict()
            story_dict['scenes'] = [scene.dict() for scene in story.scenes]
            result_text = json.dumps(story_dict, ensure_ascii=False, indent=2)
            return [ToolResult(content=[TextContent(type="text", text=result_text)])]
        except Exception as e:
            logger.error(f"Error generating story: {e}")
            raise

    async def _handle_generate_scene(self, arguments: Dict[str, Any]) -> List[ToolResult]:
        try:
            request = SceneRequest(**arguments)
            scene = await self.scene_service.generate_scene(request)
            result_text = json.dumps(scene.dict(), ensure_ascii=False, indent=2)
            return [ToolResult(content=[TextContent(type="text", text=result_text)])]
        except Exception as e:
            logger.error(f"Error generating scene: {e}")
            raise

    async def run(self):
        logger.info("Starting Story Flow MCP Server...")
        async with stdio_server() as (read_stream, write_stream):
            await self.server.run(
                read_stream,
                write_stream,
            )
        logger.info("MCP Server stopped")

async def main():
    server = StoryFlowMCPServer()
    await server.run()

if __name__ == "__main__":
    asyncio.run(main()) 