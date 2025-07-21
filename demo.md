# Story Flow Generator - Web UI Demo

## 🚀 Quick Start

1. **Start the server:**

   ```bash
   npm run dev
   ```

2. **Open your browser and go to:**
   ```
   http://localhost:3000
   ```

## 🎭 Demo Walkthrough

### Step 1: Generate Ideas

1. **Enter a topic** (pre-filled with example):

   ```
   Biển, núi lửa, sóng thần, đại dương, hải sản, đáy biển, bơi, lướt sóng, thuyền, vui vẻ, chiến tranh, quái vật
   ```

2. **Set video duration:** 30 seconds
3. **Set scene duration:** 5 seconds
4. **Set number of ideas:** 5 (you can adjust from 1-20)
5. **Select characters** by clicking on the character cards:

   - Chubby Cat
   - Capybara
   - Soaring Eagle
   - Cuddly Panda Cub

6. **Click "🎭 Tạo Ý Tưởng"** to generate ideas
7. **Review the generated ideas** and select the ones you want to proceed with

### Step 2: Generate Stories

1. **After selecting ideas from Step 1**, click "📖 Tạo Câu Chuyện"
2. **Review the generated stories** which include:
   - Story title
   - Description
   - Hashtags
   - Scene breakdown
3. **Select the stories** you want to create scenes for

### Step 3: Generate Scenes

1. **After selecting stories from Step 2**, click "🎬 Tạo Cảnh Quay"
2. **Review the generated scenes** organized by story:
   - Each scene shows scene number and description
   - Image prompt for static image generation
   - Video prompt for video generation
   - Copy buttons for easy prompt copying

## 🎨 Features Demonstrated

### Modern UI Design

- **Responsive design** that works on desktop and mobile
- **Beautiful gradient backgrounds** and smooth animations
- **Intuitive step-by-step workflow**
- **Real-time feedback** and loading states

### Character Selection

- **Visual character cards** with descriptions
- **Multi-select functionality**
- **Character tags** display in results

### Prompt Management

- **One-click copy functionality** for all prompts
- **Organized display** by story and scene
- **Clear separation** between image and video prompts

## 🔧 Technical Features

### API Endpoints

- `GET /api/characters` - Get available characters
- `POST /api/generate-ideas` - Generate story ideas
- `POST /api/generate-stories` - Generate complete stories
- `POST /api/generate-scenes` - Generate scene prompts

### Error Handling

- **Graceful error handling** with user-friendly messages
- **Automatic retry mechanisms**
- **Detailed console logging** for debugging

## 📱 Mobile Responsive

The web UI is fully responsive and works great on:

- Desktop computers
- Tablets
- Mobile phones

## 🎯 Use Cases

### Content Creators

- Generate story ideas for videos
- Create detailed prompts for AI image/video generation
- Organize content by stories and scenes

### Educators

- Create educational story content
- Generate prompts for student projects
- Teach storytelling concepts

### Developers

- Test AI prompt generation
- Integrate with other AI services
- Build upon the existing API

## 🚀 Next Steps

1. **Customize characters** by editing `config.js`
2. **Modify prompts** to suit your specific needs
3. **Integrate with other AI services** (MidJourney, DALL-E, Runway, etc.)
4. **Add more features** like story templates or character customization

## 🐛 Troubleshooting

If you encounter issues:

1. **Check the browser console** (F12) for error messages
2. **Verify the server is running** on port 3000
3. **Ensure OpenAI API key** is configured in `config.js`
4. **Check network connectivity** for API calls

## 📞 Support

For issues or questions:

1. Check the console logs
2. Review the `README_WEB_UI.md` file
3. Examine the API responses in the browser's Network tab
