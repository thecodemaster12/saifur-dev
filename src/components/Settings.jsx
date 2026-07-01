import { useState } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";

const Settings = ({ 
  isSettingsOpen, 
  toggleSettings, 
  isActive, 
  onFocus, 
  desktopRef,
  wallpaper,
  setWallpaper,
  brightness,
  setBrightness,
  volume,
  setVolume,
  isDarkMode,
  setIsDarkMode
}) => {
  const [activeTab, setActiveTab] = useState("wallpaper");
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

  const wallpapers = [
    { name: "macOS Wallpaper", value: "/src/assets/walpaper.jpeg", preview: "bg-blue-600" },
    { name: "Cosmic Aurora", value: "bg-gradient-to-br from-indigo-950 via-slate-900 to-black", preview: "bg-gradient-to-br from-indigo-950 via-slate-900 to-black" },
    { name: "Sunset Horizon", value: "bg-gradient-to-br from-[#8a2387] via-[#e94057] to-[#f27121]", preview: "bg-gradient-to-br from-[#8a2387] via-[#e94057] to-[#f27121]" },
    { name: "Neon Mint", value: "bg-gradient-to-br from-teal-900 via-emerald-950 to-slate-950", preview: "bg-gradient-to-br from-teal-900 via-emerald-950 to-slate-950" },
    { name: "Royal Lavender", value: "bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-950", preview: "bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-950" }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "wallpaper":
        return (
          <div className="flex-grow p-5 overflow-auto text-left select-none">
            <h3 className={`text-lg font-bold mb-4 transition-colors duration-500 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Desktop & Wallpaper</h3>
            <div className="grid grid-cols-2 gap-4">
              {wallpapers.map((wp) => (
                <div 
                  key={wp.name}
                  onClick={() => setWallpaper(wp.value)}
                  className={`border rounded-lg p-2 cursor-pointer transition-all hover:border-blue-500/50 ${
                    isDarkMode ? "bg-gray-900/60" : "bg-gray-100/80"
                  } ${
                    wallpaper === wp.value 
                      ? "border-blue-500 ring-2 ring-blue-500/20" 
                      : (isDarkMode ? "border-gray-800" : "border-gray-200")
                  }`}
                >
                  <div 
                    className={`h-24 w-full rounded-md mb-2 shadow-inner border ${
                      isDarkMode ? "border-gray-800" : "border-gray-200"
                    } ${
                      wp.value === "/src/assets/walpaper.jpeg" 
                        ? "bg-cover bg-center" 
                        : wp.preview
                    }`}
                    style={wp.value === "/src/assets/walpaper.jpeg" ? { backgroundImage: "url('/src/assets/walpaper.jpeg')" } : {}}
                  />
                  <div className={`text-xs font-semibold text-center transition-colors duration-500 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{wp.name}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case "displays":
        return (
          <div className="flex-grow p-5 overflow-auto text-left select-none flex flex-col gap-6">
            <h3 className={`text-lg font-bold transition-colors duration-500 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Displays</h3>
            
            <div className={`border rounded-xl p-4 flex flex-col gap-4 transition-colors duration-500 ${
              isDarkMode ? "bg-gray-900/40 border-gray-800/80" : "bg-gray-100/60 border-gray-200 shadow-xs"
            }`}>
              <div className="flex justify-between items-center">
                <span className={`text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>Brightness</span>
                <span className="text-xs text-gray-400">{brightness}%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">🔅</span>
                <input 
                  type="range" 
                  min="20" 
                  max="100" 
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="flex-grow h-1.5 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <span className="text-sm text-gray-400">🔆</span>
              </div>
            </div>

            <div className={`border rounded-xl p-4 flex justify-between items-center transition-colors duration-500 ${
              isDarkMode ? "bg-gray-900/40 border-gray-800/80" : "bg-gray-100/60 border-gray-200 shadow-xs"
            }`}>
              <div>
                <h4 className={`text-sm font-semibold transition-colors duration-500 ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>Dark Mode</h4>
                <p className="text-xs text-gray-500">Enable system-wide dark style</p>
              </div>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`w-12 h-6 rounded-full p-0.5 cursor-pointer transition-colors duration-200 focus:outline-none ${
                  isDarkMode ? "bg-blue-500" : "bg-gray-400"
                }`}
              >
                <div 
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                    isDarkMode ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        );
      case "sound":
        return (
          <div className="flex-grow p-5 overflow-auto text-left select-none flex flex-col gap-6">
            <h3 className={`text-lg font-bold transition-colors duration-500 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Sound</h3>
            
            <div className={`border rounded-xl p-4 flex flex-col gap-4 transition-colors duration-500 ${
              isDarkMode ? "bg-gray-900/40 border-gray-800/80" : "bg-gray-100/60 border-gray-200 shadow-xs"
            }`}>
              <div className="flex justify-between items-center">
                <span className={`text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>Output Volume</span>
                <span className="text-xs text-gray-400">{volume}%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">🔈</span>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="flex-grow h-1.5 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <span className="text-sm text-gray-400">🔊</span>
              </div>
            </div>
          </div>
        );
      case "about":
        return (
          <div className="flex-grow p-5 overflow-auto select-none flex flex-col items-center justify-center text-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-4xl shadow-lg border border-white/10">
              💻
            </div>
            <div>
              <h3 className={`text-lg font-extrabold transition-colors duration-500 ${isDarkMode ? "text-white" : "text-gray-900"}`}>macOS Saifur</h3>
              <p className="text-xs text-gray-500">Version 15.0 Beta (Build 24A5264g)</p>
            </div>

            <div className={`w-full max-w-sm border rounded-xl p-4 text-left flex flex-col gap-2.5 text-xs transition-colors duration-500 ${
              isDarkMode 
                ? "bg-gray-900/40 border-gray-800/80 text-gray-300" 
                : "bg-gray-100/60 border-gray-200 text-gray-700 shadow-xs"
            }`}>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-500">Developer</span>
                <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>Saifur Rahman</span>
              </div>
              <div className={`flex justify-between border-t pt-2.5 ${isDarkMode ? "border-gray-800/50" : "border-gray-200"}`}>
                <span className="font-semibold text-gray-500">Processor</span>
                <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>Apple M4 Pro Mock</span>
              </div>
              <div className={`flex justify-between border-t pt-2.5 ${isDarkMode ? "border-gray-800/50" : "border-gray-200"}`}>
                <span className="font-semibold text-gray-500">Memory</span>
                <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>32 GB</span>
              </div>
              <div className={`flex justify-between border-t pt-2.5 ${isDarkMode ? "border-gray-800/50" : "border-gray-200"}`}>
                <span className="font-semibold text-gray-500">Startup Disk</span>
                <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>Macintosh HD</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isSettingsOpen && (
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
          className={`absolute top-[12%] left-[22%] w-[680px] h-[460px] overflow-hidden border rounded-lg shadow-2xl backdrop-blur-md flex flex-col font-sans transition-colors duration-500 ${
            isDarkMode 
              ? "border-gray-700 bg-gray-950 text-gray-200" 
              : "border-gray-300 bg-gray-50 text-gray-800"
          }`}
        >
          {/* Header */}
          <div 
            className={`p-2.5 flex items-center justify-between cursor-grab active:cursor-grabbing select-none border-b shrink-0 transition-colors duration-500 ${
              isDarkMode 
                ? "bg-gray-950 border-gray-800/60 text-gray-400" 
                : "bg-gray-200 border-gray-300 text-gray-600"
            }`}
            onPointerDown={(e) => {
              dragControls.start(e);
              onFocus();
            }}
          >
            {/* Control dots */}
            <div className="flex items-center gap-2">
              <div onClick={toggleSettings} className="cursor-pointer w-[13px] h-[13px] bg-red-400 rounded-full"></div>
              <div className="cursor-pointer w-[13px] h-[13px] bg-yellow-400 rounded-full"></div>
              <div className="cursor-pointer w-[13px] h-[13px] bg-green-400 rounded-full"></div>
            </div>
            <div className="flex-grow text-center text-xs font-semibold text-gray-400">
              System Settings
            </div>
            <div className="w-[45px]"></div>
          </div>

          {/* Body */}
          <div className="flex-grow flex overflow-hidden">
            {/* Sidebar */}
            <div className={`w-[180px] border-r p-2.5 select-none flex flex-col gap-1 transition-colors duration-500 ${
              isDarkMode 
                ? "bg-gray-950/70 border-gray-800/60" 
                : "bg-gray-100 border-gray-200"
            }`}>
              {[
                { id: "wallpaper", label: "🖥️ Wallpaper" },
                { id: "displays", label: "☀️ Displays" },
                { id: "sound", label: "🔊 Sound" },
                { id: "about", label: "ℹ️ About" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left w-full px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                    activeTab === tab.id 
                      ? (isDarkMode ? "bg-blue-500/15 text-blue-400 border border-blue-500/20" : "bg-blue-100 text-blue-700 font-bold")
                      : (isDarkMode ? "text-gray-400 hover:bg-gray-900/60 hover:text-gray-200" : "text-gray-600 hover:bg-gray-200/60 hover:text-gray-800")
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content panel */}
            <div className={`flex-grow flex flex-col overflow-hidden transition-colors duration-500 ${
              isDarkMode ? "bg-gray-900/20" : "bg-white"
            }`}>
              {renderContent()}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Settings;
