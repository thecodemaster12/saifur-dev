import { useState } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";

const files = {
  "App.jsx": `import MainLayout from "./layouts/MainLayout"

const App = () => {
  return (
    <>
      <MainLayout />
    </>
  )
}

export default App`,

  "Terminal.jsx": `const Terminal = () => {
  // A terminal that runs custom commands
  const commands = {
    about: () => "Hi! I'm Saifur Rahman.",
    skills: () => "React, Laravel, Node.js",
    projects: () => "OS Portfolio, EMS"
  };
  // ...
}`,

  "Notes.jsx": `// A Notes application using framer-motion
// Drag note items to move them around
const Notes = () => {
  const [notes, setNotes] = useState([...]);
  // ...
}`
};

const VSCode = ({ isVSCodeOpen, toggleVSCode, isActive, onFocus, desktopRef }) => {
  const [selectedFile, setSelectedFile] = useState("App.jsx");
  const dragControls = useDragControls();

  const macWindowVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.3, 
      y: 300, 
      filter: "blur(10px)" 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.2, 
      y: 400, 
      filter: "blur(8px)",
      transition: { 
        duration: 0.25, 
        ease: [0.25, 1, 0.5, 1] 
      }
    }
  };

  return (
    <AnimatePresence>
      {isVSCodeOpen && (
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
          style={{ transformOrigin: "bottom center", zIndex: isActive ? 40 : 10 }}
          className="absolute top-[15%] left-[20%] w-[750px] h-[480px] overflow-hidden border border-gray-700 bg-gray-900/95 rounded-lg shadow-2xl backdrop-blur-md flex flex-col font-sans"
        >
          {/* Header */}
          <div 
            className="sticky top-0 bg-gray-950 p-2.5 flex items-center justify-between cursor-grab active:cursor-grabbing select-none border-b border-gray-800/60"
            onPointerDown={(e) => {
              dragControls.start(e);
              onFocus();
            }}
          >
            <div className="flex gap-2">
              <div onClick={toggleVSCode} className="cursor-pointer w-[13px] h-[13px] bg-red-400 rounded-full"></div>
              <div className="cursor-pointer w-[13px] h-[13px] bg-yellow-400 rounded-full"></div>
              <div className="cursor-pointer w-[13px] h-[13px] bg-green-400 rounded-full"></div>
            </div>
            <div className="flex-grow text-center text-xs font-medium text-gray-400">
              VS Code — {selectedFile}
            </div>
            <div className="w-[45px]"></div> {/* Spacer to center the title */}
          </div>

          {/* Editor Body */}
          <div className="grid grid-cols-[200px_1fr] h-[calc(100%-40px)] text-sm">
            {/* Sidebar */}
            <div className="sidebar bg-gray-950/70 border-r border-gray-800/60 p-3 select-none flex flex-col gap-2">
              <div className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Explorer</div>
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-400 font-semibold pl-1 mb-1">src</div>
                {Object.keys(files).map((filename) => (
                  <button
                    key={filename}
                    onClick={() => setSelectedFile(filename)}
                    className={`text-left pl-3 py-1 rounded cursor-pointer transition-all ${
                      selectedFile === filename 
                        ? "bg-gray-800 text-blue-400 font-medium" 
                        : "text-gray-400 hover:bg-gray-800/40 hover:text-gray-200"
                    }`}
                  >
                    📄 {filename}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Code Editor */}
            <div className="main-content bg-gray-900/40 p-4 flex flex-col overflow-auto font-mono text-xs">
              <div className="flex border-b border-gray-800/50 pb-2 mb-3 select-none">
                <span className="text-xs font-semibold text-blue-400 bg-gray-800/80 px-3 py-1 rounded-t border-t border-x border-gray-700/40">
                  {selectedFile}
                </span>
              </div>
              <pre className="whitespace-pre-wrap text-gray-300 font-fira-code leading-relaxed">
                <code>{files[selectedFile]}</code>
              </pre>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VSCode;