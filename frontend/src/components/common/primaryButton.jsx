 // Componente para los botones principales
 export const PrimaryButton = ({ children, onClick, type }) => (
    <button
      type={type || ""}
      className="w-full py-3 bg-purple-800 text-white rounded-lg font-medium shadow-md hover:bg-purple-900 transition-colors cursor-pointer"
      onClick={onClick || null}
      whileHover="hover"
      whileTap="tap"
    >
      {children}
    </button>
  );
