import { useState } from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Crear una URL temporal para mostrar la imagen
    }
  };

  const handleScan = () => {
    // Aquí añadirás la lógica para enviar la imagen al backend y obtener el resultado
    setResult('Nombre detectado en la imagen'); // Esto es un ejemplo estático
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>ArtVisionary</h1>
        <p class="txt-descripcion">Descubre el nombre de cada obra de arte con solo escanearla.</p>
      </header>
      <main className="app-main">
        <div className="upload-section">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {image && (
            <div className="image-preview">
              <img src={image} alt="Preview" />
            </div>
          )}
          <button onClick={handleScan} disabled={!image}>
            Escanear Imagen
          </button>
        </div>
        {result && (
          <div className="result-section">
            <h2>Resultado:</h2>
            <p>{result}</p>
          </div>
        )}
      </main>
      <footer className="app-footer">
        <p>© 2024 ArtVisionary. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;

