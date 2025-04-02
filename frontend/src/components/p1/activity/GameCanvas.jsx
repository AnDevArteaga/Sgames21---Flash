import React from 'react';
import { Stage, Sprite, Container } from '@inlet/react-pixi';
import { useGameStore } from './gameStore';

export default function GameCanvas() {
  const toggleSopa = useGameStore((state) => state.toggleSopa);
  const showSopa = useGameStore((state) => state.showSopa);

  const handlePointerDown = () => {
    toggleSopa();
  };

  return (
    <div className="relative w-full h-screen bg-blue-200">
      <Stage width={window.innerWidth} height={window.innerHeight} options={{ backgroundColor: 0x87ceeb }}>
        <Container>
          {/* Suelo */}
          <Sprite
            image="https://i.imgur.com/LzQbkL7.png"
            x={0}
            y={window.innerHeight - 80}
            width={window.innerWidth}
            height={80}
          />

          {/* Personaje */}
          <Sprite
            image="https://i.imgur.com/rVX1Rfb.png"
            x={200}
            y={window.innerHeight - 180}
            width={100}
            height={100}
            interactive={true}
            pointerdown={handlePointerDown}
          />
        </Container>
      </Stage>

      {/* Ventana Sopa de letras */}
      {showSopa && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white shadow-xl p-6 rounded-xl w-[500px]">
          <h2 className="text-lg font-bold mb-2">🧩 Sopa de Letras</h2>
          <p className="text-sm text-gray-700">(Aquí iría la sopa de letras)</p>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={toggleSopa}
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Iconos fijos en la esquina inferior derecha */}
      <div className="absolute bottom-4 right-4 flex gap-3">
        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" alt="icon1" className="w-10 h-10 cursor-pointer" />
        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828899.png" alt="icon2" className="w-10 h-10 cursor-pointer" />
      </div>
    </div>
  );
}