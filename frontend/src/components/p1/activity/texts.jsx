import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function DraggableModal( { title, text, handleClose } ) {
    const close = () => {
        handleClose()
    }
    return (
        <>
                <div className="fixed inset-0 bg-transparent flex items-center justify-center">
                    <motion.div
                        drag
                        dragConstraints={{
                            left: -200,
                            right: 200,
                            top: -200,
                            bottom: 200,
                        }}
                        className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl w-4/7 cursor-grab"
                    >
                        <div className="flex justify-between items-center border-b border-purple-600 pb-2 mb-4">
                            <h2 className="text-lg font-semibold text-purple-600">
                                {title}
                            </h2>
                            <button
                                onClick={close}
                                className="text-gray-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <p className="text-base">
                            {text}
                        </p>
                    </motion.div>
                </div>
        </>
    );
}
