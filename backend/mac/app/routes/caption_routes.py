from flask import Blueprint, request, jsonify
from ..services.caption_service import generate_caption
from ..services.art_service import identify_artistic_element

caption_routes = Blueprint('caption_routes', __name__)

@caption_routes.route('/caption', methods=['POST'])
def caption_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    image_file = request.files['image']
    
    # Genera la descripción para la imagen
    caption = generate_caption(image_file)
    
    # Identifica el elemento artístico
    response = identify_artistic_element(caption)
    
    return jsonify({'response': response})
