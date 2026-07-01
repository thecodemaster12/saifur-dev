import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Window from "./Window";

const ProjectsFolder = ({ 
  isProjectsOpen, 
  toggleProjects, 
  isActive, 
  onFocus, 
  desktopRef, 
  isDarkMode 
}) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: "ems",
      name: "Employee Management System",
      desc: "A full-featured HR administration dashboard built with Laravel, React, and Tailwind CSS. Supports real-time tracking, role management, and leave approval workflows.",
      tech: ["Laravel", "React", "MySQL", "Tailwind CSS"],
      icon: "📊"
    },
    {
      id: "portfolio",
      name: "Saifur Dev OS Portfolio",
      desc: "An interactive desktop OS simulation portfolio website built using React, Vite, and Framer Motion. Featuring draggable windows, dynamic theme switching, mock terminal, Safari, and settings.",
      tech: ["React", "Vite", "Framer Motion", "Tailwind CSS"],
      icon: "🖥️"
    },
    {
      id: "draggable-os",
      name: "React Draggable OS",
      desc: "An open-source library for building complex, draggable multi-window web applications with z-index promotion and constraints boundaries.",
      tech: ["TypeScript", "React", "Framer Motion"],
      icon: "📦"
    },
    {
      id: "api-boilerplate",
      name: "Laravel API Boilerplate",
      desc: "A clean backend API framework boilerplate pre-configured with JWT authentication, rate limiting, and test suites.",
      tech: ["Laravel", "PHP", "JWT Auth", "PHPUnit"],
      icon: "⚙️"
    }
  ];

  return (
    <AnimatePresence>
      {isProjectsOpen && (
        <Window
          isOpen={isProjectsOpen}
          onClose={toggleProjects}
          title="Finder — Projects"
          isActive={isActive}
          onFocus={onFocus}
          desktopRef={desktopRef}
          isDarkMode={isDarkMode}
          className="top-[18%] left-[12%] w-[700px] h-[450px]"
        >
          <div className="flex-grow flex overflow-hidden text-sm select-none">
            {/* Finder Sidebar */}
            <div className={`w-[170px] border-r p-3 flex flex-col gap-1 transition-colors duration-500 ${
              isDarkMode 
                ? "bg-gray-950/70 border-gray-800/60" 
                : "bg-gray-100 border-gray-200"
            }`}>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 pl-2 text-left">Favorites</div>
              <button className={`text-left w-full px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-2 ${
                isDarkMode ? "text-gray-400 hover:bg-gray-900/60" : "text-gray-600 hover:bg-gray-200/60"
              }`}>
                🏠 Home
              </button>
              <button className={`text-left w-full px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-2 ${
                isDarkMode ? "text-gray-400 hover:bg-gray-900/60" : "text-gray-600 hover:bg-gray-200/60"
              }`}>
                📂 Desktop
              </button>
              <button className={`text-left w-full px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-2 ${
                isDarkMode ? "text-gray-400 hover:bg-gray-900/60" : "text-gray-600 hover:bg-gray-200/60"
              }`}>
                📂 Documents
              </button>
              <button className={`text-left w-full px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors ${
                isDarkMode ? "bg-blue-500/15 text-blue-400 border border-blue-500/20" : "bg-blue-100 text-blue-700"
              }`}>
                📂 Projects
              </button>
            </div>

            {/* Folder Grid Contents */}
            <div className={`flex-grow p-5 overflow-auto transition-colors duration-500 ${
              isDarkMode ? "bg-gray-900/20" : "bg-white"
            }`}>
              {selectedProject ? (
                /* Project Details Detail View */
                <div className="flex flex-col gap-4 text-left select-text">
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg self-start cursor-pointer border transition-colors ${
                      isDarkMode 
                        ? "bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-200" 
                        : "bg-gray-150 border-gray-200 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    ◀ Back to Projects
                  </button>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-4xl">{selectedProject.icon}</span>
                    <div>
                      <h3 className={`text-lg font-extrabold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{selectedProject.name}</h3>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {selectedProject.tech.map((t) => (
                          <span key={t} className="text-[10px] font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className={`text-xs leading-relaxed mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {selectedProject.desc}
                  </p>
                </div>
              ) : (
                /* Folder Items Grid */
                <div className="grid grid-cols-3 gap-6">
                  {projects.map((proj) => (
                    <div 
                      key={proj.id}
                      onClick={() => setSelectedProject(proj)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border border-transparent cursor-pointer transition-all hover:scale-105 ${
                        isDarkMode 
                          ? "hover:bg-gray-800/40 hover:border-gray-800/80" 
                          : "hover:bg-gray-100/60 hover:border-gray-200 shadow-xs"
                      }`}
                    >
                      <div className="text-4xl mb-2 drop-shadow-md select-none">{proj.icon}</div>
                      <span className={`text-xs font-bold text-center leading-tight transition-colors duration-500 ${
                        isDarkMode ? "text-gray-300" : "text-gray-800"
                      }`}>{proj.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Window>
      )}
    </AnimatePresence>
  );
};

export default ProjectsFolder;
