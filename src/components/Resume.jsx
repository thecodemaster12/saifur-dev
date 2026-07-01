import { AnimatePresence } from "framer-motion";
import Window from "./Window";

const Resume = ({ 
  isResumeOpen, 
  toggleResume, 
  isActive, 
  onFocus, 
  desktopRef, 
  isDarkMode 
}) => {
  const handlePrint = () => {
    window.print();
  };

  const paperBg = isDarkMode ? "bg-gray-900 border-gray-800/80 text-gray-100" : "bg-white border-gray-200 text-gray-900";
  const primaryText = isDarkMode ? "text-white" : "text-gray-900";
  const secondaryText = isDarkMode ? "text-gray-300" : "text-gray-700";
  const mutedText = isDarkMode ? "text-gray-400" : "text-gray-500";
  const headingText = isDarkMode ? "text-gray-200 border-gray-800" : "text-gray-800 border-gray-300";
  const borderRule = isDarkMode ? "border-gray-800" : "border-gray-300";
  const italicText = isDarkMode ? "text-gray-400" : "text-gray-600";

  return (
    <AnimatePresence>
      {isResumeOpen && (
        <Window
          isOpen={isResumeOpen}
          onClose={toggleResume}
          title="Document — Resume.pdf"
          isActive={isActive}
          onFocus={onFocus}
          desktopRef={desktopRef}
          isDarkMode={isDarkMode}
          className="top-[5%] left-[15%] w-[680px] h-[550px]"
        >
          {/* Document Utility Bar */}
          <div className={`p-2 border-b flex items-center justify-between select-none text-xs transition-colors duration-500 ${
            isDarkMode 
              ? "bg-gray-900/60 border-gray-800/80 text-gray-300" 
              : "bg-gray-50 border-gray-200 text-gray-600"
          }`}>
            <div className="flex items-center gap-2">
              <span className="font-semibold">📄 Resume.pdf</span>
              <span className="text-[10px] text-gray-500">1.2 MB</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrint}
                className={`px-2.5 py-1 rounded cursor-pointer border font-semibold transition-colors ${
                  isDarkMode 
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-200" 
                    : "bg-white border-gray-200 hover:bg-gray-100 text-gray-700"
                }`}
              >
                🖨️ Print / Save
              </button>
            </div>
          </div>

          {/* Document Body (Centered paper look) */}
          <div className={`flex-grow p-6 overflow-auto transition-colors duration-500 ${
            isDarkMode ? "bg-gray-950/40" : "bg-gray-150"
          }`}>
            {/* Paper Sheet */}
            <div className={`w-full max-w-2xl mx-auto shadow-xl border rounded-md p-8 mb-8 text-left font-serif min-h-[700px] select-text transition-colors duration-500 ${paperBg}`}>
              {/* Header */}
              <div className={`border-b-2 pb-4 mb-6 ${borderRule}`}>
                <h1 className={`text-3xl font-bold tracking-tight ${primaryText}`}>Saifur Rahman</h1>
                <p className={`text-sm italic font-sans mt-1 ${italicText}`}>Full Stack Web Developer</p>
                <div className={`flex flex-wrap gap-x-4 gap-y-1 text-xs font-sans mt-3 ${italicText}`}>
                  <span>🌐 hello@saifur.dev</span>
                  <span>📱 +880 1234 567890</span>
                  <span>💻 github.com/saifur-dev</span>
                  <span>🔗 linkedin.com/in/saifur-dev</span>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <h3 className={`text-sm font-bold uppercase tracking-wider font-sans border-b pb-1 mb-2 ${headingText} ${borderRule}`}>Professional Summary</h3>
                <p className={`text-xs leading-relaxed ${secondaryText}`}>
                  Passionate and results-driven Full Stack Developer with over 4 years of experience crafting high-performance, responsive web applications. Expert in Laravel, React.js, Tailwind CSS, and Shopify integration. Dedicated to writing clean, maintainable code and building premium user experiences.
                </p>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className={`text-sm font-bold uppercase tracking-wider font-sans border-b pb-1 mb-2 ${headingText} ${borderRule}`}>Core Skills</h3>
                <div className={`grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs font-sans ${secondaryText}`}>
                  <div>
                    <span className={`font-bold ${primaryText}`}>Languages:</span> PHP, JavaScript, TypeScript, SQL, HTML5, CSS3
                  </div>
                  <div>
                    <span className={`font-bold ${primaryText}`}>Frameworks:</span> Laravel, React, Next.js, Node.js, Express
                  </div>
                  <div>
                    <span className={`font-bold ${primaryText}`}>Databases & Tools:</span> MySQL, PostgreSQL, Git, Docker, Figma
                  </div>
                  <div>
                    <span className={`font-bold ${primaryText}`}>Specialties:</span> RESTful APIs, Shopify APIs, UI Design, CI/CD
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div className="mb-6">
                <h3 className={`text-sm font-bold uppercase tracking-wider font-sans border-b pb-1 mb-2 ${headingText} ${borderRule}`}>Work Experience</h3>
                
                {/* Exp 1 */}
                <div className="mb-4">
                  <div className="flex justify-between items-start font-sans">
                    <span className={`font-bold text-xs ${primaryText}`}>Senior Web Developer — Tech Solutions</span>
                    <span className={`text-xs ${italicText}`}>2022 - Present</span>
                  </div>
                  <ul className={`list-disc list-outside ml-4 mt-1.5 text-xs space-y-1 ${secondaryText}`}>
                    <li>Led a development squad of 4 to design and deploy employee portal dashboards.</li>
                    <li>Developed core security layers and rate-limited RESTful APIs utilizing Laravel and JWT keys.</li>
                    <li>Refactored heavy SQL operations, improving data load times and query speeds by 35%.</li>
                  </ul>
                </div>

                {/* Exp 2 */}
                <div>
                  <div className="flex justify-between items-start font-sans">
                    <span className={`font-bold text-xs ${primaryText}`}>Frontend Developer — WebCraft Agency</span>
                    <span className={`text-xs ${italicText}`}>2020 - 2022</span>
                  </div>
                  <ul className={`list-disc list-outside ml-4 mt-1.5 text-xs space-y-1 ${secondaryText}`}>
                    <li>Designed and implemented responsive client websites, e-commerce stores, and portfolios.</li>
                    <li>Migrated legacy single-page codebases to modern React, Vite, and tailwind structures.</li>
                    <li>Ensured SEO scores averaged above 95 across all client landing assets.</li>
                  </ul>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className={`text-sm font-bold uppercase tracking-wider font-sans border-b pb-1 mb-2 ${headingText} ${borderRule}`}>Education</h3>
                <div className="flex justify-between items-start font-sans">
                  <div>
                    <span className={`font-bold text-xs ${primaryText}`}>B.Sc. in Computer Science & Engineering</span>
                    <p className={`text-[10px] mt-0.5 ${mutedText}`}>University of Web Technologies</p>
                  </div>
                  <span className={`text-xs ${italicText}`}>2016 - 2020</span>
                </div>
              </div>

            </div>
          </div>
        </Window>
      )}
    </AnimatePresence>
  );
};

export default Resume;
