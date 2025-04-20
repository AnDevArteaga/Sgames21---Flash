import { useP1Context } from "../../contexts/p1Context";
import video from "../../assets/KZUM8WZFUJLYBTV9.mp4";

const FullScreenView = ({ startAgentMessage }) => {
  const { isFullScreenVisible, setIsFullScreenVisible, stage } = useP1Context();

  if (!isFullScreenVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-800/90 flex justify-center items-center z-100">
      <div className="bg-white p-4 rounded-lg shadow-lg text-center w-full max-w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-600">
            Observa atentamente el siguiente video
          </h2>

        </div>
        {/* Video */}
        <video
          className="w-full h-auto rounded-lg mt-4"
          controls
          autoPlay
        >
          <source src={video} type="video/mp4" />
          Tu navegador no soporta videos.
        </video>

        {/* Botones */}
        <div className="mt-4">
          {stage === "Introducción"
            ? (
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer"
                onClick={() => {
                  setIsFullScreenVisible(false);
                  startAgentMessage("start_p1");
                }}
              >
                Continuar
              </button>
            )
            : (
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer"
                onClick={() => setIsFullScreenVisible(false)}
              >
                Cerrar
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default FullScreenView;
