import json
import logging
from openai import OpenAI
import google.generativeai as genai
from config.settings import settings

logger = logging.getLogger(__name__)

async def call_ai_model(
    user_message: str,
    system_prompt: str,
    provider: str = "openai",
    model: str = None,
    parse_json: bool = True,
    openai_api_key: str = None,
    gemini_api_key: str = None
):
    if provider == "gemini":
        api_key = gemini_api_key or settings.gemini_api_key
        model_name = model or settings.gemini_default_model
        genai.configure(api_key=api_key)
        gemini_model = genai.GenerativeModel(model_name)
        response = await gemini_model.generate_content_async(system_prompt + "\n\n" + user_message)
        text = response.text
    else:
        api_key = openai_api_key or settings.openai_api_key
        model_name = model or settings.openai_default_model
        client = OpenAI(api_key=api_key)
        response = client.chat.completions.create(
            model=model_name,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            temperature=0.7,
            max_tokens=2000,
            response_format={"type": "json_object"}
        )
        text = response.choices[0].message.content
    if parse_json:
        try:
            return json.loads(text)
        except Exception as e:
            logger.error(f"Failed to parse AI response: {e}")
            logger.error(f"Raw response: {text}")
            raise ValueError("Invalid JSON response from AI")
    return text