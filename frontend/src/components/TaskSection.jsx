import { Pencil, Trash2, Plus } from "lucide-react";
import { useState } from "react";

function TaskSection({

    selectedTodo,
    tasks,

    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    handleToggleComplete,

}) {

    const [openTask, setOpenTask] = useState(false);

    const [task, setTask] = useState("");

    const [openEditTask, setOpenEditTask] = useState(false);

    const [editTask, setEditTask] = useState("");

    const [editingTaskId, setEditingTaskId] = useState("");



    const addTask = async () => {

        if (!task.trim()) return;

        await handleAddTask(task);

        setTask("");

        setOpenTask(false);

    };


    const updateTask = async () => {

        if (!editTask.trim()) return;

        await handleUpdateTask(
            editingTaskId,
            editTask
        );

        setOpenEditTask(false);

        setEditTask("");

        setEditingTaskId("");

    };


    return (

        <main className="flex-1 p-8 bg-slate-950 border-r ">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl text-white font-bold">

                    {

                        selectedTodo
                            ? selectedTodo.title
                            : "Select Section"

                    }

                </h1>

            </div>


            {/* TASK LIST */}


            <div className="space-y-4">

                {

                    tasks.length === 0 ?

                        (

                            <div className="text-center mt-20">

                                <h2 className="text-slate-400 text-2xl">

                                    No Tasks Found

                                </h2>

                            </div>

                        )

                        :

                        (

                            tasks.map((item) => (

                                <div

                                    key={item._id}

                                    className="bg-slate-900 border border-slate-700 rounded-xl p-4 flex justify-between items-center"

                                >

                                    <div className="flex items-center gap-4">

                                        <input
                                            type="checkbox"
                                            checked={item.complete}
                                            onChange={() => handleToggleComplete(item._id)}
                                            className="w-5 h-5 accent-indigo-500 cursor-pointer"
                                        />

                                        <span

                                            className={`text-lg ${

                                                item.complete

                                                    ?

                                                    "line-through text-slate-500"

                                                    :

                                                    "text-white"

                                            }`}

                                        >

                                            {

                                                item.task

                                            }

                                        </span>

                                    </div>


                                    <div className="flex gap-4">

                                        <button

                                            onClick={() => {

                                                setEditingTaskId(item._id);

                                                setEditTask(item.task);

                                                setOpenEditTask(true);

                                            }}

                                            className="text-yellow-400"

                                        >

                                            <Pencil size={18} />

                                        </button>


                                      <button

                                            onClick={() => handleDeleteTask(item._id)}

                                            className="text-red-500 hover:text-red-600"

                                        >

                                            <Trash2 size={18}/>

                                        </button>

                                    </div>

                                </div>

                            ))

                        )

                }

            </div>



            {/* ADD TASK BUTTON */}



            <button

                disabled={!selectedTodo}

                        onClick={() => setOpenTask(true)}

                    className="mt-8 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 px-6 py-3 rounded-xl text-white flex items-center gap-2"
            >

                <Plus size={18} />

                Add Task

            </button>





            {/* ADD TASK MODAL */}



            {

                openTask && (

                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

                        <div className="bg-slate-900 border border-slate-700 rounded-2xl w-[420px] p-6">

                            <h2 className="text-2xl font-bold text-white mb-6">

                                Add New Task

                            </h2>

                            <input

                                value={task}

                                onChange={(e) => setTask(e.target.value)}

                                placeholder="Enter Task..."

                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none"

                            />

                            <div className="flex justify-end gap-4 mt-6">

                                <button

                                    onClick={() => setOpenTask(false)}

                                    className="bg-slate-700 px-5 py-2 rounded-lg text-white"

                                >

                                    Cancel

                                </button>

                                <button

                                    onClick={addTask}

                                    className="bg-indigo-600 px-5 py-2 rounded-lg text-white"

                                >

                                    Add

                                </button>

                            </div>

                        </div>

                    </div>

                )

            }

                        {/* EDIT TASK MODAL */}

            {
                openEditTask && (

                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

                        <div className="bg-slate-900 border border-slate-700 rounded-2xl w-[420px] p-6">

                            <h2 className="text-2xl font-bold text-white mb-6">

                                Edit Task

                            </h2>

                            <input

                                value={editTask}

                                onChange={(e) => setEditTask(e.target.value)}

                                placeholder="Update Task..."

                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none"

                            />

                            <div className="flex justify-end gap-4 mt-6">

                                <button

                                    onClick={() => setOpenEditTask(false)}

                                    className="bg-slate-700 px-5 py-2 rounded-lg text-white"

                                >

                                    Cancel

                                </button>

                                <button

                                    onClick={updateTask}

                                    className="bg-indigo-600 px-5 py-2 rounded-lg text-white"

                                >

                                    Update

                                </button>

                            </div>

                        </div>

                    </div>

                )

            }

        </main>

    );

}

export default TaskSection;