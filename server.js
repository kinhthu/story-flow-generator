import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

import aiServices from "./ai_services.js";
import { CHARACTERS } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Production environment variables
const NODE_ENV = process.env.NODE_ENV || "development";

// Middleware
app.use(
 cors({
  origin:
   NODE_ENV === "production"
    ? ["https://your-domain.com"] // Thay đổi domain của bạn
    : ["http://localhost:3000"],
  credentials: true,
 })
);
app.use(express.json());
app.use(express.static(__dirname));

// Serve the main HTML file
app.get("/", (req, res) => {
 res.sendFile(path.join(__dirname, "index.html"));
});

// API endpoint to get characters
app.get("/api/characters", (req, res) => {
 res.json({ characters: CHARACTERS });
});

// API endpoint to generate ideas
app.post("/api/generate-ideas", async (req, res) => {
 try {
  const { topic, characters, numberOfIdeas, duration, sceneTime } = req.body;

  console.log("Generating ideas for:", {
   topic,
   characters,
   numberOfIdeas,
   duration,
   sceneTime,
  });

  const response = await aiServices.generateIdeas(
   topic,
   characters,
   numberOfIdeas,
   duration,
   sceneTime
  );

  // Parse JSON response
  let ideas;
  try {
   const parsed = JSON.parse(response);
   ideas = Array.isArray(parsed) ? parsed : parsed.ideas || parsed;
  } catch (parseError) {
   console.error("Error parsing JSON response:", parseError);
   console.log("Raw response:", response);
   return res.status(500).json({ error: "Invalid JSON response from OpenAI" });
  }

  // Validate and clean the response
  const validIdeas = ideas.filter(
   (idea) =>
    idea &&
    typeof idea.idea === "string" &&
    idea.idea.trim().length > 0 &&
    Array.isArray(idea.characters) &&
    idea.characters.length > 0
  );

  if (validIdeas.length === 0) {
   return res.status(500).json({ error: "No valid ideas generated" });
  }

  res.json({ ideas: validIdeas });
 } catch (error) {
  console.error("Error generating ideas:", error);
  res.status(500).json({ error: error.message });
 }
});

// API endpoint to generate stories
app.post("/api/generate-stories", async (req, res) => {
 try {
  const { ideas, duration } = req.body;

  console.log("Generating stories for:", {
   ideasCount: ideas.length,
   duration,
  });

  const stories = [];

  for (const idea of ideas) {
   try {
    const characterDescription = buildCharacterDescription(
     idea.characters,
     idea.feelings
    );

    const storyResponse = await aiServices.generateStory(
     duration,
     idea.scene_number,
     characterDescription,
     idea.styles,
     idea.idea
    );

    const story = parseJSON(storyResponse);
    if (story) {
     stories.push(story);
    }
   } catch (error) {
    console.error("Error generating story for idea:", idea.idea, error);
    // Continue with other ideas even if one fails
   }
  }

  res.json({ stories });
 } catch (error) {
  console.error("Error generating stories:", error);
  res.status(500).json({ error: error.message });
 }
});

// API endpoint to generate scenes
app.post("/api/generate-scenes", async (req, res) => {
 try {
  const { stories } = req.body;

  console.log("Generating scenes for:", { storiesCount: stories.length });

  const scenesData = [];

  for (const story of stories) {
   try {
    const storyScenes = {
     storyTitle: story.title,
     storyHook: story.hook,
     scenes: [],
    };

    if (story.scenes && story.scenes.length > 0) {
     for (const scene of story.scenes) {
      try {
       const characterDescription = buildCharacterDescription(
        scene.characters,
        story.feelings
       );

       const sceneResponse = await aiServices.generateScene(
        scene.description,
        characterDescription,
        story.styles,
        story.feelings,
        scene.setting,
        scene.action
       );

       const sceneData = parseJSON(sceneResponse);
       if (sceneData) {
        storyScenes.scenes.push({
         ...scene,
         scene: sceneData,
        });
       }
      } catch (error) {
       console.error("Error generating scene:", scene.description, error);
       // Continue with other scenes even if one fails
      }
     }
    }

    scenesData.push(storyScenes);
   } catch (error) {
    console.error("Error processing story:", story.title, error);
    // Continue with other stories even if one fails
   }
  }

  res.json({ scenes: scenesData });
 } catch (error) {
  console.error("Error generating scenes:", error);
  res.status(500).json({ error: error.message });
 }
});

// Helper function to build character description
function buildCharacterDescription(characters, feelings) {
 let characterDescription = "";
 if (characters && characters.length > 0) {
  characterDescription = "Character details:\n";
  characters.forEach((char, index) => {
   characterDescription += `- ${char}`;
   if (index < characters.length - 1) {
    characterDescription += "\n";
   }
  });
  characterDescription += "\n\n";
 } else {
  characterDescription = "No specific characters in this scene.\n\n";
 }

 // Add feelings to the description
 if (feelings && feelings !== "") {
  characterDescription += `General character expressions: ${feelings}.\n\n`;
 }

 return characterDescription;
}

// Helper function to parse JSON
function parseJSON(input) {
 if (typeof input !== "string") {
  return input;
 }
 try {
  let str = input.trim();
  if (str.startsWith(":")) {
   str = str.slice(1).trim();
  }
  return JSON.parse(str);
 } catch (e) {
  console.error("❌ Không thể parse JSON:", e.message);
  return null;
 }
}

// Start server
app.listen(PORT, () => {
 console.log(`🚀 Server is running on port ${PORT}`);
 console.log(`📱 Environment: ${NODE_ENV}`);
 if (NODE_ENV === "development") {
  console.log(`🌐 Web UI available at http://localhost:${PORT}`);
 } else {
  console.log(`🌐 Web UI deployed to production`);
 }
});
