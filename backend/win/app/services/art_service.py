from openai import OpenAI
from ..config import Config

client = OpenAI(api_key = Config.OPENAI_API_KEY)

def identify_artistic_element(caption):
    prompt = f"""
    You are an expert in identifying cultural, artistic, and historical elements, including paintings, sculptures, and historical monuments or buildings. I will provide a brief description of a cultural or artistic element, and your task is to identify the name of the work and the most relevant creator based on the description provided.

    Instructions:

    Carefully analyze the provided description.
    Identify the cultural, artistic, or historical element referred to in the description.
    Provide only the name of the work followed by the name of the creator.
    Description: {caption}
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content
