import agent1 from "../../assets/4x/agent.png"
import agent2 from "../../assets/4x/agent2.png"
import agent3 from "../../assets/4x/agent3.png"

import { useState, useEffect } from "react";

const Agent = ( {isTalking} ) => {

  const images = [agent1, agent2, agent3]; // Lista de imágenes
  const [currentImage, setCurrentImage] = useState(images[0]); // Imagen actual

  useEffect(() => {
    if (isTalking) {
      const interval = setInterval(() => {
        // Filtra la imagen actual para evitar que se repita
        const availableImages = images.filter(img => img !== currentImage);
        // Selecciona una imagen aleatoria de las opciones restantes
        const newImage = availableImages[Math.floor(Math.random() * availableImages.length)];
        setCurrentImage(newImage);
      }, 200); // Cambia cada 200ms para simular el habla

      return () => clearInterval(interval);
    }
  }, [isTalking, currentImage]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg flex items-center justify-center">

      {/* Imagen del muñeco */}
      <img 
        src={currentImage} 
        alt="Muñeco" 
        className="relative w-2/3 h-auto object-cover translate-y-20"
        style={{
          userSelect: "none",
          pointerEvents: "none",
          filter: "drop-shadow(2px 10px 10px rgba(0, 0, 0, 0.6))"

        }}
      />
    </div>
  );
};

export default Agent;
