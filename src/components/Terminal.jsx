import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Window from "./Window";

const Terminal = ({ isTerminalOpen, toggleTerminal, isActive, onFocus, desktopRef, isDarkMode }) => {
  const [input, setInput] = useState("");

  const [history, setHistory] = useState([
    {
      command: "",
      output:
        "Welcome to Saifur's Portfolio\nType 'help' to see available commands.",
    },
  ]);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const commands = {
    help: () => `
Available commands

about
skills
projects
experience
resume
contact
clear
`,

    about: () =>
      "Hi! I'm Saifur Rahman.\nA Full Stack Developer specializing in Laravel, React and Shopify.",

    skills: () =>
      "React\nLaravel\nPHP\nNode.js\nShopify\nMySQL\nTailwind CSS",

    projects: () =>
      "Employee Management System\nPortfolio Website\nShopify Store",

    experience: () =>
      "4+ years building modern web applications.",

    resume: () =>
      "Opening resume... (later you can open your Resume window)",

    contact: () =>
      "Email: hello@example.com\nGitHub: github.com/yourname",
  };

  const executeCommand = (command) => {
    const cmd = command.trim().toLowerCase();

    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    const output = commands[cmd]
      ? commands[cmd]()
      : `Command not found: ${cmd}`;

    setHistory((prev) => [
      ...prev,
      {
        command: cmd,
        output,
      },
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [isTerminalOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [history]);

  return (
    <AnimatePresence>
      {isTerminalOpen && (
        <Window
          isOpen={isTerminalOpen}
          onClose={toggleTerminal}
          title="Terminal"
          isActive={isActive}
          onFocus={onFocus}
          desktopRef={desktopRef}
          isDarkMode={isDarkMode}
          className="top-[20%] left-[25%] w-md h-96 bg-black/95 text-white"
        >
          <div 
            className="flex-grow p-3 font-mono text-sm overflow-auto text-left cursor-text scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700 hover:scrollbar-thumb-slate-600"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((item, index) => (
              <div key={index} className="mb-3">
                {item.command && (
                  <div>
                    <span className="text-green-400">
                      saifur@portfolio:~$
                    </span>{" "}
                    {item.command}
                  </div>
                )}

                <pre className="whitespace-pre-wrap text-gray-300">
                  {item.output}
                </pre>
              </div>
            ))}

            <div className="flex items-center">
              <span className="text-green-400 mr-2 select-none">
                saifur@portfolio:~$
              </span>

              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm p-0"
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            <div ref={bottomRef} />
          </div>
        </Window>
      )}
    </AnimatePresence>
  );
};

export default Terminal;