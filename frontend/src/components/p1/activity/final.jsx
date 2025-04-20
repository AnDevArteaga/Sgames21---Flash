import React, { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import { motion } from 'framer-motion';
import bg from "../../../assets/final.png"

const Sparkle = ({ size, color, top, left, delay }) => {
  return (
    <motion.div
      className="absolute"
      style={{ top, left }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        rotate: [0, 180]
      }}
      transition={{ 
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill={color} />
      </svg>
    </motion.div>
  );
};

const CelebrationComponent = ({ 
  imageUrl = bg,
  altText = "Celebration image",
  title = "Felicidades!",
  subtitle = "Hemos completado la fase 1"
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isConfettiActive, setIsConfettiActive] = useState(true);
  
  // Generate random sparkles
  const sparkles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    size: Math.random() * 10 + 10,
    color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#7A306C', '#1A535C'][Math.floor(Math.random() * 5)],
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2
  }));

  // Set dimensions for confetti
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    

    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-purple-100 z-0" />
      
      {/* Confetti */}
      {isConfettiActive && (
        <ReactConfetti
          width={dimensions.width}
          height={dimensions.height}
          recycle={true}
          numberOfPieces={200}
          gravity={0.05}
        />
      )}
      
      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          size={sparkle.size}
          color={sparkle.color}
          top={sparkle.top}
          left={sparkle.left}
          delay={sparkle.delay}
        />
      ))}
      
      {/* Main content */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center p-8 rounded-2xl bg-white bg-opacity-70 backdrop-blur-md shadow-xl border border-white border-opacity-40 max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="relative mb-6 overflow-hidden rounded-xl shadow-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img 
            src={imageUrl} 
            alt={altText}
            className="w-64 h-64 object-cover"
          />
          
          {/* Image overlay shimmer effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            initial={{ x: -200 }}
            animate={{ x: 400 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
        </motion.div>
        
        <motion.h2 
          className="text-2xl font-bold text-blue-600 mb-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {title}
        </motion.h2>
        
        <motion.p
          className="text-gray-700 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default CelebrationComponent;