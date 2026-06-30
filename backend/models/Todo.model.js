import mongoose,{Schema} from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "./User.model.js"; 
import { ApiError } from "../utils/ApiError.js";
import { SubTask } from "./SubTask.model.js";

const todoSchema = new Schema(
    {
     title:{
        type:String,
        required:true,
        trim:true,
     },
     subTasks :[
        {
            type:Schema.Types.ObjectId,
            ref:'SubTask'
        }
     ] 
    },
    {timestamps:true}  
) 


todoSchema.pre(
    "findOneAndDelete",
    async function() {
      
        const todo = await this.model.findOne(
            this.getFilter()
        );

        if (todo) {
            await SubTask.deleteMany({
                _id: {
                    $in: todo.subTasks
                }
            });
        }

    }
);


export const Todo = mongoose.model('Todo',todoSchema);