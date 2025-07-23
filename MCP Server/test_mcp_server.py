#!/usr/bin/env python3
import asyncio
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent / "src"))
from src.services import IdeaService, StoryService, SceneService
from src.models.schemas import IdeaRequest, StoryRequest, SceneRequest

async def test_idea_service():
    print("🧪 Testing Idea Service...")
    service = IdeaService()
    request = IdeaRequest(
        topic="Tình bạn và sự chia sẻ",
        characters=["capybara", "cat", "bunny"],
        numberOfIdeas=3,
        duration=30,
        sceneTime=5
    )
    try:
        ideas = await service.generate_ideas(request)
        print(f"✅ Generated {len(ideas)} ideas:")
        for i, idea in enumerate(ideas, 1):
            print(f"  {i}. {idea.idea}")
            print(f"     Characters: {idea.characters}")
            print(f"     Scenes: {idea.scene_number}")
            print(f"     Feelings: {idea.feelings}")
            print(f"     Style: {idea.styles}")
            print()
        return ideas[0] if ideas else None
    except Exception as e:
        print(f"❌ Error: {e}")
        return None

async def test_story_service(idea):
    print("🧪 Testing Story Service...")
    if not idea:
        print("❌ No idea provided")
        return None
    service = StoryService()
    request = StoryRequest(
        videoDuration=30,
        numberOfScenes=6,
        characterDescription=f"Characters: {', '.join(idea.characters)}",
        style=idea.styles,
        idea=idea.idea
    )
    try:
        story = await service.generate_story(request)
        print(f"✅ Generated story: {story.title}")
        print(f"   Description: {story.description}")
        print(f"   Hashtags: {story.hashtags}")
        print(f"   Hook: {story.hook}")
        print(f"   Scenes: {len(story.scenes)}")
        return story
    except Exception as e:
        print(f"❌ Error: {e}")
        return None

async def test_scene_service(story):
    print("🧪 Testing Scene Service...")
    if not story or not story.scenes:
        print("❌ No story or scenes provided")
        return None
    service = SceneService()
    scene = story.scenes[0]
    request = SceneRequest(
        sceneDescription=scene.description,
        characterDescription=f"Characters: {', '.join(scene.characters)}",
        style="cartoon, colorful",
        feelings="happy, excited",
        setting=scene.setting,
        action=scene.action
    )
    try:
        scene_prompts = await service.generate_scene(request)
        print(f"✅ Generated scene prompts:")
        print(f"   Image prompt: {scene_prompts.image_prompt[:100]}...")
        print(f"   Video prompt: {scene_prompts.video_prompt[:100]}...")
        print(f"   Master key frame: {scene_prompts.master_key_frame}")
        return scene_prompts
    except Exception as e:
        print(f"❌ Error: {e}")
        return None

async def main():
    print("🚀 Starting Story Flow MCP Server Tests...\n")
    idea = await test_idea_service()
    print("-" * 50)
    story = await test_story_service(idea)
    print("-" * 50)
    scene_prompts = await test_scene_service(story)
    print("-" * 50)
    print("🎉 All tests completed!")

if __name__ == "__main__":
    asyncio.run(main()) 