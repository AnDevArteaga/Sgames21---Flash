
const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-blur bg-opacity-50 z-100">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg text-white font-semibold mb-4">¿Cerrar sesión?</h2>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition cursor-pointer"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};



export default LogoutModal;