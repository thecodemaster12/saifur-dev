import { notes } from "../data/notes";
import { motion, AnimatePresence, useDragControls } from "framer-motion";

const Notes = ({ isNotesOpen, toggleNotes, isActive, onFocus, desktopRef }) => {
  const dragControls = useDragControls();

  // Define the Mac-like window animation variants
  const macWindowVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.3, 
      y: 300, // Pulls the animation down towards the icon row
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
      y: 400, // Scales down and sinks into the dock location
      filter: "blur(8px)",
      transition: { 
        duration: 0.25, 
        ease: [0.25, 1, 0.5, 1] // Smooth ease-out cubic curve
      }
    }
  };

  return (
    <AnimatePresence>
      {isNotesOpen && (
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
          // Setting the transform origin mimics the window shrinking from/to the bottom edge
          style={{ transformOrigin: "bottom center", zIndex: isActive ? 40 : 10 }}
          className="absolute top-[10%] left-[10%] w-md h-96 overflow-auto border border-gray-700 bg-gray-950/95 rounded-lg shadow-2xl backdrop-blur-md scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600 hover:scrollbar-thumb-slate-500"
        >
          <div 
            className="sticky top-0 bg-gray-900 p-2 flex items-center justify-between cursor-grab active:cursor-grabbing select-none border-b border-gray-800/40"
            onPointerDown={(e) => {
              dragControls.start(e);
              onFocus();
            }}
          >
            <div className="flex gap-2">
              <div onClick={toggleNotes} className="cursor-pointer w-[13px] h-[13px] bg-red-400 rounded-full"></div>
              <div className="cursor-pointer w-[13px] h-[13px] bg-yellow-400 rounded-full"></div>
              <div className="cursor-pointer w-[13px] h-[13px] bg-green-400 rounded-full"></div>
            </div>
            <div className="text-2xl cursor-pointer">+</div>
          </div> 
          
          <div className="grid grid-cols-2 gap-4 p-4">
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notes;