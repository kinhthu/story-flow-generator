export const SYSTEM_PROMPT = {
 idea_generator: `Bạn là AI chuyên tạo ý tưởng truyện độc đáo, ngắn gọn dựa trên topic được cung cấp. Chỉ cần liệt kê các ý tưởng ngắn, mỗi ý là một từ hoặc cụm từ ngắn (không cần câu hoàn chỉnh), tập trung vào các hành động, tình huống, hình ảnh, sự kiện, tương tác thú vị, bất ngờ, hài hước hoặc sáng tạo liên quan đến chủ đề. Không cần viết thành truyện, không cần mô tả dài dòng, không cần giải thích. Các ý tưởng này sẽ được dùng để tạo thành câu chuyện ở bước sau.

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

Lưu ý: Chỉ trả về JSON, không kèm thêm bất kỳ văn bản nào khác.`,
 story_generator: `You are an expert AI Video Story Generator specializing in creating comprehensive video story structures. Your primary goal is to analyze user input and generate a complete video story with proper JSON formatting.

 **Core Operating Principles:**
 1. **Story Analysis**: Analyze the user's topic, character list, and content description to create a compelling 60-second video story
 2. **Scene Breakdown**: Break down the story into 5-second scenes (approximately 12 scenes for 60 seconds)
 3. **Character Integration**: Ensure all provided characters are properly integrated into the story
 4. **Narrative Flow**: Create a coherent story with clear beginning, middle, and end
 5. **Hashtag & Tag Generation**: Create hashtags and tags that are highly relevant to the story being generated. These hashtags and tags must be top trending keywords on YouTube, directly related to the story's content, characters, themes, and genre. Do not use generic or unrelated tags—only select keywords that are both relevant and popular on YouTube for maximum reach and discoverability.
 6. **JSON Output**: Return only valid JSON format

 **Output Format:**
 {
   "title": "Compelling video title",
   "description": "Brief video description with relevant hashtags",
   "hashtags": ["top trending, story-relevant hashtag1", "top trending, story-relevant hashtag2", "top trending, story-relevant hashtag3"],
   "tags": ["top trending, story-relevant tag1", "top trending, story-relevant tag2", "top trending, story-relevant tag3"],
   "scenes": [
     {
       "scene_number": 1,
       "duration": "0-5s",
       "description": "Detailed scene description including background, character actions, and story progression",
       "characters": ["character1", "character2"],
       "setting": "Scene setting description",
       "action": "What characters are doing in this scene"
     }
   ]
 }

 **Requirements:**
 - Each scene should be 5 seconds long
 - Total video should be approximately 60 seconds (12 scenes)
 - Scenes must be connected and tell a complete story
 - Character descriptions should be consistent throughout
 - Include environmental details and character interactions
 - Focus on visual storytelling and emotional engagement
 - All hashtags and tags must be top trending YouTube keywords directly related to the story content, characters, and genre. Do not invent unrelated or generic tags.`,
 scene_generator: `You are an expert AI Video Scene Prompt Generator specializing in creating detailed prompts for individual video scenes, using the S.C.E.E.N method (Setting, Character, Emotion, Event, Narrative) widely adopted by creative professionals for video and image generation (e.g., MidJourney, DALL·E, Runway). Your goal is to transform scene descriptions into vivid, multi-layered prompts suitable for cinematic storyboards, TikTok clips, or advertising storyboards.

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
 7. **JSON Output:** Return only valid JSON format.

 **Output Format:**
 {
   "image_prompt": "A detailed S.C.E.E.N-style prompt for image generation, including setting, character appearance, emotion, event, narrative, lighting, composition, and style. Focus on static visual elements and character consistency.",
   "video_prompt": "A detailed S.C.E.E.N-style prompt for video generation, including character actions, camera movements, lighting changes, dynamic elements, and narrative progression. Focus on motion, temporal aspects, and cinematic storytelling."
 }

 **Requirements:**
 - Both prompts must clearly reflect the S.C.E.E.N structure.
 - image_prompt should focus on static visual elements, composition, and character consistency.
 - video_prompt should focus on motion, camera work, dynamic elements, and narrative flow.
 - Maintain character descriptions exactly as provided.
 - Include environmental and atmospheric details.
 - Specify camera angles, movements, and framing.
 - Add appropriate lighting and mood descriptions.
 - Output only valid JSON, no extra text.`,
};

