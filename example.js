const { generateStories } = require("./main.js");

/**
 * Example usage of the story generator
 */
async function runExamples() {
 console.log("🎭 Story Flow Generator - Examples\n");

 // Example 1: Friendship theme
 console.log("📖 Example 1: Tình bạn và sự chia sẻ");
 try {
  const stories1 = await generateStories("Tình bạn và sự chia sẻ", [
   "capybara",
   "chuppy cat",
   "bunny",
   "panda",
  ]);
  console.log(`✅ Tạo thành công ${stories1.length} truyện\n`);
 } catch (error) {
  console.error("❌ Lỗi:", error.message);
 }

 // Example 2: Adventure theme
 console.log("📖 Example 2: Cuộc phiêu lưu trong rừng");
 try {
  const stories2 = await generateStories("Cuộc phiêu lưu trong rừng", [
   "fox",
   "bear",
   "deer",
   "owl",
   "squirrel",
  ]);
  console.log(`✅ Tạo thành công ${stories2.length} truyện\n`);
 } catch (error) {
  console.error("❌ Lỗi:", error.message);
 }

 // Example 3: Learning theme
 console.log("📖 Example 3: Học hỏi và khám phá");
 try {
  const stories3 = await generateStories("Học hỏi và khám phá", [
   "elephant",
   "monkey",
   "turtle",
   "bird",
   "rabbit",
  ]);
  console.log(`✅ Tạo thành công ${stories3.length} truyện\n`);
 } catch (error) {
  console.error("❌ Lỗi:", error.message);
 }
}

/**
 * Custom story generator function
 */
async function generateCustomStory(topic, characters, storyCount = 10) {
 console.log(`🎭 Tạo ${storyCount} truyện về chủ đề: "${topic}"`);
 console.log(`👥 Với nhân vật: ${characters.join(", ")}\n`);

 try {
  const stories = await generateStories(topic, characters);

  console.log("📚 Kết quả:");
  stories.forEach((story, index) => {
   console.log(`\n${index + 1}. Truyện ${index + 1}:`);
   console.log(`   Nhân vật: ${story.characters.join(", ")}`);
   console.log(`   Nội dung: ${story.story.substring(0, 100)}...`);
  });

  return stories;
 } catch (error) {
  console.error("❌ Lỗi:", error.message);
  return [];
 }
}

// Export functions
module.exports = {
 runExamples,
 generateCustomStory,
};

// Run examples if this file is executed directly
if (require.main === module) {
 runExamples();
}
