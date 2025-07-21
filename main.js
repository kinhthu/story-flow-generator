import fs from "fs";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

import aiServices from "./ai_services.js";
import { CHARACTERS } from "./config.js";

async function generateIdeas(
 topic,
 characters,
 numberOfIdeas = 10,
 duration = 30,
 sceneTime = 5
) {
 try {
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
   console.log("🎭 Đang tạo ý tưởng...");
   console.log(`📖 Chủ đề: ${topic}`);
   console.log(`👥 Nhân vật: ${characters.join(", ")}`);
   console.log("⏳ Vui lòng chờ...\n");

   const parsed = JSON.parse(response);
   // Handle both array and object with stories property
   ideas = Array.isArray(parsed) ? parsed : parsed.ideas || parsed;

   console.log("ideas: ", ideas);
  } catch (parseError) {
   console.error("Error parsing JSON response:", parseError);
   console.log("Raw response:", response);
   throw new Error("Invalid JSON response from OpenAI");
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
   throw new Error("No valid ideas generated");
  }

  console.log(`✅ Đã tạo thành công ${validIdeas.length} ý tưởng!\n`);

  return validIdeas;
 } catch (error) {}
}

function buildCharacterDescription(characters, feelings) {
 let characterDescription = "";
 if (characters.length > 0) {
  characterDescription = "Character details:\n";
  characters.forEach((char, index) => {
   characterDescription += `- ${char.label}`;
   if (char.value) {
    characterDescription += ` (${char.value})`;
   }
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

async function generateStory(item, duration) {
 const { characters, scene_number, feelings, styles, idea } = item;

 try {
  console.log("🎭 Đang tạo câu chuyện...");
  console.log("⏳ Vui lòng chờ...\n");

  const characterDescription = buildCharacterDescription(characters, feelings);

  const story = await aiServices.generateStory(
   duration,
   scene_number,
   characterDescription,
   styles,
   idea
  );

  console.log("Tạo Story thành công: ", story);

  return story;
 } catch (error) {
  console.error("❌ Lỗi:", error.message);
 }
}

async function generateScene(item) {
 const { description, characters, setting, action, feelings, styles } = item;

 try {
  console.log("🎭 Đang tạo cảnh...");
  console.log("⏳ Vui lòng chờ...\n");

  const characterDescription = buildCharacterDescription(characters, feelings);

  const scene = await aiServices.generateScene(
   description,
   characterDescription,
   styles,
   feelings,
   setting,
   action
  );

  console.log("Tạo Scene thành công: ", scene);

  return scene;
 } catch (error) {
  console.error("❌ Lỗi:", error.message);
 }
}

async function writeFile(data) {
 console.log("🎭 Đang ghi file...");
 console.log("⏳ Vui lòng chờ...\n");

 const { topic, characters, ideas, generated_at } = data;

 // create folder for a topic
 if (!fs.existsSync("output")) {
  fs.mkdirSync("output");
 }

 // Create a safe folder name from topic
 // Convert topic to a safe ASCII-only, no-accent, no-special-char file name
 // Chuyển tiếng Việt có dấu sang tiếng Việt không dấu (ví dụ: núi lửa -> nui lua)
 const removeVietnameseTones = (str) => {
  return str
   .normalize("NFD")
   .replace(/[\u0300-\u036f]/g, "") // Xóa dấu thanh, dấu mũ, dấu móc...
   .replace(/đ/g, "d")
   .replace(/Đ/g, "D")
   .replace(/ư/g, "u")
   .replace(/Ư/g, "U")
   .replace(/ă/g, "a")
   .replace(/Ă/g, "A")
   .replace(/â/g, "a")
   .replace(/Â/g, "A")
   .replace(/ê/g, "e")
   .replace(/Ê/g, "E")
   .replace(/ô/g, "o")
   .replace(/Ô/g, "O")
   .replace(/ơ/g, "o")
   .replace(/Ơ/g, "O")
   .replace(/ă/g, "a")
   .replace(/Ă/g, "A")
   .replace(/á|à|ả|ã|ạ/g, "a")
   .replace(/Á|À|Ả|Ã|Ạ/g, "A")
   .replace(/é|è|ẻ|ẽ|ẹ/g, "e")
   .replace(/É|È|Ẻ|Ẽ|Ẹ/g, "E")
   .replace(/í|ì|ỉ|ĩ|ị/g, "i")
   .replace(/Í|Ì|Ỉ|Ĩ|Ị/g, "I")
   .replace(/ó|ò|ỏ|õ|ọ/g, "o")
   .replace(/Ó|Ò|Ỏ|Õ|Ọ/g, "O")
   .replace(/ú|ù|ủ|ũ|ụ/g, "u")
   .replace(/Ú|Ù|Ủ|Ũ|Ụ/g, "U")
   .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, "y")
   .replace(/Ý|Ỳ|Ỷ|Ỹ|Ỵ/g, "Y");
 };
 const safeTopicFolder = removeVietnameseTones(topic)
  .replace(/[^a-zA-Z0-9\s]/g, "_") // Remove special characters
  .replace(/\s+/g, "_"); // Replace spaces with underscores

 const topicFolderPath = `output/${safeTopicFolder}`;
 if (!fs.existsSync(topicFolderPath)) {
  fs.mkdirSync(topicFolderPath, { recursive: true });
 }

 const outputData = {
  topic: topic,
  characters: characters,
  ideas: ideas,
  generated_at: new Date().toISOString(),
 };

 fs.writeFileSync(
  `${topicFolderPath}/ideas.json`,
  JSON.stringify(outputData, null, 2),
  "utf8"
 );

 console.log(`\n💾 Đã lưu kết quả vào file: ${topicFolderPath}/ideas.json`);
}

/**
 * Hàm parse: chuyển đổi chuỗi JSON (có thể có dấu hai chấm đầu dòng hoặc khoảng trắng thừa)
 * thành object. Nếu parse lỗi, trả về null.
 * @param {string|object} input
 * @returns {object|null}
 */
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

/**
 * Main function to demonstrate usage
 */
async function main() {
 try {
  // Example usage
  const topic =
   "Biển, núi lửa, sóng thần, đại dương, hải sản, đáy biển, bơi, lướt sóng, thuyền, vui vẻ, chiến tranh, quái vật";
  const characters = [
   "Capybara",
   "Chubby Cat",
   "Soaring Eagle",
   "Cuddly Panda Cub",
  ];
  const duration = 10; // 30 seconds
  const sceneTime = 5; // 5 seconds

  // generate ideas
  const ideas = await generateIdeas(topic, characters, 1, duration, sceneTime);

  const data = {
   topic,
   characters,
   generated_at: new Date().toISOString(),
   ideas: [],
  };

  // loop each ideas
  for (const idea of ideas) {
   // generate story
   let story = await generateStory(idea, duration);

   story = parseJSON(story);
   if (!story) {
    console.error("❌ Không thể parse story JSON");
    continue;
   }

   let scenesData = [];
   if (story && story.scenes && story.scenes.length > 0) {
    // generate scene
    for (const _scene of story.scenes) {
     let scene = await generateScene({
      ..._scene,
      style: story.styles,
      feeling: story.feelings,
     });
     scene = parseJSON(scene);
     if (!scene) {
      console.error("❌ Không thể parse scene JSON");
      continue;
     }

     scenesData.push({
      ..._scene,
      scene: scene,
     });
    }
   } else {
    console.log("⚠️ Không thể tạo story hoặc story không có scenes");
   }

   data.ideas.push({
    ...idea,
    story: story
     ? {
        ...story,
        scenes: scenesData,
       }
     : null,
   });
  }

  writeFile(data);
 } catch (error) {
  console.error("❌ Lỗi:", error.message);
 }
}

main();
