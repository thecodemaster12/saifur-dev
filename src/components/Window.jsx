import { motion, useDragControls } from "framer-motion";

const Window = ({
  isOpen,
  onClose,
  title,
  isActive,
  onFocus,
  desktopRef,
  isDarkMode,
  className = "",
  style = {},
  customHeader = null,
  children
}) => {
  const dragControls = useDragControls();

  const macWindowVariants = {
    hidden: { opacity: 0, scale: 0.3, y: 300, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.2, 
      y: 400, 
      filter: "blur(8px)",
      transition: { duration: 0.25 }
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      variants={macWindowVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      drag
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={desktopRef}
      dragMomentum={false}
      dragElastic={0}
      onPointerDown={onFocus}
      style={{ transformOrigin: "bottom center", zIndex: isActive ? 40 : 10, ...style }}
      className={`absolute overflow-hidden border rounded-lg shadow-2xl backdrop-blur-md flex flex-col font-sans transition-colors duration-500 ${
        isDarkMode 
          ? "border-gray-700 bg-gray-950 text-gray-200" 
          : "border-gray-300 bg-white text-gray-800"
      } ${className}`}
    >
      {/* Window Header / Title Bar / Drag Handle */}
      <div 
        className={`p-2.5 flex items-center justify-between cursor-grab active:cursor-grabbing select-none border-b shrink-0 transition-colors duration-500 ${
          isDarkMode 
            ? "bg-gray-950 border-gray-800/60 text-gray-400" 
            : "bg-gray-100 border-gray-200 text-gray-600"
        }`}
        onPointerDown={(e) => {
          const tagName = e.target.tagName;
          if (
            tagName === "INPUT" || 
            tagName === "BUTTON" || 
            e.target.closest("button") || 
            e.target.closest("input")
          ) {
            return;
          }
          dragControls.start(e);
          onFocus();
        }}
      >
        {customHeader ? (
          customHeader
        ) : (
          <>
            {/* Window controls dots */}
            <div className="flex items-center gap-2 w-[80px]">
              <button 
                onClick={onClose} 
                className="cursor-pointer w-[13px] h-[13px] bg-red-400 hover:bg-red-500 rounded-full border-none outline-none"
              />
              <div className="w-[13px] h-[13px] bg-yellow-400 rounded-full" />
              <div className="w-[13px] h-[13px] bg-green-400 rounded-full" />
            </div>

            {/* Window title */}
            <div className="flex-grow text-center text-xs font-semibold">
              {title}
            </div>

            {/* Spacer to center the title */}
            <div className="w-[80px]" />
          </>
        )}
      </div>

      {/* Window Body */}
      <div className="flex-grow flex flex-col overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};

export default Window;
