# Story Flow Client

React client để gọi MCP Server API cho việc tạo câu chuyện AI.

## Tính năng

- 🎭 **Bước 1**: Tạo ý tưởng từ chủ đề và nhân vật
- 📖 **Bước 2**: Tạo câu chuyện từ ý tưởng đã chọn
- 🎬 **Bước 3**: Tạo cảnh quay từ câu chuyện
- 🎨 Giao diện đẹp, responsive
- ⚡ Tích hợp với MCP Server API

## Cài đặt

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

## Cấu hình

Client sẽ tự động proxy các request `/api/*` đến MCP Server tại `http://localhost:8000`.

Đảm bảo MCP Server đang chạy trước khi sử dụng client.

## Sử dụng

1. **Bước 1**: Nhập chủ đề, chọn nhân vật, cấu hình thời lượng
2. **Bước 2**: Chọn ý tưởng để tạo câu chuyện
3. **Bước 3**: Chọn câu chuyện để tạo cảnh quay

## Scripts

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run preview` - Preview production build

## Cấu trúc

```
src/
├── components/
│   ├── StepIdeas.jsx      # Bước 1: Tạo ý tưởng
│   ├── StepStories.jsx    # Bước 2: Tạo câu chuyện
│   └── StepScenes.jsx     # Bước 3: Tạo cảnh quay
├── App.jsx                # Component chính
├── main.jsx              # Entry point
└── App.css               # Styles
```
