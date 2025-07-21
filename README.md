# Story Flow Generator

Ứng dụng JavaScript sử dụng OpenAI GPT-4o-mini để tạo ra 10 câu chuyện dựa trên chủ đề và danh sách nhân vật.

## Tính năng

- 🎭 Tạo 10 câu chuyện khác nhau từ một chủ đề
- 👥 Sử dụng danh sách nhân vật tùy chỉnh
- 📖 Truyện phù hợp với trẻ em, có thông điệp tích cực
- 💾 Xuất kết quả dưới dạng JSON
- 🎨 System prompt được tối ưu hóa cho việc tạo truyện
- 🚀 Sử dụng fetch API tích hợp, không cần thư viện ngoài

## Cài đặt

1. **Clone hoặc tải project**

```bash
git clone <repository-url>
cd story-flow-generator
```

2. **Cài đặt dependencies**

```bash
npm install
```

3. **Cấu hình Environment Variables**

```bash
# Copy file mẫu
cp env.example .env

# Chỉnh sửa file .env và thêm API key của bạn
# Lấy API key từ: https://platform.openai.com/api-keys
```

**Cấu hình trong file .env:**

```env
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Environment
NODE_ENV=development

# Server Configuration
PORT=3000
```

**Lưu ý:**

- Thay `your_openai_api_key_here` bằng API key thực của bạn
- File `.env` sẽ không được commit lên git (đã được thêm vào .gitignore)
- Đảm bảo API key có đủ credit để sử dụng

4. **Chạy ứng dụng**

```bash
npm start
```

## Cách sử dụng

### Sử dụng trực tiếp

```javascript
const { generateStories } = require("./main.js");

async function example() {
 const topic = "Tình bạn và sự chia sẻ";
 const characters = ["capybara", "chuppy cat", "bunny", "panda", "fox"];

 try {
  const stories = await generateStories(topic, characters);
  console.log(stories);
 } catch (error) {
  console.error("Lỗi:", error);
 }
}

example();
```

### Format Output

```json
[
 {
  "story": "Một ngày nọ, Capybara và Chuppy Cat gặp nhau bên bờ sông...",
  "characters": ["capybara", "chuppy cat"]
 },
 {
  "story": "Bunny và Panda cùng nhau đi dã ngoại...",
  "characters": ["bunny", "panda"]
 }
]
```

## Tùy chỉnh

### Thay đổi System Prompt

Bạn có thể chỉnh sửa `SYSTEM_PROMPT` trong file `main.js` để thay đổi:

- Độ dài truyện
- Phong cách viết
- Độ tuổi mục tiêu
- Thông điệp của truyện

### Thay đổi tham số API

```javascript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify({
    model: "gpt-4o-mini",
    messages: [...],
    temperature: 0.8,        // Độ sáng tạo (0.0 - 1.0)
    max_tokens: 2000,        // Độ dài tối đa
    response_format: { type: "json_object" }
  })
});
```

## Yêu cầu hệ thống

- Node.js >= 18.0.0 (để sử dụng fetch API tích hợp)
- OpenAI API key
- Kết nối internet

## Cấu trúc project

```
story-flow-generator/
├── main.js              # File chính
├── package.json         # Dependencies
├── env.example          # File mẫu cấu hình
├── README.md           # Hướng dẫn sử dụng
├── example.js          # Ví dụ sử dụng
└── stories_output.json # Kết quả xuất ra (tự động tạo)
```

## Lưu ý

- Đảm bảo có đủ credit trong tài khoản OpenAI
- API calls có thể mất vài giây để hoàn thành
- Kết quả được lưu tự động vào file `stories_output.json`
- Mỗi lần chạy sẽ tạo ra 10 câu chuyện khác nhau
- Sử dụng fetch API tích hợp của Node.js, không cần cài thêm thư viện

## Troubleshooting

### Lỗi API Key

```
Error: OPENAI_API_KEY not found in environment variables
```

→ Kiểm tra lại API key trong file `.env`

### Lỗi JSON parsing

```
Error: Invalid JSON response from OpenAI
```

→ Thử chạy lại, đôi khi API trả về format không đúng

### Lỗi mạng

```
Error: OpenAI API error: 401 - Unauthorized
```

→ Kiểm tra API key và kết nối internet

### Lỗi Node.js version

```
Error: fetch is not defined
```

→ Cập nhật Node.js lên phiên bản 18.0.0 trở lên

## License

MIT License
