import {User} from '../models/User.model.js'
import { Todo } from '../models/Todo.model.js'
import { SubTask } from '../models/SubTask.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponce } from '../utils/ApiResponce.js'

const createTitle = asyncHandler(async (req, res) => {
    const { title } = req.body;

    if (!title?.trim()) {
        throw new ApiError(400, "Title is required");  
    }

    const todo = await Todo.create({
        title
    });

     const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $push: {
                Todo: todo._id
            }
        }
    );

    return res.status(201).json(
        new ApiResponce(
            201,
            todo,
            "Title created successfully"
        )
    );
});


const createTask = asyncHandler( async (req,res)=>{
      
    const {titleId} = req.params
    const {task} = req.body

    if(!task?.trim()){
        throw new ApiError(400,"task is required")
    }

    const todo = await Todo.findById(titleId);

    if (!todo) {
        throw new ApiError(404, "Todo not found");
    }

    const newTask = await SubTask.create({task});

    await Todo.findByIdAndUpdate(titleId , {$push : {subTasks : newTask._id}});

    return res.status(201).json(
        new ApiResponce(201,newTask,"new Task add successfuly")
    )
     
})


const getTitle = asyncHandler(async (req, res) => {

    const todos = await User.findById(req.user._id)
        .select("Todo")
        .populate("Todo")  

    if (!todos?.Todo.length) {
        throw new ApiError(404, "todos not found");
    }

    return res.status(200).json(
        new ApiResponce(
            200,
            todos?.Todo,
            "Todos fetched successfully"
        )
    );
});

const getTask = asyncHandler( async (req,res)=>{

     const {titleId} = req.params

     const tasks = await Todo.findById(titleId).select("subTasks").populate("subTasks");

     if(!tasks){
        throw new ApiError(400,"tasks not found");
     }
      
    return res.status(200).json(
        new ApiResponce(200,tasks?.subTasks,"fetch tasks successfuly")
     )
})

const updateTitle = asyncHandler( async (req,res)=>{
    const {titleId} = req.params
    const {title} = req.body

    if(!title?.trim()){
        throw new ApiError(400,"title is required");
    }
    
    if (!titleId) {
        throw new ApiError(400, "titleId is required");
    }

    const Title  = await Todo.findByIdAndUpdate(titleId,{ $set : {title}},{new:true}).select("title");

    if(!Title){
       throw new ApiError(404,"Title not found")
    }
    
    return res.status(200).json(
        new ApiResponce(200,Title,"tilte update successful")
    )

})


const updateTask = asyncHandler(async (req, res) => {

    const { taskId } = req.params;
    const { task } = req.body;

    if (!taskId) {
        throw new ApiError(400, "taskId not found");
    }

    if (!task?.trim()) {
        throw new ApiError(400, "Task is required");
    }
    
    
    const updatedTask = await SubTask.findOneAndUpdate(
    {
        _id: taskId,
        complete: false
    },
    {
        $set: { task }
    },
    {
        new: true
    }
);

if (!updatedTask) {
    throw new ApiError(
        400,
        "Task not found or already completed"
    );
}

    return res.status(200).json(
        new ApiResponce(
            200,
            updatedTask,
            "Task updated successfully"
        )
    );
});

const toggleComplete = asyncHandler(async (req, res) => {

    const { taskId } = req.params;

    if (!taskId) {
        throw new ApiError(400, "TaskId is required");
    }

    const oldTask = await SubTask.findById(taskId);

    if (!oldTask) {
        throw new ApiError(404, "Task not found");
    }

    const task = await SubTask.findByIdAndUpdate(
        taskId,
        {
            $set: {
                complete: !oldTask.complete
            }
        },
        {
            new: true
        }
    );

    return res.status(200).json(
        new ApiResponce(
            200,
            task,
            "Task toggled successfully"
        )
    );
});

const deleteTodo = asyncHandler(async (req, res) => {

    const { titleId } = req.params;

    if (!titleId) {
        throw new ApiError(400, "Title id not found");
    }

    const todo = await Todo.findByIdAndDelete(titleId);

    if (!todo) {
        throw new ApiError(404, "Todo not found");
    }

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $pull: {
                Todo: titleId
            }
        }
    );

    return res.status(200).json(
        new ApiResponce(
            200,
            {},
            "Todo deleted successfully"
        )
    );
});

const deleteTask = asyncHandler(async (req, res) => {

    const { titleId, taskId } = req.params;

    await Todo.findByIdAndUpdate(
        titleId,
        {
            $pull: {
                subTasks: taskId
            }
        }
    );

    await SubTask.findByIdAndDelete(taskId);

    return res.status(200).json(
        new ApiResponce(
            200,
            {},
            "Task deleted successfully"
        )
    );
});


export {createTitle ,createTask, getTitle , getTask , updateTask , updateTitle , toggleComplete , deleteTask , deleteTodo }