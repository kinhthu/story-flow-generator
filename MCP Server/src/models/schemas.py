from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class Character(BaseModel):
    label: str
    value: Optional[str] = None

class Scene(BaseModel):
    scene_number: int
    duration: str
    description: str
    characters: List[str]
    setting: str
    action: str

class IdeaRequest(BaseModel):
    topic: str
    characters: List[str]
    numberOfIdeas: int = 10
    duration: int = 30
    sceneTime: int = 5
    provider: Optional[str] = "openai"
    model: Optional[str] = None

class IdeaResponse(BaseModel):
    idea: str
    characters: List[str]
    scene_number: int
    feelings: str
    styles: str

class StoryRequest(BaseModel):
    videoDuration: int
    numberOfScenes: int
    characterDescription: str
    style: str
    idea: str
    provider: Optional[str] = "openai"
    model: Optional[str] = None

class StoryResponse(BaseModel):
    title: str
    description: str
    hashtags: List[str]
    tags: List[str]
    hook: str
    scenes: List[Scene]

class SceneRequest(BaseModel):
    sceneDescription: str
    characterDescription: str
    style: str
    feelings: str
    setting: str
    action: str
    provider: Optional[str] = "openai"
    model: Optional[str] = None

class SceneResponse(BaseModel):
    image_prompt: str
    video_prompt: str
    master_key_frame: str 

class BatchStoryRequest(BaseModel):
    stories: List[StoryRequest]

class BatchStoryResponse(BaseModel):
    stories: List[StoryResponse]

class BatchSceneRequest(BaseModel):
    scenes: List[SceneRequest]

class BatchSceneResponse(BaseModel):
    scenes: List[SceneResponse] 