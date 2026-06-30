import { Folder, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

function Sidebar({
    titles,
    selectedTodo,
    setSelectedTodo,
    handleUpdateTitle,
    handleDeleteTitle,
}) {

    const [openEditTitle, setOpenEditTitle] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editingTitleId, setEditingTitleId] = useState("");

    const updateTitle = async () => {

        if (!editTitle.trim()) return;

        await handleUpdateTitle(editingTitleId, editTitle);

        setOpenEditTitle(false);

        setEditTitle("");

        setEditingTitleId("");

    };

    return (

        <>

            <aside className="w-72 bg-slate-950 border-r border-slate-700 p-5">

                <h2 className="text-white text-xl font-semibold mb-6">

                    Your Sections

                </h2>

                <div className="space-y-3">

                    {

                        titles.map((todo) => (

                            <div

                                key={todo._id}

                                onClick={() => setSelectedTodo(todo)}

                                className={`flex justify-between items-center rounded-lg p-3 cursor-pointer transition
                                
                                ${
                                    selectedTodo?._id === todo._id
                                        ? "bg-indigo-600 text-white"
                                        : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                                }`}

                            >

                                <div className="flex items-center gap-2">

                                    <Folder size={18} />

                                    <span>

                                        {todo.title}

                                    </span>

                                </div>

                                <div className="flex gap-3">

                                    <button

                                        onClick={(e) => {

                                            e.stopPropagation();

                                            setEditingTitleId(todo._id);

                                            setEditTitle(todo.title);

                                            setOpenEditTitle(true);

                                        }}

                                    >

                                        <Pencil

                                            size={16}

                                            className="hover:text-yellow-400"

                                        />

                                    </button>

                                    <button

                                        onClick={(e) => {

                                            e.stopPropagation();

                                            handleDeleteTitle(todo._id);

                                        }}

                                    >

                                        <Trash2

                                            size={16}

                                            className="hover:text-red-500"

                                        />

                                    </button>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </aside>

            {

                openEditTitle && (

                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

                        <div className="bg-slate-900 border border-slate-700 rounded-2xl w-[420px] p-6">

                            <h2 className="text-2xl font-bold text-white mb-6">

                                Edit Section

                            </h2>

                            <input

                                value={editTitle}

                                onChange={(e) => setEditTitle(e.target.value)}

                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none"

                            />

                            <div className="flex justify-end gap-4 mt-6">

                                <button

                                    onClick={() => setOpenEditTitle(false)}

                                    className="bg-slate-700 px-5 py-2 rounded-lg text-white"

                                >

                                    Cancel

                                </button>

                                <button

                                    onClick={updateTitle}

                                    className="bg-indigo-600 px-5 py-2 rounded-lg text-white"

                                >

                                    Update

                                </button>

                            </div>

                        </div>

                    </div>

                )

            }

        </>

    );

}

export default Sidebar;