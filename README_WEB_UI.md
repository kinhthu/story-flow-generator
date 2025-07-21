# Story Flow Generator - Web UI

A modern web interface for generating AI-powered stories with a step-by-step workflow.

## Features

### 🎭 Step 1: Generate Ideas

- Input topic and video duration
- Set number of ideas to generate (1-20)
- Select characters from a predefined list
- Generate multiple creative ideas based on the topic
- Choose which ideas to proceed with

### 📖 Step 2: Generate Stories

- Convert selected ideas into complete story structures
- Each story includes title, description, hashtags, and scene breakdown
- Select which stories to create scenes for

### 🎬 Step 3: Generate Scenes

- Create detailed image and video prompts for each scene
- Each scene includes:
  - Image prompt for static image generation
  - Video prompt for video generation
  - Copy buttons for easy prompt copying
- Organized by story with clear scene numbering

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- OpenAI API key configured in `config.js`

### Installation

1. Install dependencies:

```bash
npm install
```

2. Configure your OpenAI API key in `config.js`:

```javascript
export const OPENAI_API_KEY = "your-openai-api-key-here";
```

3. Start the web server:

```bash
npm run dev
```

4. Open your browser and navigate to:

```
http://localhost:3000
```

## Usage

### Step 1: Generate Ideas

1. Enter a topic (e.g., "Biển, núi lửa, sóng thần, đại dương, hải sản, đáy biển, bơi, lướt sóng, thuyền, vui vẻ, chiến tranh, quái vật")
2. Set video duration (in seconds)
3. Set scene duration (in seconds)
4. Set number of ideas to generate (1-20)
5. Select characters from the grid
6. Click "🎭 Tạo Ý Tưởng" to generate ideas
7. Review and select the ideas you want to proceed with

### Step 2: Generate Stories

1. After selecting ideas from Step 1, click "📖 Tạo Câu Chuyện"
2. The system will generate complete story structures for each selected idea
3. Review the generated stories and select which ones to create scenes for

### Step 3: Generate Scenes

1. After selecting stories from Step 2, click "🎬 Tạo Cảnh Quay"
2. The system will generate detailed prompts for each scene in the selected stories
3. Each scene includes:
   - **Image Prompt**: For generating static images (MidJourney, DALL-E, etc.)
   - **Video Prompt**: For generating videos (Runway, etc.)
   - **Copy Buttons**: Easy one-click copying of prompts

## API Endpoints

The web UI communicates with the following API endpoints:

- `POST /api/generate-ideas` - Generate story ideas
- `POST /api/generate-stories` - Generate complete stories
- `POST /api/generate-scenes` - Generate scene prompts

## File Structure

```
Story Flow/
├── index.html          # Main web UI
├── server.js           # Express server with API endpoints
├── ai_services.js      # AI service functions
├── config.js           # Configuration and prompts
├── main.js             # Original CLI version
├── package.json        # Dependencies and scripts
└── README_WEB_UI.md    # This file
```

## Features

### Modern UI Design

- Responsive design that works on desktop and mobile
- Beautiful gradient backgrounds and smooth animations
- Intuitive step-by-step workflow
- Real-time feedback and loading states

### Character Selection

- Visual character cards with descriptions
- Multi-select functionality
- Character tags display in results

### Prompt Management

- One-click copy functionality for all prompts
- Organized display by story and scene
- Clear separation between image and video prompts

### Error Handling

- Graceful error handling with user-friendly messages
- Automatic retry mechanisms
- Detailed console logging for debugging

## Customization

### Adding New Characters

Edit the `CHARACTERS` array in `config.js`:

```javascript
export const CHARACTERS = [
 {
  value: "description of the character",
  label: "Character Name",
 },
 // Add more characters...
];
```

### Modifying Prompts

Edit the system prompts in `config.js` to customize the AI behavior for:

- Idea generation
- Story generation
- Scene generation

### Styling

The web UI uses CSS custom properties and can be easily customized by modifying the styles in `index.html`.

## Troubleshooting

### Common Issues

1. **Server won't start**

   - Check if port 3000 is available
   - Ensure all dependencies are installed: `npm install`

2. **API errors**

   - Verify OpenAI API key is configured correctly
   - Check internet connection
   - Review console logs for detailed error messages

3. **Character loading issues**
   - Ensure `config.js` is properly formatted
   - Check browser console for JavaScript errors

### Debug Mode

Enable detailed logging by checking the browser console (F12) for:

- API request/response details
- Error messages
- Processing status updates

## Contributing

To contribute to the web UI:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Story Flow Generator system.
