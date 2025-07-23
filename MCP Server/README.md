# Story Flow MCP Server

MCP (Model Context Protocol) server cho Story Flow Generator, cung cấp các AI services để tạo truyện, ý tưởng và cảnh video.

## Tính năng

- 🎭 Tạo ý tưởng truyện từ chủ đề và nhân vật
- 📖 Tạo cấu trúc truyện hoàn chỉnh
- 🎬 Tạo prompt chi tiết cho từng cảnh (image & video)
- 🤖 Tích hợp OpenAI GPT-4o-mini
- 🔌 MCP Protocol support
- 🚀 REST API endpoints

## Cài đặt

1. **Clone project**

```bash
git clone <repository-url>
cd "Story Flow/MCP Server"
```

2. **Tạo virtual environment**

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# hoặc
venv\Scripts\activate  # Windows
```

3. **Cài đặt dependencies**

```bash
pip install -r requirements.txt
```

4. **Cấu hình environment**

```bash
cp env.example .env
# Chỉnh sửa .env với API key của bạn
```

5. **Chạy server**

```bash
python src/main.py
```

## Cấu trúc Project

```
MCP Server/
├── src/
│   ├── __init__.py
│   ├── main.py              # Entry point
│   ├── server.py            # MCP Server
│   ├── services/
│   │   ├── __init__.py
│   │   ├── idea_service.py
│   │   ├── story_service.py
│   │   └── scene_service.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── schemas.py
│   └── config/
│       ├── __init__.py
│       └── settings.py
├── requirements.txt
├── .env.example
├── Dockerfile
└── README.md
```

## API Endpoints

### MCP Protocol

- `generate_ideas`: Tạo ý tưởng truyện
- `generate_story`: Tạo cấu trúc truyện
- `generate_scene`: Tạo prompt cho cảnh

### REST API

- `POST /api/ideas`: Tạo ý tưởng
- `POST /api/stories`: Tạo truyện
- `POST /api/scenes`: Tạo cảnh

## Sử dụng

### MCP Client

```python
from mcp import ClientSession

async with ClientSession.create("ws://localhost:8000") as session:
    result = await session.call_tool("generate_ideas", {
        "topic": "Tình bạn",
        "characters": ["capybara", "cat"]
    })
```

### REST API

```bash
curl -X POST http://localhost:8000/api/ideas \
  -H "Content-Type: application/json" \
  -d '{"topic": "Tình bạn", "characters": ["capybara", "cat"]}'
```

## Environment Variables

```env
OPENAI_API_KEY=your_openai_api_key
MCP_SERVER_PORT=8000
LOG_LEVEL=INFO
```

## License

MIT
