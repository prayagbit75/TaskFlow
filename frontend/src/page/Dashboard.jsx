import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import api from "../api/axios";

import Sidebar from "../components/Sidebar";
import TaskSection from "../components/TaskSection";

import {
    setTitles,
    setSelectedTodo,
    updateTitle,
    deleteTitle,
} from "../features/todoSlice";

export default function Dashboard() {

    const dispatch = useDispatch();

    const { titles, selectedTodo } = useSelector(
        (state) => state.todo
    );

    const [tasks, setTasks] = useState([]);

    // ===========================
    // Fetch Titles
    // ===========================

    useEffect(() => {

        const fetchTitles = async () => {

            try {

                const response = await api.get(
                    "/todo/getTitle"
                );

                dispatch(
                    setTitles(response.data.data)
                );

                if (
                    response.data.data.length > 0
                ) {

                    dispatch(
                        setSelectedTodo(
                            response.data.data[0]
                        )
                    );

                }

            }

            catch (err) {

                console.log(err);

            }

        };

        if (titles.length === 0) {

            fetchTitles();

        }

    }, [dispatch, titles.length]);



    // ===========================
    // Fetch Tasks
    // ===========================

    const fetchTasks = async (titleId) => {

        try {

            const response = await api.get(

                `/todo/${titleId}/getTask`

            );

            setTasks(
                response.data.data
            );

        }

        catch (err) {

            console.log(err);

        }

    };



    useEffect(() => {

        if (selectedTodo) {

            fetchTasks(
                selectedTodo._id
            );

        }

    }, [selectedTodo]);



    // ===========================
    // TITLE
    // ===========================

    const handleUpdateTitle = async (
        titleId,
        title
    ) => {

        try {

            const response = await api.patch(

                `/todo/${titleId}/updateTitle`,

                {
                    title
                }

            );

            dispatch(

                updateTitle(
                    response.data.data
                )

            );

        }

        catch (err) {

            console.log(err);

        }

    };



    const handleDeleteTitle = async (
        titleId
    ) => {

        const ok = window.confirm(

            "Delete Section ?"

        );

        if (!ok) return;

        try {

            await api.delete(

                `/todo/${titleId}/deleteTodo`

            );

            dispatch(

                deleteTitle(titleId)

            );

            if (
                selectedTodo?._id === titleId
            ) {

                setTasks([]);

            }

        }

        catch (err) {

            console.log(err);

        }

    };



    // ===========================
    // TASK
    // ===========================

    const handleAddTask = async (
        task
    ) => {

        try {

            await api.post(

                `/todo/${selectedTodo._id}/createTask`,

                {
                    task
                }

            );

            await fetchTasks(
                selectedTodo._id
            );

        }

        catch (err) {

            console.log(err);

        }

    };



    const handleUpdateTask = async (

        taskId,

        task

    ) => {

        try {

            await api.patch(

                `/todo/${taskId}/updateTask`,

                {
                    task
                }

            );

            await fetchTasks(
                selectedTodo._id
            );

        }

        catch (err) {

            console.log(err);

        }

    };



    const handleToggleComplete = async (

        taskId

    ) => {

        try {

            await api.patch(

                `/todo/${taskId}/toggleComplete`

            );

            await fetchTasks(
                selectedTodo._id
            );

        }

        catch (err) {

            console.log(err);

        }

    };



    const handleDeleteTask = async (

        taskId

    ) => {

        const ok = window.confirm(

            "Delete Task ?"

        );

        if (!ok) return;

        try {

            await api.delete(

                `/todo/${selectedTodo._id}/${taskId}/deleteTask`

            );

            await fetchTasks(
                selectedTodo._id
            );

        }

        catch (err) {

            console.log(err);

        }

    };
    return (
        <>
        <div className="bg-slate-950 min-h-screen flex ">
 <Sidebar
    titles={titles}
    selectedTodo={selectedTodo}
    setSelectedTodo={(todo) => dispatch(setSelectedTodo(todo))}
    handleUpdateTitle={handleUpdateTitle}
    handleDeleteTitle={handleDeleteTitle}
/>

<TaskSection
    selectedTodo={selectedTodo}
    tasks={tasks}
    handleAddTask={handleAddTask}
    handleUpdateTask={handleUpdateTask}
    handleDeleteTask={handleDeleteTask}
    handleToggleComplete={handleToggleComplete}
/>
        </div>
       
        </>
    )

}