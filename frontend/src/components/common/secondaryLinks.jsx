  // Componente para los enlaces secundarios
export const SecondaryLink = ({ children, onClick }) => (
    <button
      className="text-white hover:text-pruple-800 hover:underline cursor-pointer transition-colors text-sm font-medium"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
    >
      {children}
    </button>
  );
