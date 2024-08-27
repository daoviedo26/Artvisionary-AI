import { useState } from "react";
import "./App.css";
import Progress from "react-circle-progress-bar";
import logo from "./assets/logo.png";

function App() {
  const [progress, setProgress] = useState(0);
  const [progressSubtitle, setProgressSubtitle] = useState("");
  const [responseTime, setResponseTime] = useState(null);

  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Crear una URL temporal para mostrar la imagen
    }
  };

  const handleScan = async () => {
    if (!image) return;

    const startTime = Date.now();

    setProgress(25); // Inicia el progreso
    setProgressSubtitle("Procesando imagen");

    try {
      const fileInput = document.querySelector('input[type="file"]');
      const formData = new FormData();
      formData.append("image", fileInput.files[0]);

      setProgress(50); // Progreso intermedio
      setProgressSubtitle("Analizando contenido");

      const apiResponse = await fetch("http://127.0.0.1:5000/caption", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      setProgress(75); // Progreso casi completo
      setProgressSubtitle("Generando respuesta");

      const data = await apiResponse.json();
      setResult(data.response || "No result found");

      const endTime = Date.now();
      const duration = endTime - startTime;
      setResponseTime(duration);

      setProgress(100); // Progreso completo
      setProgressSubtitle("Respuesta generada");
    } catch (error) {
      console.error("Error:", error);
      setResult("Error occurred while scanning the image");
      setProgress(0); // Reinicia en caso de error
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} alt="ArtVisionary Logo" className="logo" height={96} />
        <h1>ArtVisionary</h1>
        <p className="txt-descripcion">
          Descubre el nombre de cada obra de arte con solo escanearla.
        </p>
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
        {progress > 0 && (
          <div className="progress-section">
            <Progress
              progress={progress}
              subtitle={progressSubtitle}
              strokeWidth={4}
              ballStrokeWidth={16}
              transitionDuration={0.5}
              background="#dde2e9"
              gradient={[
                { stop: 0.0, color: "#00bc9b" },
                { stop: 1, color: "#5eaefd" },
              ]}
            />
          </div>
        )}
        {result && (
          <div className="result-section">
            <h2>Resultado:</h2>
            <p>{result}</p>
            {responseTime !== null && (
              <small>Tiempo de respuesta: {responseTime} ms</small> // Muestra el tiempo de respuesta
            )}
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
