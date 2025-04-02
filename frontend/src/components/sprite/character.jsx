import React, { useEffect, useState } from 'react';
import sprite1 from '../../assets/sprites/Recurso1sprite.png'
import sprite2 from '../../assets/sprites/Recurso2sprite.png'
import sprite3 from '../../assets/sprites/Recurso3sprite.png'
import sprite4 from '../../assets/sprites/Recurso4sprite.png'
import sprite5 from '../../assets/sprites/Recurso5sprite.png'
import sprite6 from '../../assets/sprites/Recurso6sprite.png'
import sprite7 from '../../assets/sprites/Recurso7sprite.png'

const walkFrames = [
    sprite2,
    sprite3,
    sprite4,
    sprite5,
    sprite6,
    sprite7
];

const Personaje = ({ isMoving }) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    let interval;

    if (isMoving) {
      interval = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % walkFrames.length);
      }, 100); // Cambia de frame cada 100ms
    } else {
      setCurrentFrame(0); // Resetear al frame inicial cuando se detiene
    }

    return () => clearInterval(interval);
  }, [isMoving]);

  const imageSrc = isMoving ? walkFrames[currentFrame] : sprite1;

  return (
    <div className="w-16 h-24 absolute bottom-24 left-1/4 z-10">
      <img
        src={imageSrc}
        alt="personaje"
        className="w-full h-full object-contain pointer-events-none select-none"
      />
    </div>
  );
};

export default Personaje;
