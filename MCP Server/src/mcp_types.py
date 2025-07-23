from typing import List
from pydantic import BaseModel

class TextContent(BaseModel):
    type: str
    text: str

class Tool(BaseModel):
    name: str
    description: str

class ToolResult(BaseModel):
    content: List[TextContent] 