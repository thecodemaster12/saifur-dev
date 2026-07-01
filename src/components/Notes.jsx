import { notes } from "../data/notes";
import { AnimatePresence } from "framer-motion";
import Window from "./Window";

const Notes = ({ isNotesOpen, toggleNotes, isActive, onFocus, desktopRef, isDarkMode }) => {
  return (
    <AnimatePresence>
      {isNotesOpen && (
        <Window
          isOpen={isNotesOpen}
          onClose={toggleNotes}
          title="Notes"
          isActive={isActive}
          onFocus={onFocus}
          desktopRef={desktopRef}
          isDarkMode={isDarkMode}
          className="top-[10%] left-[10%] w-md h-96"
        >
          <div className="flex-grow overflow-auto p-4 pb-8">
            <div className="grid grid-cols-2 gap-4">
              {notes.map((note) => (
                <div key={note.id} className={`note-item ${note.bg_color} p-4 rounded`}>
                  <h6 className="font-bold mb-2 text-gray-900">{note.title}</h6>
                  <ul className="list-disc list-inside text-sm text-gray-800">
                    {note.lists.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Window>
      )}
    </AnimatePresence>
  );
};

export default Notes;