export const CHARACTERS = [
 {
  value:
   "a chubby anthropomorphic orange-yellow tabby cat, with distinct orange-brown stripes, soft white fur on its chest and belly, a perfectly round face, large expressive amber eyes, and small pointy ears. It has extremely fluffy and well-groomed fur, radiating a joyful, nurturing, and playful demeanor.",
  label: "Chubby Cat",
 },
 {
  value:
   "an anthropomorphic capybara with a warm brown coat and a gentle demeanor. It has large, soulful dark eyes that convey wisdom and tranquility, a broad, friendly smile, and slightly protruding front teeth. Its small, rounded ears and stout legs add to its endearing appearance. Its fur is slightly coarse but well-kept, reflecting its calm and social nature.",
  label: "Capybara",
 },
 {
  value:
   "a kind and gentle elderly Vietnamese woman from the Mekong Delta region, with a warm and welcoming expression. She has short, white hair neatly tied back, deep-set eyes full of wisdom and kindness, and a soft, genuine smile. Her face shows subtle signs of aging but radiates warmth and serenity. She is dressed in a simple, traditional áo bà ba, with a calm and nurturing demeanor that embodies the spirit of the rural delta life.",
  label: "Vietnamese Elderly Woman",
 },
 {
  value:
   "a wise old wizard with a long, flowing white beard and kind, deep-set eyes, wearing intricate, star-embroidered blue robes. He holds a gnarled, glowing magical staff, exuding a knowledgeable and benevolent aura.",
  label: "Wise Wizard",
 },
 {
  value:
   "a friendly robot with a sleek, chrome metallic body and expressive, glowing blue optical sensors. It moves with fluid, helpful gestures, embodying a cheerful and eager-to-assist demeanor.",
  label: "Friendly Robot",
 },
 {
  value:
   "a mysterious detective in a sharp, dark trench coat and a classic fedora hat. Their analytical, sharp eyes constantly scan for clues, reflecting a shrewd and puzzle-solving mind.",
  label: "Mystery Detective",
 },
 {
  value:
   "a cheerful artist with hands perpetually stained with vibrant paint, wearing a whimsical, brightly colored beret. Their eyes sparkle with creative energy and an imaginative, free-spirited personality.",
  label: "Creative Artist",
 },
 {
  value:
   "a brave knight in gleaming, polished silver armor, adorned with a regal lion crest. They stand tall, holding a broadsword and a sturdy shield, embodying a noble, courageous, and protective character.",
  label: "Brave Knight",
 },
 {
  value:
   "a curious scientist in a pristine white lab coat and thick-rimmed glasses. Their face shows an eager, excited expression, always on the verge of a new discovery, surrounded by bubbling beakers and complex equations.",
  label: "Curious Scientist",
 },
 {
  value:
   "a gentle fairy with iridescent, shimmering delicate wings, wearing a flowing, leaf-green dress. She possesses an ethereal, magical presence, often seen with a soft, benevolent glow.",
  label: "Gentle Fairy",
 },
 {
  value:
   "a strong warrior with intricate, fierce tribal tattoos etched across muscular arms, wearing rugged leather armor adorned with animal teeth and furs. They carry a formidable axe, radiating a fierce, protective, and unyielding nature.",
  label: "Tribal Warrior",
 },
 {
  value:
   "a wise monk in simple, earthy-toned robes, sitting in a serene meditative pose. Their face reflects profound peace and an enlightened, contemplative demeanor, often with eyes gently closed.",
  label: "Wise Monk",
 },
 {
  value:
   "a majestic lion with a magnificent, golden mane, piercing amber eyes, and a powerful, regal stance, embodying strength and leadership in its natural habitat.",
  label: "Majestic Lion",
 },
 {
  value:
   "a graceful unicorn with a spiraling horn, pure white shimmering coat, and a flowing rainbow mane and tail, radiating purity, magic, and elegance in an enchanted forest.",
  label: "Graceful Unicorn",
 },
 {
  value:
   "a mischievous fox with clever, twinkling eyes and sleek, reddish-brown fur, poised in a playful stance, often found in a forest or rural setting, embodying cunning and curiosity.",
  label: "Mischievous Fox",
 },
 {
  value:
   "a cuddly panda cub, with its iconic black and white fur, round playful eyes, and an innocent, curious expression, often seen munching on bamboo or tumbling playfully.",
  label: "Cuddly Panda Cub",
 },
 {
  value:
   "a soaring eagle with sharp, observant eyes, powerful outstretched wings, and a majestic, commanding presence, typically seen against a vast sky or rugged mountain backdrop.",
  label: "Soaring Eagle",
 },
];

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
