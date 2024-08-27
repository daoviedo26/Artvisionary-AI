# Artvisionary-AI
Artvisionary-AI es una aplicación impulsada por inteligencia artificial que identifica y ofrece información detallada sobre obras de arte, monumentos y otros objetos culturales a partir de imágenes. Además, sugiere lugares de interés cercanos, conectando a los usuarios con la historia y cultura a su alrededor.

# Ejecutar Backend
cd backend 

# En Mac
cd mac
source app/bin/activate

# En Windows
cd win 
.\app\Scripts\Activate

pip install -r requirements.txt

pip uninstall torch
pip install torch

python main.py

# Ejecutar Frontend
cd frontend
npm install
npm run dev