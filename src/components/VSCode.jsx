import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Window from "./Window";

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

const VSCode = ({ isVSCodeOpen, toggleVSCode, isActive, onFocus, desktopRef, isDarkMode }) => {
  const [selectedFile, setSelectedFile] = useState("App.jsx");

  return (
    <AnimatePresence>
      {isVSCodeOpen && (
        <Window
          isOpen={isVSCodeOpen}
          onClose={toggleVSCode}
          title={`VS Code — ${selectedFile}`}
          isActive={isActive}
          onFocus={onFocus}
          desktopRef={desktopRef}
          isDarkMode={isDarkMode}
          className="top-[15%] left-[20%] w-[750px] h-[480px]"
        >
          {/* Editor Body */}
          <div className="grid grid-cols-[200px_1fr] flex-grow text-sm overflow-hidden">
            {/* Sidebar */}
            <div className={`sidebar p-3 select-none flex flex-col gap-2 border-r transition-colors duration-500 ${
              isDarkMode 
                ? "bg-gray-950/70 border-gray-800/60" 
                : "bg-gray-100 border-gray-200"
            }`}>
              <div className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Explorer</div>
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-400 font-semibold pl-1 mb-1">src</div>
                {Object.keys(files).map((filename) => (
                  <button
                    key={filename}
                    onClick={() => setSelectedFile(filename)}
                    className={`text-left pl-3 py-1 rounded cursor-pointer transition-all ${
                      selectedFile === filename 
                        ? (isDarkMode ? "bg-gray-800 text-blue-400 font-medium" : "bg-blue-100/80 text-blue-700 font-semibold")
                        : (isDarkMode ? "text-gray-400 hover:bg-gray-800/40 hover:text-gray-200" : "text-gray-600 hover:bg-gray-200 hover:text-gray-800")
                    }`}
                  >
                    📄 {filename}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Code Editor */}
            <div className={`main-content p-4 flex flex-col overflow-auto font-mono text-xs transition-colors duration-500 ${
              isDarkMode 
                ? "bg-gray-900/40" 
                : "bg-white"
            }`}>
              <div className={`flex border-b pb-2 mb-3 select-none transition-colors duration-500 ${
                isDarkMode ? "border-gray-800/50" : "border-gray-200"
              }`}>
                <span className={`text-xs font-semibold px-3 py-1 rounded-t border-t border-x transition-colors duration-500 ${
                  isDarkMode 
                    ? "text-blue-400 bg-gray-800/80 border-gray-700/40" 
                    : "text-blue-600 bg-gray-50 border-gray-200"
                }`}>
                  {selectedFile}
                </span>
              </div>
              <pre className={`whitespace-pre-wrap font-fira-code leading-relaxed transition-colors duration-500 ${
                isDarkMode ? "text-gray-300" : "text-gray-800"
              }`}>
                <code>{files[selectedFile]}</code>
              </pre>
            </div>
          </div>
        </Window>
      )}
    </AnimatePresence>
  );
};

export default VSCode;