# Story Flow

Ứng dụng tạo câu chuyện AI từ ý tưởng đến cảnh quay, kết hợp MCP Server (FastAPI) và Web Client (React).

## Cấu trúc dự án

```
Story Flow/
├── Client/                 # React Web Client
│   ├── src/
│   ├── dist/              # Build output
│   ├── package.json
│   └── README.md
├── MCP Server/            # FastAPI Backend
│   ├── src/
│   ├── requirements.txt
│   ├── run.py            # Entry point
│   └── README.md
├── Procfile              # Deploy configuration
├── env.example           # Environment variables template
└── README.md            # This file
```

## Cài đặt và chạy

### 1. Web Client (React)

```bash
cd Client
npm install
npm run dev          # Development
npm run build        # Production build
```

### 2. MCP Server (FastAPI)

```bash
cd "MCP Server"
pip install -r requirements.txt
python run.py        # Run server
```

### 3. Deploy

```bash
# Build client trước
cd Client && npm run build

# Deploy với Procfile
# Hệ thống sẽ chạy: cd "MCP Server" && python run.py
```

## Tính năng

- **Step 1**: Tạo ý tưởng câu chuyện với AI
- **Step 2**: Tạo câu chuyện hoàn chỉnh từ ý tưởng
- **Step 3**: Tạo cảnh quay chi tiết cho từng scene
- **Batch Processing**: Xử lý nhiều ý tưởng/câu chuyện cùng lúc
- **API Documentation**: OpenAPI/Swagger docs
- **Responsive UI**: Giao diện đẹp, dễ sử dụng

## API Endpoints

- `GET /` - Web Client
- `POST /api/ideas` - Tạo ý tưởng
- `POST /api/stories` - Tạo câu chuyện
- `POST /api/scenes` - Tạo cảnh quay
- `POST /api/stories/batch` - Batch tạo câu chuyện
- `POST /api/scenes/batch` - Batch tạo cảnh quay
- `GET /docs` - API Documentation

## Environment Variables

Copy `env.example` và cấu hình:

- `OPENAI_API_KEY` - OpenAI API key
- `GEMINI_API_KEY` - Google Gemini API key
