from flask import Flask
from flask_cors import CORS
from .routes.caption_routes import caption_routes

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('config.py', silent=True)

    CORS(app, resources={r"/caption": {"origins": "http://localhost:5173"}})
    
    app.register_blueprint(caption_routes)
    return app
