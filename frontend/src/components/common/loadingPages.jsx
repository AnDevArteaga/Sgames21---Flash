import { useEffect, useState } from "react";
import logo from "../../assets/logoHorizontalBlanco.png";

const AnimatedLogo = () => {
  const [size, setSize] = useState(130);
  const [opacity, setOpacity] = useState(0.8);

  useEffect(() => {
    const interval = setInterval(() => {
      setSize((prevSize) => (prevSize === 130 ? 150 : 130));
      setOpacity((prevOpacity) => (prevOpacity === 0.8 ? 1 : 0.8));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-900">
      <img
        src= {logo}
                alt="Logo"
        className="transition-all duration-1000"
        style={{ width: `${size}px`, opacity }}
      />
    </div>
  );
};

export default AnimatedLogo;