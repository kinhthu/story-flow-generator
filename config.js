import dotenv from "dotenv";

// Load environment variables
dotenv.config();

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
 - Absolutely do not generate any prompt that violates the content rules of Dreamina or Midjourney as described above. If the input is unsafe or prohibited, return an empty JSON object.`,
};

export const CHARACTERS = [
 {
  value:
   "a chubby anthropomorphic orange-yellow tabby cat, with distinct orange-brown stripes, soft white fur on its chest and belly, a perfectly round face, large expressive amber eyes, and small pointy ears. It has extremely fluffy and well-groomed fur, radiating a joyful, nurturing, and playful demeanor.",
  label: "Chubby Cat",
  image_link:
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxv_CGDUL0mYH5V_3vvFB0c4Pz89RAU3l1Dg&s",
 },
 {
  value:
   "an anthropomorphic capybara with a warm brown coat and a gentle demeanor. It has large, soulful dark eyes that convey wisdom and tranquility, a broad, friendly smile, and slightly protruding front teeth. Its small, rounded ears and stout legs add to its endearing appearance. Its fur is slightly coarse but well-kept, reflecting its calm and social nature.",
  label: "Capybara",
  image_link:
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq8yyL9ha5KrxYkOuPlXh5LQdovO6F-41T2A&s",
 },
 {
  value:
   "a kind and gentle elderly Vietnamese woman from the Mekong Delta region, with a warm and welcoming expression. She has short, white hair neatly tied back, deep-set eyes full of wisdom and kindness, and a soft, genuine smile. Her face shows subtle signs of aging but radiates warmth and serenity. She is dressed in a simple, traditional áo bà ba, with a calm and nurturing demeanor that embodies the spirit of the rural delta life.",
  label: "Vietnamese Elderly Woman",
  image_link:
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7zCE55D3HT3BaNcEsGogQfptSuyneFbJDow&s",
 },
 {
  value:
   "a wise old wizard with a long, flowing white beard and kind, deep-set eyes, wearing intricate, star-embroidered blue robes. He holds a gnarled, glowing magical staff, exuding a knowledgeable and benevolent aura.",
  label: "Wise Wizard",
  image_link:
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDU-u4nM3SAPFbDIQnIG_Jqc7A_nxrM4bfnw&s",
 },
 {
  value:
   "a friendly robot with a sleek, chrome metallic body and expressive, glowing blue optical sensors. It moves with fluid, helpful gestures, embodying a cheerful and eager-to-assist demeanor.",
  label: "Friendly Robot",
  image_link:
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAfV1HweHktie6goBt_VwotiF7dPZut4_2PA&s",
 },
 {
  value:
   "a mysterious detective in a sharp, dark trench coat and a classic fedora hat. Their analytical, sharp eyes constantly scan for clues, reflecting a shrewd and puzzle-solving mind.",
  label: "Mystery Detective",
  image_link:
   "https://png.pngtree.com/png-clipart/20250318/original/pngtree-detective-explorer-holding-magnifying-glass-isolated-on-transparent-background-png-image_20680035.png",
 },
 {
  value:
   "a cheerful artist with hands perpetually stained with vibrant paint, wearing a whimsical, brightly colored beret. Their eyes sparkle with creative energy and an imaginative, free-spirited personality.",
  label: "Creative Artist",
  image_link:
   "https://img.freepik.com/premium-photo/cheerful-cartoon-artist-with-beard-paints-vibrant-abstract-landscape-easel_1077802-469784.jpg",
 },
 {
  value:
   "a brave knight in gleaming, polished silver armor, adorned with a regal lion crest. They stand tall, holding a broadsword and a sturdy shield, embodying a noble, courageous, and protective character.",
  label: "Brave Knight",
  image_link:
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Ln_SKm8Q3IJaCb9DjlDnvDSWlwD72sz83w&s",
 },
 {
  value:
   "a curious scientist in a pristine white lab coat and thick-rimmed glasses. Their face shows an eager, excited expression, always on the verge of a new discovery, surrounded by bubbling beakers and complex equations.",
  label: "Curious Scientist",
  image_link:
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe5gGbQ3el7WOTOAOTHMijzEny_YLzgNZxRQ&s",
 },
 {
  value:
   "a gentle fairy with iridescent, shimmering delicate wings, wearing a flowing, leaf-green dress. She possesses an ethereal, magical presence, often seen with a soft, benevolent glow.",
  label: "Gentle Fairy",
  image_link:
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfphokjJFogkCIbYYDRNAfzZ7S5C2BYuKT81p0rKHFNzAbyRy_ncE3jvXPvfmkekMHlz4&usqp=CAU",
 },
 {
  value:
   "a strong warrior with intricate, fierce tribal tattoos etched across muscular arms, wearing rugged leather armor adorned with animal teeth and furs. They carry a formidable axe, radiating a fierce, protective, and unyielding nature.",
  label: "Tribal Warrior",
  image_link:
   "https://mistchartermaps.com/cdn/shop/files/Mistcharter_Maps_Tribal_Warrior-2_Game_Token.webp?v=1732022228&width=1445",
 },
 {
  value:
   "a wise monk in simple, earthy-toned robes, sitting in a serene meditative pose. Their face reflects profound peace and an enlightened, contemplative demeanor, often with eyes gently closed.",
  label: "Wise Monk",
  image_link:
   "https://media.istockphoto.com/id/836365910/vector/buddhist-monk-meditating.jpg?s=612x612&w=0&k=20&c=NsJukjXTHL9yZRSNS-b17EmebQU3hPt0DjO77M2acWk=",
 },
 {
  value:
   "a majestic lion with a magnificent, golden mane, piercing amber eyes, and a powerful, regal stance, embodying strength and leadership in its natural habitat.",
  label: "Majestic Lion",
  image_link:
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3e0dKZScSaVDJa86JxIpp6aTVJTnvwyXYDw&s",
 },
 {
  value:
   "a graceful unicorn with a spiraling horn, pure white shimmering coat, and a flowing rainbow mane and tail, radiating purity, magic, and elegance in an enchanted forest.",
  label: "Graceful Unicorn",
  image_link:
   "https://png.pngtree.com/png-clipart/20250119/original/pngtree-graceful-unicorn-with-vibrant-mane-perfect-for-fantasy-lovers-png-image_19946914.png",
 },
 {
  value:
   "a mischievous fox with clever, twinkling eyes and sleek, reddish-brown fur, poised in a playful stance, often found in a forest or rural setting, embodying cunning and curiosity.",
  label: "Mischievous Fox",
  image_link:
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbrCaB14WlMFpIvflE5EwmGCgKkeLErqL8Ag&s",
 },
 {
  value:
   "a cuddly panda cub, with its iconic black and white fur, round playful eyes, and an innocent, curious expression, often seen munching on bamboo or tumbling playfully.",
  label: "Cuddly Panda Cub",
  image_link:
   "https://www.shutterstock.com/image-vector/vector-illustration-cute-baby-panda-260nw-2574056993.jpg",
 },
 {
  value:
   "a soaring eagle with sharp, observant eyes, powerful outstretched wings, and a majestic, commanding presence, typically seen against a vast sky or rugged mountain backdrop.",
  label: "Soaring Eagle",
  image_link:
   "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/1533c1e3-7d84-4c67-b1dd-c0396d805f0c/e8313031-b302-4adb-851c-2d6c6a4cbf8f.png",
 },
 {
  value:
   "a gothic-lolita style character with a sweet yet mischievous expression, adorned with black lace, ribbons, and an oversized bow, often carrying a skull-shaped plushie. Its appearance balances cute aesthetics with a touch of dark charm, reflecting a playful and slightly rebellious personality.",
  label: "Kuromi (Sanrio)",
  image_link:
   "https://ih1.redbubble.net/image.5663175698.1735/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
 },
 {
  value:
   "a fluffy white puppy character with long, droopy ears, a blue bandana, and a curly tail. It has large, innocent blue eyes and a perpetually cheerful expression, embodying purity, kindness, and dreaminess.",
  label: "Cinnamoroll (Sanrio)",
  image_link:
   "https://images.surferseo.art/c7822115-a875-42c1-a2a9-ea2e7e0885d7.jpeg",
 },
 {
  value:
   "a pink bunny character with a large pink hood that covers her ears, tied with a white bow. She has a sweet, innocent face with simple dot eyes and a gentle smile, radiating warmth, sincerity, and friendship.",
  label: "My Melody (Sanrio)",
  image_link:
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVwmjBcIENAG1DNBsony36uwcAsUs3VtQEYOwIY5kObu_c5eq9B-B5ewz3JFFx40aVwbE&usqp=CAU",
 },
 {
  value:
   "a small, round, yellow mouse-like Pokémon with pointy ears tipped black, a lightning bolt-shaped tail, and rosy red cheeks that can generate electricity. It has large, friendly eyes and a perpetually energetic and loyal demeanor.",
  label: "Pikachu (Pokémon)",
  image_link:
   "https://i.pinimg.com/474x/19/a7/65/19a765cbc0a13f4a23d7c3f26b61a808.jpg",
 },
 {
  value:
   "a fluffy, fox-like Pokémon with long ears, a bushy tail, and a gentle expression. Its fur is mostly brown with cream accents, and it has large, soulful eyes, embodying adaptability, curiosity, and affection.",
  label: "Eevee (Pokémon)",
  image_link:
   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/133.png",
 },
 {
  value:
   "a large, sleepy, blue bear-like Pokémon with a cream-colored belly and closed eyes, often seen napping. Despite its size, it has a surprisingly gentle and relaxed demeanor, embodying contentment and a love for food and sleep.",
  label: "Snorlax (Pokémon)",
  image_link:
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToVdkMADDzsUJUxErEzjqL359gbNfo5XLurw&s",
 },
 {
  value:
   "a large, gray, fluffy forest spirit with a wide grin and big, friendly eyes, often depicted with smaller, similar creatures. It has a magical presence and a comforting, protective nature, embodying the spirit of the forest.",
  label: "Totoro (Ghibli Studio)",
  image_link:
   "https://i.pinimg.com/736x/88/da/15/88da15c7c144abceee215aa3f1e1899a.jpg",
 },
 {
  value:
   "small, black, fuzzy creatures with large, curious eyes, often seen in dusty or dark places, disappearing quickly when spotted. They are shy and whimsical, embodying the hidden magic in everyday corners.",
  label: "Soot Sprites (Ghibli Studio)",
  image_link:
   "https://i.pinimg.com/736x/58/52/35/5852352326c749f1cdf6151ebd898412.jpg",
 },
 {
  value:
   "a small, round, white character with a heart-shaped mouth and big, expressive eyes, often seen with an astronaut helmet. It is curious, adventurous, and full of love, embodying innocence and a desire for connection.",
  label: "Cooky (BT21)",
  image_link: "https://img.icons8.com/?size=512&id=h1vP73ojrOHv&format=png",
 },
 {
  value:
   "a soft, white alpaca character with a gentle smile and a pink blush. It is kind, pure-hearted, and loves to cook, embodying warmth and tranquility.",
  label: "RJ (BT21)",
  image_link:
   "https://i.pinimg.com/736x/ea/04/8c/ea048ccae9be18fbe44fc201ff8f1a4a.jpg",
 },
 {
  value:
   "a cute, mischievous red alien character with large, round eyes and a heart-shaped head. It is playful, curious, and loves to spread joy, embodying boundless energy and positivity.",
  label: "Mang (BT21)",
  image_link:
   "https://cdna.artstation.com/p/assets/images/images/015/191/446/large/tania-munoa-bt21-mang1.jpg?1547430841",
 },
];

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
