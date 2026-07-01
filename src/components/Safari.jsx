import { useState } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";

const Safari = ({ isSafariOpen, toggleSafari, isActive, onFocus, desktopRef, isDarkMode }) => {
  const [urlInput, setUrlInput] = useState("");
  const [currentUrl, setCurrentUrl] = useState("startpage");
  const [history, setHistory] = useState(["startpage"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const dragControls = useDragControls();

  const navigateTo = (newUrl) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(newUrl);
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
    setCurrentUrl(newUrl);
    setUrlInput(newUrl === "startpage" ? "" : newUrl);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      const prevUrl = history[prevIndex];
      setCurrentUrl(prevUrl);
      setUrlInput(prevUrl === "startpage" ? "" : prevUrl);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      const nextUrl = history[nextIndex];
      setCurrentUrl(nextUrl);
      setUrlInput(nextUrl === "startpage" ? "" : nextUrl);
    }
  };

  const handleUrlSubmit = (e) => {
    if (e.key === "Enter") {
      let target = urlInput.trim();
      if (!target) return;
      if (!target.startsWith("http://") && !target.startsWith("https://")) {
        if (target.includes(".") && !target.includes(" ")) {
          target = "https://" + target;
        } else {
          // Treat as search query
          navigateTo(`google.com/search?q=${encodeURIComponent(target)}`);
          return;
        }
      }
      navigateTo(target);
    }
  };

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

  // Render mock pages
  const renderPageContent = () => {
    if (currentUrl === "startpage") {
      return (
        <div className={`flex-grow flex flex-col items-center justify-center p-8 select-none text-center transition-colors duration-500 bg-gradient-to-b ${
          isDarkMode 
            ? "from-gray-900/60 to-gray-950/85 text-white" 
            : "from-gray-100 to-gray-50 text-gray-800"
        }`}>
          <div className={`text-4xl font-extrabold mb-8 tracking-tight transition-colors duration-500 ${
            isDarkMode ? "text-white/90" : "text-gray-900"
          }`}>Safari</div>
          
          {/* Large Search Input */}
          <div className="relative w-full max-w-lg mb-12">
            <input 
              type="text" 
              placeholder="Search or enter website name"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={handleUrlSubmit}
              className={`w-full rounded-full px-5 py-3 text-center text-sm outline-none transition-all shadow-inner border ${
                isDarkMode 
                  ? "bg-gray-800/40 border-gray-700/60 text-white focus:bg-gray-800/80 focus:border-blue-500/80" 
                  : "bg-white border-gray-300 text-gray-800 focus:bg-white focus:border-blue-500 focus:shadow-md"
              }`}
            />
          </div>

          {/* Favorites */}
          <div className="w-full max-w-xl mb-12">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 text-left">Favorites</h3>
            <div className="grid grid-cols-4 gap-6">
              {[
                { name: "Google", url: "https://google.com", color: isDarkMode ? "bg-red-500/10 text-red-400 hover:bg-red-500/20" : "bg-red-50 text-red-600 hover:bg-red-100" },
                { name: "GitHub", url: "https://github.com", color: isDarkMode ? "bg-purple-500/10 text-purple-400 hover:bg-purple-500/20" : "bg-purple-50 text-purple-600 hover:bg-purple-100" },
                { name: "LinkedIn", url: "https://linkedin.com", color: isDarkMode ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20" : "bg-blue-50 text-blue-600 hover:bg-blue-100" },
                { name: "Saifur Dev", url: "https://saifur.dev", color: isDarkMode ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" }
              ].map((fav) => (
                <div 
                  key={fav.name} 
                  onClick={() => navigateTo(fav.url)}
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-all shadow-lg border ${
                    isDarkMode ? "border-gray-700/30" : "border-gray-200"
                  } ${fav.color}`}>
                    {fav.name[0]}
                  </div>
                  <span className={`text-xs transition-colors ${
                    isDarkMode ? "text-gray-400 group-hover:text-gray-200" : "text-gray-600 group-hover:text-gray-900"
                  }`}>{fav.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Report */}
          <div className={`w-full max-w-xl border rounded-xl p-4 text-left flex items-center justify-between transition-colors duration-500 ${
            isDarkMode ? "bg-gray-900/40 border-gray-800/80" : "bg-white border-gray-200 shadow-sm"
          }`}>
            <div>
              <h4 className={`text-xs font-bold mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}>Privacy Report</h4>
              <p className="text-xs text-gray-500">In the last seven days, Safari prevented 72 trackers from profiling you.</p>
            </div>
            <div className="text-emerald-400 text-xl font-bold">100%</div>
          </div>
        </div>
      );
    }

    if (currentUrl.includes("google.com/search")) {
      const query = new URLSearchParams(currentUrl.split("?")[1] || "").get("q") || "";
      return (
        <div className="flex-1 bg-white text-gray-955 overflow-auto flex flex-col select-text">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center gap-4 bg-gray-50 sticky top-0 z-10 select-none">
            <span className="text-lg font-bold text-blue-600 cursor-pointer" onClick={() => navigateTo("https://google.com")}>
              G<span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span>
            </span>
            <input 
              type="text" 
              defaultValue={query}
              className="flex-1 max-w-md bg-white border border-gray-300 rounded-full px-4 py-1.5 text-sm shadow-sm outline-none"
            />
          </div>
          {/* Results */}
          <div className="p-6 max-w-2xl text-left">
            <p className="text-xs text-gray-500 mb-4">About 1,420,000 results (0.34 seconds)</p>
            
            <div className="mb-6">
              <span className="text-xs text-gray-600 block">https://saifur.dev</span>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo("https://saifur.dev"); }} className="text-lg text-blue-800 hover:underline font-medium block">Saifur Rahman — Full Stack Developer Portfolio</a>
              <p className="text-sm text-gray-700 mt-1">Discover projects, skills, and experience of Saifur Rahman, specialized in Laravel, React, Tailwind CSS, Shopify, and modern web architectures.</p>
            </div>

            <div className="mb-6">
              <span className="text-xs text-gray-600 block">https://github.com/saifur</span>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo("https://github.com"); }} className="text-lg text-blue-800 hover:underline font-medium block">Saifur Rahman (GitHub)</a>
              <p className="text-sm text-gray-700 mt-1">Explore repository listings, source code, and developer contributions of Saifur Rahman including Employee Management Systems and React components.</p>
            </div>
          </div>
        </div>
      );
    }

    if (currentUrl.includes("google.com")) {
      return (
        <div className="flex-1 bg-white text-gray-900 flex flex-col items-center justify-center p-8 select-none">
          <div className="text-6xl font-extrabold mb-8 text-center tracking-tight">
            <span className="text-blue-600">G</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-500">o</span>
            <span className="text-blue-600">g</span>
            <span className="text-green-500">l</span>
            <span className="text-red-500">e</span>
          </div>
          <div className="relative w-full max-w-md mb-6">
            <input 
              type="text" 
              placeholder="Search Google or type a URL"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigateTo(`google.com/search?q=${encodeURIComponent(searchQuery)}`);
                }
              }}
              className="w-full border border-gray-200 hover:shadow-md focus:shadow-md rounded-full px-5 py-2.5 outline-none text-sm transition-all"
            />
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => navigateTo(`google.com/search?q=${encodeURIComponent(searchQuery || "Saifur Rahman")}`)}
              className="bg-gray-50 border border-gray-200 px-4 py-2 rounded text-xs text-gray-600 hover:bg-gray-100 cursor-pointer font-medium"
            >
              Google Search
            </button>
            <button 
              onClick={() => navigateTo("https://saifur.dev")}
              className="bg-gray-50 border border-gray-200 px-4 py-2 rounded text-xs text-gray-600 hover:bg-gray-100 cursor-pointer font-medium"
            >
              I'm Feeling Lucky
            </button>
          </div>
        </div>
      );
    }

    if (currentUrl.includes("github.com")) {
      return (
        <div className="flex-1 bg-[#0d1117] text-gray-300 overflow-auto flex flex-col select-text">
          {/* Header */}
          <div className="p-4 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between sticky top-0 z-10 select-none">
            <div className="flex items-center gap-3">
              <span className="text-white font-bold text-sm">GitHub</span>
              <span className="text-xs bg-gray-800 text-gray-400 border border-gray-700 rounded px-2 py-0.5 font-mono">saifur-dev</span>
            </div>
            <div className="text-xs text-gray-400">Signed in as saifur</div>
          </div>
          
          {/* Profile */}
          <div className="p-6 max-w-4xl mx-auto flex flex-col md:flex-row gap-6 text-left">
            <div className="flex flex-col items-center md:items-start w-48 shrink-0">
              <div className="w-36 h-36 bg-gradient-to-tr from-blue-600 to-emerald-500 rounded-full mb-4 border border-gray-700 shadow-md"></div>
              <h2 className="text-lg font-bold text-white">Saifur Rahman</h2>
              <span className="text-sm text-gray-400">saifur-dev</span>
              <p className="text-xs text-gray-400 mt-2 text-center md:text-left">Full Stack Web Developer crafting modern UI & backends.</p>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold mb-3 text-white border-b border-[#30363d] pb-2">Popular repositories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "employee-management-system", desc: "Laravel and React dashboard for modern HR solutions.", lang: "PHP" },
                  { name: "saifur-dev-portfolio", desc: "Interactive macOS inspired portfolio website built with Vite.", lang: "JavaScript" },
                  { name: "react-draggable-os", desc: "Draggable window managers with z-index promotion.", lang: "TypeScript" },
                  { name: "laravel-api-boilerplate", desc: "Robust API starting point with JWT authentication.", lang: "PHP" }
                ].map((repo) => (
                  <div key={repo.name} className="p-4 border border-[#30363d] rounded-lg bg-[#161b22] hover:border-gray-500 transition-colors">
                    <a href="#" className="text-sm font-bold text-blue-400 hover:underline">{repo.name}</a>
                    <p className="text-xs text-gray-400 mt-1">{repo.desc}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
                      <span className="text-xs text-gray-400">{repo.lang}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (currentUrl.includes("saifur.dev") || currentUrl.includes("linkedin.com")) {
      return (
        <div className="flex-1 bg-gradient-to-tr from-gray-950 to-indigo-950 text-white overflow-auto flex flex-col p-8 items-center justify-center select-none text-center">
          <span className="text-xs bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 rounded-full px-3 py-1 font-semibold tracking-wider uppercase mb-3">Portfolio Site</span>
          <h1 className="text-3xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400">Saifur Rahman</h1>
          <p className="text-sm text-gray-300 max-w-md mb-6 leading-relaxed">You are currently looking at my OS Portfolio website! Toggle Notes, Terminal, or VS Code on the desktop sidebar to explore more.</p>
          <div className="flex gap-4">
            <button onClick={() => navigateTo("https://github.com")} className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2 rounded-lg cursor-pointer transition-colors shadow">
              GitHub Profile
            </button>
            <button onClick={() => navigateTo("startpage")} className="bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold text-xs px-4 py-2 rounded-lg cursor-pointer transition-colors border border-gray-700">
              Safari Home
            </button>
          </div>
        </div>
      );
    }

    // Default Fallback
    return (
      <div className="flex-1 bg-white text-gray-900 p-8 overflow-auto">
        <iframe 
          src={currentUrl} 
          title="web browser content"
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin"
          onError={() => {}}
        />
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isSafariOpen && (
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
          className={`absolute top-[8%] left-[18%] w-[780px] h-[500px] overflow-hidden border rounded-lg shadow-2xl backdrop-blur-md flex flex-col font-sans transition-colors duration-500 ${
            isDarkMode 
              ? "border-gray-700 bg-gray-950 text-gray-200" 
              : "border-gray-300 bg-white text-gray-900"
          }`}
        >
          {/* Header & Address Bar */}
          <div 
            className={`p-2.5 flex items-center justify-between cursor-grab active:cursor-grabbing select-none border-b shrink-0 transition-colors duration-500 ${
              isDarkMode 
                ? "bg-gray-950 border-gray-800/60 text-gray-400" 
                : "bg-gray-100 border-gray-200 text-gray-600"
            }`}
            onPointerDown={(e) => {
              dragControls.start(e);
              onFocus();
            }}
          >
            {/* Control dots */}
            <div className="flex items-center gap-2 w-[80px]">
              <div onClick={toggleSafari} className="cursor-pointer w-[13px] h-[13px] bg-red-400 rounded-full"></div>
              <div className="cursor-pointer w-[13px] h-[13px] bg-yellow-400 rounded-full"></div>
              <div className="cursor-pointer w-[13px] h-[13px] bg-green-400 rounded-full"></div>
            </div>

            {/* Navigation buttons & Address Input */}
            <div className="flex items-center gap-4 flex-grow max-w-xl justify-center">
              {/* Back / Forward */}
              <div className="flex gap-2">
                <button 
                  onClick={handleBack}
                  disabled={historyIndex === 0}
                  className={`p-1 rounded text-xs cursor-pointer ${
                    historyIndex === 0 
                      ? "text-gray-600" 
                      : (isDarkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-200")
                  }`}
                >
                  ◀
                </button>
                <button 
                  onClick={handleForward}
                  disabled={historyIndex === history.length - 1}
                  className={`p-1 rounded text-xs cursor-pointer ${
                    historyIndex === history.length - 1 
                      ? "text-gray-600" 
                      : (isDarkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-200")
                  }`}
                >
                  ▶
                </button>
              </div>

              {/* Address input box */}
              <div className="relative flex-1 max-w-sm">
                <input 
                  type="text" 
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={handleUrlSubmit}
                  placeholder="Search or enter website name"
                  className={`w-full text-center text-xs rounded px-6 py-1.5 outline-none border transition-colors duration-500 ${
                    isDarkMode 
                      ? "bg-gray-800/40 border-gray-700/40 text-gray-200 focus:bg-gray-800/70 focus:border-blue-500/60" 
                      : "bg-white border-gray-300 text-gray-800 focus:bg-white focus:border-blue-500/40"
                  }`}
                />
                {urlInput && (
                  <button 
                    onClick={() => { setUrlInput(""); navigateTo("startpage"); }}
                    className="absolute right-2.5 top-1.5 text-gray-500 hover:text-gray-300 text-[10px] cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Right icons (mock tabs / options) */}
            <div className="flex gap-3 text-gray-400 w-[80px] justify-end">
              <span className="cursor-pointer hover:text-gray-200 text-sm">⎋</span>
              <span className="cursor-pointer hover:text-gray-200 text-sm">⊞</span>
            </div>
          </div>

          {/* Webpage Content */}
          <div className={`flex-1 flex flex-col overflow-hidden transition-colors duration-500 ${
            isDarkMode ? "bg-gray-900" : "bg-gray-50"
          }`}>
            {renderPageContent()}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Safari;
