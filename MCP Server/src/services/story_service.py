import json
import logging
from config.settings import settings
from models.schemas import StoryRequest, StoryResponse, Scene
from .ai_utils import call_ai_model

logger = logging.getLogger(__name__)

class StoryService:
    def __init__(self):
        self.story_generator_prompt = """You are an expert AI Video Story Generator specializing in creating comprehensive video story structures. Your primary goal is to analyze user input and generate a complete video story with proper JSON formatting.

 **Core Operating Principles:**
 1. **Story Analysis**: Analyze the user's topic, character list, and content description to create a compelling 60-second video story
 2. **Scene Breakdown**: Break down the story into 5-second scenes (approximately 12 scenes for 60 seconds)
 3. **Hook Introduction**: The very first scene (scene 1) must include a strong "hook"—an intriguing, surprising, or emotionally engaging element designed to immediately capture the viewer's attention and make them want to keep watching. The hook should be visually striking, mysterious, or raise a compelling question related to the story.
 4. **Character Integration**: Ensure all provided characters are properly integrated into the story
 5. **Narrative Flow**: Create a coherent story with clear beginning, middle, and end
 6. **Hashtag & Tag Generation**: Create hashtags and tags that are highly relevant to the story being generated. These hashtags and tags must be top trending keywords on YouTube, directly related to the story's content, characters, themes, and genre. Do not use generic or unrelated tags—only select keywords that are both relevant and popular on YouTube for maximum reach and discoverability.
 7. **JSON Output**: Return only valid JSON format

 **Output Format:**
 {
   "title": "Compelling video title",
   "description": "Brief video description with relevant hashtags",
   "hashtags": ["top trending, story-relevant hashtag1", "top trending, story-relevant hashtag2", "top trending, story-relevant hashtag3"],
   "tags": ["top trending, story-relevant tag1", "top trending, story-relevant tag2", "top trending, story-relevant tag3"],
   "hook": "A strong hook to immediately grab the viewer's attention"
   "scenes": [
     {
       "scene_number": 1,
       "duration": "0-5s",
       "description": "Detailed scene description including background, character actions, and story progression. The first scene must contain a strong hook to immediately grab the viewer's attention.",
       "characters": ["character1", "character2"],
       "setting": "Scene setting description",
       "action": "What characters are doing in this scene",
     }
   ]
 }

 **Requirements:**
 - The first scene must always include a strong hook to attract viewers from the very beginning.
 - Each scene should be 5 seconds long
 - Total video should be approximately 60 seconds (12 scenes)
 - Scenes must be connected and tell a complete story
 - Character descriptions should be consistent throughout
 - Include environmental details and character interactions
 - Focus on visual storytelling and emotional engagement
 - All hashtags and tags must be top trending YouTube keywords directly related to the story content, characters, and genre. Do not invent unrelated or generic tags."""

    async def generate_story(self, request: StoryRequest):
        provider = getattr(request, "provider", None) or "openai"
        model = getattr(request, "model", None)
        prompt = (
            f"Hãy tạo một cấu trúc câu chuyện video hoàn chỉnh dài {request.videoDuration} giây dựa trên các thông tin sau:\n\n"
            f"Idea: {request.idea}\n"
            f"Characters: {request.characterDescription}\n"
            f"Style: {request.style}\n\n"
            "Yêu cầu:\n"
            f"- Câu chuyện có độ dài khoảng {request.videoDuration} giây (gồm {request.numberOfScenes} cảnh, mỗi cảnh 5 giây)\n"
            "- Tích hợp tự nhiên tất cả các nhân vật đã cho\n"
            "- Có mở đầu, phát triển và kết thúc rõ ràng\n"
            "- Tập trung vào kể chuyện bằng hình ảnh và tạo cảm xúc cho người xem\n"
            "- Mô tả ngắn gọn, súc tích để tiết kiệm số lượng token\n\n"
            "Trả về kết quả đúng định dạng JSON như đã chỉ định trong system prompt."
        )
        parsed = await call_ai_model(
            user_message=prompt,
            system_prompt=self.story_generator_prompt,
            provider=provider,
            model=model
        )
        if self._validate_story(parsed):
            scenes = [Scene(**scene_data) for scene_data in parsed.get('scenes', [])]
            story_response = StoryResponse(
                title=parsed.get('title', ''),
                description=parsed.get('description', ''),
                hashtags=parsed.get('hashtags', []),
                tags=parsed.get('tags', []),
                hook=parsed.get('hook', ''),
                scenes=scenes
            )
            logger.info(f"Generated story with {len(scenes)} scenes")
            return story_response
        else:
            raise ValueError("Invalid story structure")

    def _validate_story(self, story):
        required_fields = ['title', 'description', 'hashtags', 'tags', 'hook', 'scenes']
        for field in required_fields:
            if field not in story:
                logger.warning(f"Missing required field: {field}")
                return False
        if not isinstance(story['scenes'], list) or len(story['scenes']) == 0:
            logger.warning("Invalid scenes field")
            return False
        for scene in story['scenes']:
            if not self._validate_scene(scene):
                return False
        return True

    def _validate_scene(self, scene):
        required_fields = ['scene_number', 'duration', 'description', 'characters', 'setting', 'action']
        for field in required_fields:
            if field not in scene:
                logger.warning(f"Missing required scene field: {field}")
                return False
        if not isinstance(scene['characters'], list):
            logger.warning("Invalid characters field in scene")
            return False
        return True 