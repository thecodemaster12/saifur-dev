import { notes } from "../data/notes"

const Notes = () => {
  return (
    <div className="w-md h-96 overflow-auto border bg-black rounded scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-400 hover:scrollbar-thumb-slate-500">
       <div className="bg-gray-900 p-2 flex items-center justify-between">
            <div className="flex gap-2">
                <div className="w-[13px] h-[13px] bg-red-400 rounded-full"></div>
                <div className="w-[13px] h-[13px] bg-yellow-400 rounded-full"></div>
                <div className="w-[13px] h-[13px] bg-green-400 rounded-full"></div>
            </div>
            <div className="text-2xl">
                +
            </div>
        </div> 
        <div className="grid grid-cols-2 gap-4 p-4">
            {notes.map((note) => (
                <div key={note.id} className={`note-item ${note.bg_color}`}>
                    <h6 className="font-bold mb-2">{note.title}</h6>
                    <ul className="list-disc list-inside text-sm">
                        {note.lists.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Notes