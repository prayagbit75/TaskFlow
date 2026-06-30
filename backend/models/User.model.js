import mongoose , {Schema} from 'mongoose'      

const userSchema = new Schema(
    {
    name :{
        type : String,
        required : true,
        trim:true,
     },
     username:{
        type:String,
        required:true,
        trim:true,
        unique:true,
     },
     email:{
        type:String,
        required:true,
        unique:true,
     },
     profileImage:{
         url:{
            type:String,  // from cloudinary
         },
         public_id:{
            type:String,
         }
     },
     password:{
        type:String,
        required: [true,"Password is required"],  // custom error 
     },
     Todo : [                                  // store Todo Id and this Todo store subTaskIds
        {
            type:Schema.Types.ObjectId,
            ref:'Todo',
        }
     ],
     refreshToken:{
     type:String,  
     }
},
{timestamps:true}
)


export const User = mongoose.model('User',userSchema);