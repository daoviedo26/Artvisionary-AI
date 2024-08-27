from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
import io
from ..config import Config

# Cargar el procesador y el modelo
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")

def generate_caption(image_file):
    image = Image.open(io.BytesIO(image_file.read())).convert('RGB')
    
    text = "a photography of"
    inputs = processor(image, text, return_tensors="pt")
    out = model.generate(**inputs, max_new_tokens=50)
    caption = processor.decode(out[0], skip_special_tokens=True)
    
    return caption
