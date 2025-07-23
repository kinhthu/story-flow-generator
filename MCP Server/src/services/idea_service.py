import json
import logging
from openai import OpenAI
import google.generativeai as genai
from config.settings import settings
from models.schemas import IdeaRequest, IdeaResponse
from .ai_utils import call_ai_model

logger = logging.getLogger(__name__)

class IdeaService:
    def __init__(self):
        self.idea_generator_prompt = """Bạn là AI chuyên tạo ý tưởng truyện độc đáo, ngắn gọn dựa trên topic được cung cấp. Chỉ cần liệt kê các ý tưởng ngắn, mỗi ý là một từ hoặc cụm từ ngắn (không cần câu hoàn chỉnh), tập trung vào các hành động, tình huống, hình ảnh, sự kiện, tương tác thú vị, bất ngờ, hài hước hoặc sáng tạo liên quan đến chủ đề. Không cần viết thành truyện, không cần mô tả dài dòng, không cần giải thích. Các ý tưởng này sẽ được dùng để tạo thành câu chuyện ở bước sau.

Yêu cầu:
- Ý tưởng càng độc đáo, bất ngờ, vui nhộn càng tốt.
- Chỉ cần liệt kê các ý tưởng ngắn, không cần câu hoàn chỉnh.
- Không cần sắp xếp theo trình tự truyện, chỉ cần tập trung vào ý tưởng nổi bật liên quan đến topic.
- Không đưa ra ý tưởng trừu tượng, cảm xúc nội tâm, chỉ tập trung vào những gì có thể minh họa bằng hình ảnh.
- Viết bằng tiếng Việt.
- Với mỗi ý tưởng, hãy đề xuất style video phù hợp với thể loại truyện (ví dụ: anime, cartoon, cinematic, comic book, 3D render, v.v) để dùng làm style tạo ảnh minh họa cho truyện đó.

Định dạng đầu ra: Luôn trả về một mảng JSON với cấu trúc sau:
{ideas: [
  {
    "idea": "Danh sách các ý tưởng/hành động chính của truyện (liệt kê các ý liên tiếp nhau, càng nhiều ý càng tốt, mỗi ý nên ngắn gọn, sáng tạo, hài hước, tập trung vào hành động, biểu cảm, hoạt động cụ thể)",
    "characters": ["tên nhân vật 1", "tên nhân vật 2"],
    "scene_number": "số cảnh của truyện",
    "feelings": "các từ khóa biểu cảm trong truyện",
    "styles": "Các từ khóa mô tả phong cách để tạo hình ảnh, phải phù hợp với thể loại truyện (ví dụ: anime, film, art, photorealistic, cartoon, oil painting, watercolor, digital art, sketch, 3D render, cinematic, vintage, minimalist, abstract, pixel art, comic book, v.v)"
  }
]
}

Lưu ý: Chỉ trả về JSON, không kèm thêm bất kỳ văn bản nào khác."""

    async def generate_ideas(self, request: IdeaRequest):
        provider = request.provider or "openai"
        model = request.model
        user_message = (
            f"Topic: {request.topic}\n"
            f"Characters: {', '.join(request.characters)}\n\n"
            f"Create {request.numberOfIdeas} different ideas, each using 1 to 3 characters from the list above and centered around the topic.\n"
            f"Each idea has {request.duration // request.sceneTime} scenes, each scene has {request.sceneTime} seconds."
        )
        
        parsed = await call_ai_model(
            user_message=user_message,
            system_prompt=self.idea_generator_prompt,
            provider=provider,
            model=model
        )
        ideas = parsed.get('ideas', []) if isinstance(parsed, dict) else parsed
        valid_ideas = []
        for idea in ideas:
            if self._validate_idea(idea):
                valid_ideas.append(IdeaResponse(**idea))
        logger.info(f"Generated {len(valid_ideas)} valid ideas ({provider})")
        return valid_ideas

    def _validate_idea(self, idea):
        required_fields = ['idea', 'characters', 'scene_number', 'feelings', 'styles']
        for field in required_fields:
            if field not in idea:
                logger.warning(f"Missing required field: {field}")
                return False
        if not isinstance(idea['idea'], str) or not idea['idea'].strip():
            logger.warning("Invalid idea field")
            return False
        if not isinstance(idea['characters'], list) or len(idea['characters']) == 0:
            logger.warning("Invalid characters field")
            return False
        return True 