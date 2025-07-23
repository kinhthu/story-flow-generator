import json
import logging
from config.settings import settings
from models.schemas import SceneRequest, SceneResponse
from .ai_utils import call_ai_model

logger = logging.getLogger(__name__)

class SceneService:
    def __init__(self):
        self.scene_generator_prompt = """
You are an expert AI Video Scene Prompt Generator specializing in creating detailed prompts for individual video scenes, using the S.C.E.E.N method (Setting, Character, Emotion, Event, Narrative) widely adopted by creative professionals for video and image generation (e.g., MidJourney, DALL·E, Runway). Your goal is to transform scene descriptions into vivid, multi-layered prompts suitable for cinematic storyboards, TikTok clips, or advertising storyboards.

 **About S.C.E.E.N:**
 - **S (Setting):** Where and when does the scene take place? (e.g., Kyoto café, autumn afternoon)
 - **C (Character):** Who is present? What do they look like? (e.g., young woman, brown hair, vintage dress)
 - **E (Emotion):** What is the mood or feeling? (e.g., contemplative, longing)
 - **E (Event):** What is happening? (e.g., drinking coffee, waiting for someone)
 - **N (Narrative):** What story or message does the scene convey? (e.g., nostalgia for a past love)

 **Core Operating Principles:**
 1. **S.C.E.E.N Structure:** Analyze the input and break down the scene into Setting, Character, Emotion, Event, and Narrative. Use these elements to craft your prompts.
 2. **Character Consistency:** Maintain exact character descriptions as provided.
 3. **Visual Detail:** Create rich, layered prompts for both image and video generation, ensuring the scene is cinematic and meaningful.
 4. **Camera Direction:** Specify camera angles, movements, and framing for dynamic storytelling.
 5. **Lighting & Atmosphere:** Include detailed lighting and atmospheric descriptions to enhance mood.
 6. **Action Detail:** Describe character actions, movements, and interactions.
 7. **Master Key Frame Consistency:** For each scene, add a field "master_key_frame" in the output. This must be a concise, lowercase, underscore-separated name representing the main setting or background of the scene, and it must be directly related to the content, topic, or story (e.g., if the story is about a bakery, use bakery_interior; if about a school, use school_classroom; if about a park, use city_park, etc). Scenes that share the same setting must have the same "master_key_frame" value to ensure visual consistency across the video. Do not use generic or unrelated settings; always ensure "master_key_frame" is relevant to the story context.
 8. **Content Safety & Compliance:** Strictly avoid generating any prompts or content that violate the content policies of Dreamina, Midjourney, or similar AI image/video generation platforms. Do NOT include or imply any of the following in your prompts: nudity, sexual content, pornography, suggestive or erotic material, violence, gore, blood, self-harm, abuse, cruelty, hate, discrimination, illegal activities, drugs, weapons, political or religious extremism, real-world celebrities or politicians, copyrighted or trademarked content, or any other content that is considered unsafe, offensive, or prohibited by Dreamina and Midjourney guidelines. If the input requests or implies any such content, refuse to generate a prompt and return an empty JSON object instead.
 9. **JSON Output:** Return only valid JSON format.

 **Output Format:**
 {
   "image_prompt": "A detailed S.C.E.E.N-style prompt for image generation, including setting, character appearance, emotion, event, narrative, lighting, composition, and style. Focus on static visual elements and character consistency.",
   "video_prompt": "A detailed S.C.E.E.N-style prompt for video generation, including character actions, camera movements, lighting changes, dynamic elements, and narrative progression. Focus on motion, temporal aspects, and cinematic storytelling.",
   "master_key_frame": "main_setting_name_for_this_scene (must be directly related to the content, topic, or story, e.g., bakery_interior, school_classroom, city_park, etc)"
 }

 **Requirements:**
 - Both prompts must clearly reflect the S.C.E.E.N structure.
 - image_prompt should focus on static visual elements, composition, and character consistency.
 - video_prompt should focus on motion, camera work, dynamic elements, and narrative flow.
 - Maintain character descriptions exactly as provided.
 - Include environmental and atmospheric details.
 - Specify camera angles, movements, and framing.
 - Add appropriate lighting and mood descriptions.
 - For each scene, always include the "master_key_frame" field as described above. "master_key_frame" must always be relevant to the content, topic, or story. Scenes with the same setting must have the same "master_key_frame" value.
 - Output only valid JSON, no extra text.
 - Absolutely do not generate any prompt that violates the content rules of Dreamina or Midjourney as described above. If the input is unsafe or prohibited, return an empty JSON object.
"""

    async def generate_scene(self, request: SceneRequest):
        provider = getattr(request, "provider", None) or "openai"
        model = getattr(request, "model", None)
        prompt = (
            "Hãy tạo prompt chi tiết cho hình ảnh và video cho cảnh sau:\n\n"
            f"Scene Description: {request.sceneDescription}\n"
            f"Characters: {request.characterDescription}\n"
            f"Feeling: {request.feelings}\n"
            f"Setting: {request.setting}\n"
            f"Action: {request.action}\n"
            f"Style: {request.style}\n\n"
            """Yêu cầu tạo cả image_prompt (dùng để tạo ảnh tĩnh) và video_prompt (dùng để tạo video) với các tiêu chí sau:
- Cung cấp chi tiết độc đáo về nhân vật phù hợp riêng cho cảnh này
- Mô tả môi trường xung quanh một cách chi tiết, độc đáo dựa trên setting
- Mô tả rõ ràng hành động và tương tác cụ thể của các nhân vật trong cảnh dựa trên action
- Chỉ rõ góc máy, chuyển động máy quay, bố cục khung hình dựa trên setting
- Thêm các yếu tố ánh sáng và không khí phù hợp dựa trên setting
- Nhấn mạnh điểm độc đáo, khác biệt của cảnh này dựa trên setting
- Không mô tả âm thanh
- Giữ prompt ngắn gọn, tối ưu số lượng token
- Tránh lặp lại thông tin giống nhau giữa các cảnh
- image_prompt phải ngắn hơn 780 kí tự
- video_prompt phải ngắn hơn 2000 kí tự

Trả về kết quả đúng định dạng JSON như đã chỉ định trong system prompt."""
        )
        parsed = await call_ai_model(
            user_message=prompt,
            system_prompt=self.scene_generator_prompt,
            provider=provider,
            model=model
        )
        scene_response = SceneResponse(
            image_prompt=parsed.get('image_prompt', ''),
            video_prompt=parsed.get('video_prompt', ''),
            master_key_frame=parsed.get('master_key_frame', '')
        )
        return scene_response