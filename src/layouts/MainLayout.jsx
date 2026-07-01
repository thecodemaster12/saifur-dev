import MacClock from "../components/MacClock"
import Notes from "../components/Notes"
import Terminal from "../components/Terminal"
import VSCode from "../components/VSCode"
import Safari from "../components/Safari"
import Settings from "../components/Settings"
import ProjectsFolder from "../components/ProjectsFolder"
import Resume from "../components/Resume"
import { useState, useRef } from "react"

const MainLayout = () => {
    const date = new Date()
    const [isNotesOpen, setIsNotesOpen] = useState(false)
    const [isTerminalOpen, setIsTerminalOpen] = useState(false)
    const [isVSCodeOpen, setIsVSCodeOpen] = useState(false)
    const [isSafariOpen, setIsSafariOpen] = useState(false)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [isProjectsOpen, setIsProjectsOpen] = useState(false)
    const [isResumeOpen, setIsResumeOpen] = useState(false)
    const [activeWindow, setActiveWindow] = useState(null)
    const desktopRef = useRef(null)

    // System Settings States
    const [wallpaper, setWallpaper] = useState("/src/assets/walpaper.jpeg")
    const [brightness, setBrightness] = useState(100)
    const [volume, setVolume] = useState(80)
    const [isDarkMode, setIsDarkMode] = useState(true)

    const toggleNotes = () => {
        const nextState = !isNotesOpen
        setIsNotesOpen(nextState)
        if (nextState) {
            setActiveWindow("notes")
        }
    }
    const toggleTerminal = () => {
        const nextState = !isTerminalOpen
        setIsTerminalOpen(nextState)
        if (nextState) {
            setActiveWindow("terminal")
        }
    }
    const toggleVSCode = () => {
        const nextState = !isVSCodeOpen
        setIsVSCodeOpen(nextState)
        if (nextState) {
            setActiveWindow("vscode")
        }
    }
    const toggleSafari = () => {
        const nextState = !isSafariOpen
        setIsSafariOpen(nextState)
        if (nextState) {
            setActiveWindow("safari")
        }
    }
    const toggleSettings = () => {
        const nextState = !isSettingsOpen
        setIsSettingsOpen(nextState)
        if (nextState) {
            setActiveWindow("settings")
        }
    }
    const toggleProjects = () => {
        const nextState = !isProjectsOpen
        setIsProjectsOpen(nextState)
        if (nextState) {
            setActiveWindow("projects")
        }
    }
    const toggleResume = () => {
        const nextState = !isResumeOpen
        setIsResumeOpen(nextState)
        if (nextState) {
            setActiveWindow("resume")
        }
    }
    const openResume = () => {
        setIsResumeOpen(true)
        setActiveWindow("resume")
    }
    const getActiveAppName = () => {
        switch (activeWindow) {
            case "notes": return "Notes";
            case "terminal": return "Terminal";
            case "vscode": return "VS Code";
            case "safari": return "Safari";
            case "settings": return "Settings";
            case "projects": return "Finder";
            case "resume": return "Preview";
            default: return "Finder";
        }
    };

  return (
    <div 
        className={`h-screen overflow-hidden text-gray-100 flex flex-col transition-all duration-500 ${
            wallpaper.startsWith("bg-") ? wallpaper : ""
        }`}
        style={
            !wallpaper.startsWith("bg-")
                ? { backgroundImage: `url('${wallpaper}')`, backgroundSize: "cover", backgroundPosition: "center" }
                : {}
        }
    >
        <header className={`flex justify-between items-center py-1 px-4 h-7 select-none transition-colors duration-500 text-[12px] font-sans border-b ${
            isDarkMode 
                ? "bg-black/15 text-white/90 border-transparent" 
                : "bg-white/40 text-black/90 border-black/5 backdrop-blur-xl shadow-xs"
        }`}>
            <div className="flex items-center gap-4">
                {/* Apple logo */}
                <span className="text-sm cursor-default font-semibold"></span>
                {/* Active application name */}
                <span className="font-bold cursor-default">{getActiveAppName()}</span>
                {/* macOS menus */}
                <ul className="flex items-center gap-3">
                    {["File", "Edit", "View", "Go", "Window", "Help"].map((m) => (
                        <li 
                            key={m} 
                            className={`cursor-default px-2 py-0.5 rounded transition-all duration-150 ${
                                isDarkMode ? "hover:bg-white/10" : "hover:bg-black/5"
                            }`}
                        >
                            {m}
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="flex items-center gap-4">
                {/* Status items */}
                <div className="flex items-center gap-3">
                    {/* Wi-Fi Icon */}
                    <span className="cursor-default hover:opacity-80">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                            <path d="M12,21.5 C12.8,21.5 13.5,20.8 13.5,20 C13.5,19.2 12.8,18.5 12,18.5 C11.2,18.5 10.5,19.2 10.5,20 C10.5,20.8 11.2,21.5 12,21.5 Z M12,14.5 C14.2,14.5 16.2,15.4 17.7,16.9 C18.1,17.3 18.7,17.3 19.1,16.9 C19.5,16.5 19.5,15.9 19.1,15.5 C17.2,13.6 14.7,12.5 12,12.5 C9.3,12.5 6.8,13.6 4.9,15.5 C4.5,15.9 4.5,16.5 4.9,16.9 C5.3,17.3 5.9,17.3 6.3,16.9 C7.8,15.4 9.8,14.5 12,14.5 Z M12,8.5 C15.9,8.5 19.4,10 22,12.5 C22.4,12.9 23,12.9 23.4,12.5 C23.8,12.1 23.8,11.5 23.4,11.1 C20.3,8.1 16.3,6.5 12,6.5 C7.7,6.5 3.7,8.1 0.6,11.1 C0.2,11.5 0.2,12.1 0.6,12.5 C1,12.9 1.6,12.9 2,12.5 C4.6,10 8.1,8.5 12,8.5 Z" />
                        </svg>
                    </span>

                    {/* Battery */}
                    <div className="flex items-center gap-1.5 cursor-default hover:opacity-80">
                        <span className="text-[11px] font-medium">100%</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M17,6 C17.5,6 18,6.5 18,7 L18,17 C18,17.5 17.5,18 17,18 L3,18 C2.5,18 2,17.5 2,17 L2,7 C2,6.5 2.5,6 3,6 L17,6 Z M17.5,8 L2.5,8 L2.5,16.5 L17.5,16.5 L17.5,8 Z M19,10 L19,14 C19.6,14 20,13.6 20,13 L20,11 C20,10.4 19.6,10 19,10 Z M15.5,9.5 L4.5,9.5 L4.5,15 L15.5,15 L15.5,9.5 Z" />
                        </svg>
                    </div>

                    {/* Control Center */}
                    <span className="cursor-default hover:opacity-80">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                            <path d="M3,6 L13,6 C13.5,6 14,5.5 14,5 C14,4.5 13.5,4 13,4 L3,4 C2.5,4 2,4.5 2,5 C2,5.5 2.5,6 3,6 Z M13,10 L21,10 C21.5,10 22,9.5 22,9 C22,8.5 21.5,8 21,8 L13,8 C12.5,8 12,8.5 12,9 C12,9.5 12.5,10 13,10 Z M3,14 L11,14 C11.5,14 12,13.5 12,13 C12,12.5 11.5,12 11,12 L3,12 C2.5,12 2,12.5 2,13 C2,13.5 2.5,14 3,14 Z M11,18 L21,18 C21.5,18 22,17.5 22,17 C22,16.5 21.5,16 21,16 L11,16 C10.5,16 10,16.5 10,17 C10,17.5 10.5,18 11,18 Z M18,5 C18,6.1 18.9,7 20,7 C21.1,7 22,6.1 22,5 C22,3.9 21.1,3 20,3 C18.9,3 18,3.9 18,5 Z M7,9 C5.9,9 5,9.9 5,11 C5,12.1 5.9,13 7,13 C8.1,13 9,12.1 9,11 C9,9.9 8.1,9 7,9 Z M15,13 C15,14.1 15.9,15 17,15 C18.1,15 19,14.1 19,13 C19,11.9 18.1,11 17,11 C15.9,11 15,11.9 15,13 Z M4,17 C4,18.1 4.9,19 6,19 C7.1,19 8,18.1 8,17 C8,15.9 7.1,15 6,15 C4.9,15 4,15.9 4,17 Z" />
                        </svg>
                    </span>

                    {/* Spotlight Glass */}
                    <span className="cursor-default hover:opacity-80">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                    </span>
                </div>

                {/* Time & Date */}
                <div className={`cursor-default font-medium transition-colors duration-500 text-white`}>
                    <MacClock />
                </div>
            </div>
        </header>
        <main className="flex-grow h-full grid grid-cols-[100px_1fr]">
            <aside className="flex justify-center items-center select-none">
                <div className={`p-2 rounded-xl flex flex-col gap-2 transition-all duration-500 ${
                    isDarkMode 
                        ? "glass-card border border-white/5" 
                        : "bg-white/45 border border-white/40 shadow-lg backdrop-blur-md"
                }`}>
                    <div className="group relative cursor-pointer">
                        <img draggable="false" className="select-none hover:scale-[1.1] transition-all" width={50} src="/src/assets/mac-icons/Finder.svg" alt="" />
                        <span className={`absolute left-16 scale-0 rounded-md px-2.5 py-1 text-xs transition-all duration-100 group-hover:scale-100 shadow-lg font-medium whitespace-nowrap select-none pointer-events-none z-[100] border ${
                            isDarkMode 
                                ? "bg-gray-950/95 border-gray-800 text-gray-200" 
                                : "bg-white/95 border-gray-200 text-gray-800"
                        }`}>
                            Finder
                        </span>
                    </div>
                    <div onClick={toggleProjects} className="group relative cursor-pointer">
                        <img draggable="false" className="select-none hover:scale-[1.1] transition-all" width={50} src="/src/assets/mac-icons/Folder.svg" alt="" />
                        <span className={`absolute left-16 scale-0 rounded-md px-2.5 py-1 text-xs transition-all duration-100 group-hover:scale-100 shadow-lg font-medium whitespace-nowrap select-none pointer-events-none z-[100] border ${
                            isDarkMode 
                                ? "bg-gray-950/95 border-gray-800 text-gray-200" 
                                : "bg-white/95 border-gray-200 text-gray-800"
                        }`}>
                            Projects Folder
                        </span>
                    </div>
                    <div onClick={toggleNotes} className="group relative cursor-pointer">
                        <img draggable="false" className="select-none hover:scale-[1.1] transition-all" width={50} src="/src/assets/mac-icons/Notes.svg" alt="" />
                        <span className={`absolute left-16 scale-0 rounded-md px-2.5 py-1 text-xs transition-all duration-100 group-hover:scale-100 shadow-lg font-medium whitespace-nowrap select-none pointer-events-none z-[100] border ${
                            isDarkMode 
                                ? "bg-gray-950/95 border-gray-800 text-gray-200" 
                                : "bg-white/95 border-gray-200 text-gray-800"
                        }`}>
                            Notes
                        </span>
                    </div>
                    <div onClick={toggleTerminal} className="group relative cursor-pointer">
                        <img draggable="false" className="select-none hover:scale-[1.1] transition-all" width={50} src="/src/assets/mac-icons/Terminal.svg" alt="" />
                        <span className={`absolute left-16 scale-0 rounded-md px-2.5 py-1 text-xs transition-all duration-100 group-hover:scale-100 shadow-lg font-medium whitespace-nowrap select-none pointer-events-none z-[100] border ${
                            isDarkMode 
                                ? "bg-gray-950/95 border-gray-800 text-gray-200" 
                                : "bg-white/95 border-gray-200 text-gray-800"
                        }`}>
                            Terminal
                        </span>
                    </div>
                    <div onClick={toggleVSCode} className="group relative cursor-pointer">
                        <img draggable="false" className="select-none hover:scale-[1.1] transition-all" width={50} src="/src/assets/mac-icons/Xcode.svg" alt="" />
                        <span className={`absolute left-16 scale-0 rounded-md px-2.5 py-1 text-xs transition-all duration-100 group-hover:scale-100 shadow-lg font-medium whitespace-nowrap select-none pointer-events-none z-[100] border ${
                            isDarkMode 
                                ? "bg-gray-950/95 border-gray-800 text-gray-200" 
                                : "bg-white/95 border-gray-200 text-gray-800"
                        }`}>
                            VS Code
                        </span>
                    </div>
                    <div onClick={toggleSafari} className="group relative cursor-pointer">
                        <img draggable="false" className="select-none hover:scale-[1.1] transition-all" width={50} src="/src/assets/mac-icons/Safari.svg" alt="" />
                        <span className={`absolute left-16 scale-0 rounded-md px-2.5 py-1 text-xs transition-all duration-100 group-hover:scale-100 shadow-lg font-medium whitespace-nowrap select-none pointer-events-none z-[100] border ${
                            isDarkMode 
                                ? "bg-gray-950/95 border-gray-800 text-gray-200" 
                                : "bg-white/95 border-gray-200 text-gray-800"
                        }`}>
                            Safari
                        </span>
                    </div>
                    <div onClick={toggleResume} className="group relative cursor-pointer">
                        <img draggable="false" className="select-none hover:scale-[1.1] transition-all" width={50} src="/src/assets/mac-icons/Document.svg" alt="" />
                        <span className={`absolute left-16 scale-0 rounded-md px-2.5 py-1 text-xs transition-all duration-100 group-hover:scale-100 shadow-lg font-medium whitespace-nowrap select-none pointer-events-none z-[100] border ${
                            isDarkMode 
                                ? "bg-gray-950/95 border-gray-800 text-gray-200" 
                                : "bg-white/95 border-gray-200 text-gray-800"
                        }`}>
                            Resume Document
                        </span>
                    </div>
                    <div onClick={toggleSettings} className="group relative cursor-pointer">
                        <img draggable="false" className="select-none hover:scale-[1.1] transition-all" width={50} src="/src/assets/mac-icons/Settings.svg" alt="" />
                        <span className={`absolute left-16 scale-0 rounded-md px-2.5 py-1 text-xs transition-all duration-100 group-hover:scale-100 shadow-lg font-medium whitespace-nowrap select-none pointer-events-none z-[100] border ${
                            isDarkMode 
                                ? "bg-gray-950/95 border-gray-800 text-gray-200" 
                                : "bg-white/95 border-gray-200 text-gray-800"
                        }`}>
                            System Settings
                        </span>
                    </div>
                </div>
            </aside>
            <section ref={desktopRef} className="relative flex-grow h-full overflow-hidden border-l border-gray-800/30">
                <Notes 
                    isNotesOpen={isNotesOpen} 
                    toggleNotes={toggleNotes} 
                    isActive={activeWindow === "notes"}
                    onFocus={() => setActiveWindow("notes")}
                    desktopRef={desktopRef}
                    isDarkMode={isDarkMode}
                />
                <Terminal 
                    isTerminalOpen={isTerminalOpen} 
                    toggleTerminal={toggleTerminal} 
                    isActive={activeWindow === "terminal"}
                    onFocus={() => setActiveWindow("terminal")}
                    desktopRef={desktopRef}
                    isDarkMode={isDarkMode}
                    openResume={openResume}
                />
                <VSCode 
                    isVSCodeOpen={isVSCodeOpen} 
                    toggleVSCode={toggleVSCode} 
                    isActive={activeWindow === "vscode"}
                    onFocus={() => setActiveWindow("vscode")}
                    desktopRef={desktopRef}
                    isDarkMode={isDarkMode}
                />
                <Safari 
                    isSafariOpen={isSafariOpen} 
                    toggleSafari={toggleSafari} 
                    isActive={activeWindow === "safari"}
                    onFocus={() => setActiveWindow("safari")}
                    desktopRef={desktopRef}
                    isDarkMode={isDarkMode}
                />
                <Settings 
                    isSettingsOpen={isSettingsOpen} 
                    toggleSettings={toggleSettings} 
                    isActive={activeWindow === "settings"}
                    onFocus={() => setActiveWindow("settings")}
                    desktopRef={desktopRef}
                    wallpaper={wallpaper}
                    setWallpaper={setWallpaper}
                    brightness={brightness}
                    setBrightness={setBrightness}
                    volume={volume}
                    setVolume={setVolume}
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                />
                <ProjectsFolder 
                    isProjectsOpen={isProjectsOpen} 
                    toggleProjects={toggleProjects} 
                    isActive={activeWindow === "projects"}
                    onFocus={() => setActiveWindow("projects")}
                    desktopRef={desktopRef}
                    isDarkMode={isDarkMode}
                />
                <Resume 
                    isResumeOpen={isResumeOpen} 
                    toggleResume={toggleResume} 
                    isActive={activeWindow === "resume"}
                    onFocus={() => setActiveWindow("resume")}
                    desktopRef={desktopRef}
                    isDarkMode={isDarkMode}
                />
            </section>
        </main>
        {/* Brightness overlay */}
        <div 
            className="fixed inset-0 pointer-events-none z-[99999] bg-black transition-opacity duration-100"
            style={{ opacity: (100 - brightness) / 100 * 0.8 }}
        />
        {/* <footer className="bottom-menu flex justify-center mb-3">
            <div className="dock flex gap-2 p-2 glass-card  rounded">
                <img draggable="false" class="select-none hover:scale-[1.1] transition-all" width={50} src="/src/assets/mac-icons/Finder.svg" alt="" />
                <img draggable="false" class="select-none hover:scale-[1.1] transition-all" width={50} src="/src/assets/mac-icons/Settings.svg" alt="" />
                <img draggable="false" class="select-none hover:scale-[1.1] transition-all" width={50} src="/src/assets/mac-icons/Terminal.svg" alt="" />
                <img draggable="false" class="select-none hover:scale-[1.1] transition-all" width={50} src="/src/assets/mac-icons/Safari.svg" alt="" />
                <img draggable="false" class="select-none hover:scale-[1.1] transition-all" width={50} src="/src/assets/mac-icons/Xcode.svg" alt="" />
                <img draggable="false" class="select-none hover:scale-[1.1] transition-all" width={50} src="/src/assets/mac-icons/Trash Full.svg" alt="" />
            </div>
        </footer> */}
    </div>
  )
}

export default MainLayout