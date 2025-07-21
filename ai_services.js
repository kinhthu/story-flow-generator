import { OPENAI_API_KEY, SYSTEM_PROMPT } from "./config.js";

const api_request = async (
 systemPrompt,
 userMessage,
 temperature = 0.7,
 max_tokens = 2000,
 model = "gpt-4o-mini"
) => {
 try {
  const apiKey = OPENAI_API_KEY;
  if (!apiKey) {
   throw new Error("OPENAI_API_KEY not found in environment variables");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
   },
   body: JSON.stringify({
    model: model,
    messages: [
     {
      role: "system",
      content: systemPrompt,
     },
     {
      role: "user",
      content: userMessage,
     },
    ],
    temperature: temperature,
    max_tokens: max_tokens,
    response_format: { type: "json_object" },
   }),
  });

  if (!response.ok) {
   const errorData = await response.text();
   throw new Error(`OpenAI API error: ${response.status} - ${errorData}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  return content;
 } catch (error) {
  console.error("Error:", error);
  throw error;
 }
};

const generateIdeas = async (
 topic,
 characters,
 numberOfIdeas = 10,
 duration = 30,
 sceneTime = 5
) => {
 const numberOfScenes = Math.floor(duration / sceneTime);
 const systemPrompt = SYSTEM_PROMPT.idea_generator;
 const userMessage = `Topic: ${topic}
  Characters: ${characters.join(", ")}
  
  Create ${numberOfIdeas} different ideas, each using 1 to 3 characters from the list above and centered around the topic.
  Each idea has ${numberOfScenes} scenes, each scene has ${sceneTime} seconds.`;

 return await api_request(systemPrompt, userMessage);
};

const generateStory = async (
 videoDuration,
 numberOfScenes,
 characterDescription,
 style,
 idea
) => {
 const systemPrompt = SYSTEM_PROMPT.story_generator;
 const prompt = `Hãy tạo một cấu trúc câu chuyện video hoàn chỉnh dài ${videoDuration} giây dựa trên các thông tin sau:

Idea: ${idea}
Characters: ${characterDescription}
Style: ${style}

Yêu cầu:
- Câu chuyện có độ dài khoảng ${videoDuration} giây (gồm ${numberOfScenes} cảnh, mỗi cảnh 5 giây)
- Tích hợp tự nhiên tất cả các nhân vật đã cho
- Có mở đầu, phát triển và kết thúc rõ ràng
- Tập trung vào kể chuyện bằng hình ảnh và tạo cảm xúc cho người xem
- Mô tả ngắn gọn, súc tích để tiết kiệm số lượng token

Trả về kết quả đúng định dạng JSON như đã chỉ định trong system prompt.`;

 return await api_request(systemPrompt, prompt);
};

const generateScene = async (
 sceneDescription,
 characterDescription,
 style,
 feelings,
 setting,
 action
) => {
 const systemPrompt = SYSTEM_PROMPT.scene_generator;
 const prompt = `Hãy tạo prompt chi tiết cho hình ảnh và video cho cảnh sau:

Scene Description: ${sceneDescription}
Characters: ${characterDescription}
Feeling: ${feelings}
Setting: ${setting}
Action: ${action}
Style: ${style}

Yêu cầu tạo cả image_prompt (dùng để tạo ảnh tĩnh) và video_prompt (dùng để tạo video) với các tiêu chí sau:
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

Trả về kết quả đúng định dạng JSON như đã chỉ định trong system prompt.`;

 return await api_request(systemPrompt, prompt);
};

export default {
 generateIdeas,
 generateStory,
 generateScene,
};
