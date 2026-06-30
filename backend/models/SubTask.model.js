import mongoose,{Schema} from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Todo } from "./Todo.model.js";
import { ApiError } from "../utils/ApiError.js";
const subTaskSchema = new Schema(
    {
       task:{
        type:String,
        required:true,
        trim:true,
       },
       complete:{
        type:Boolean,
        default:false,
       }
    },
    {timestamps:true}
)



export const SubTask = mongoose.model('SubTask',subTaskSchema);