import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Terminal = ({ isTerminalOpen, toggleTerminal }) => {
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

  const macWindowVariants = {
    hidden: {
      opacity: 0,
      scale: 0.3,
      y: 300,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.2,
      y: 400,
      filter: "blur(8px)",
      transition: {
        duration: 0.25,
      },
    },
  };

  return (
    <AnimatePresence>
      {isTerminalOpen && (
        <motion.div
          variants={macWindowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ transformOrigin: "bottom center" }}
          className="w-md h-96 overflow-auto border bg-black rounded text-white"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="sticky top-0 bg-gray-900 p-2 flex justify-between">
            <div className="flex gap-2">
              <div
                onClick={toggleTerminal}
                className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
              />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </div>

          <div className="p-3 font-mono text-sm">

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
              <span className="text-green-400 mr-2">
                saifur@portfolio:~$
              </span>

              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none"
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            <div ref={bottomRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;