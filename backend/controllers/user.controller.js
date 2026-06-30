import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {User} from '../models/User.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponce } from '../utils/ApiResponce.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import cloudinary from 'cloudinary'
import { SubTask } from '../models/SubTask.model.js';
import { Todo } from '../models/Todo.model.js';

const cookieOption = {
  httpOnly:true,
  secure:true,
   sameSite:"None"
}

const register = asyncHandler(async (req,res)=>{

  console.log("Register API Hit");
          
        const {name,username,email,password} = req.body
          
        if(
          [name,username,email,password].some((field)=> field?.trim()==="" )
        ){
          throw new ApiError(400,"All field are required")
        }
        
        const isUser = await User.findOne({$or : [{username},{email}]})

        if(isUser){
          throw new ApiError(409,"user or username already exist")
        }

          const profileImagePath = req.file?.path

          let response = ""

          if(profileImagePath){
              response = await uploadOnCloudinary(profileImagePath)
          }

          const hashPassword = await bcrypt.hash(password,10);

          const user = await User.create(
            {
              name,
              username,
              email,
              profileImage:{
                url:response?.url || "",
                public_id:response?.public_id || ""
              },
              password : hashPassword,
            }
          )
          
          const createUser = await User.findById(user._id).select("-password");

          if(createUser){
             return res.status(200).json(
                new ApiResponce(201 , createUser,"user created")
              )
          }

      if (response?.public_id) {
         await cloudinary.uploader.destroy(
            response.public_id
        );
    }

    throw new ApiError(500,"user not created");
          
})

const login = asyncHandler( async (req,res)=>{
       const {username , email , password} = req.body

       if(!username && !email){
         throw new ApiError(400,"username or email is required");
       }

       if(!password){
        throw new ApiError(400,"password is required");
       }
      
       const user = await User.findOne(username ? {username} : {email})

        if(!user){
        throw new ApiError(400,"user not found");
       }

       const isPasswordTrue = await bcrypt.compare(password,user.password);

       if(!isPasswordTrue){
        throw new ApiError(401 , "Invalid user credential");
       }  

       const accessToken = jwt.sign({_id:user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
       const refreshToken = jwt.sign({_id:user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})

       user.refreshToken = refreshToken;
       user.save({validateBeforeSave : false});

       const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

       return res.status(200)
       .cookie('accessToken',accessToken,cookieOption)
       .cookie('refreshToken',refreshToken,cookieOption)
       .json(new ApiResponce(
        200,
        {
          user:loggedInUser,
          accessToken,
          refreshToken
        },
        "login successful"
       ))
})

const logout = asyncHandler( async (req,res)=>{
   
      await User.findByIdAndUpdate(req.user._id,{  $set : {refreshToken:""}},{new : true});

     return res.status(200)
      .clearCookie('accessToken',cookieOption)
      .clearCookie("refreshToken",cookieOption)
      .json(new ApiResponce(200,{},"loggout successful"))
})
   
const refreshAccessToken = asyncHandler( async (req,res)=>{
      const refreshtoken = req.cookie.refreshToken || req.body.refreshToken;

      if(!refreshtoken){
          throw new ApiError(401,"unauthorize user");
      }

      try {
        const decodedToken = jwt.verify(refreshtoken,process.env.REFRESH_TOKEN_SECRET)
  
        const user = await User.findById(decodedToken?._id);
  
        if(!user){
          throw new ApiError(401, "invalid refresh token");
        }
             
        if(user?.refreshToken!==refreshtoken){
          throw new ApiError(400,"refreshToken is expire or used");
        }
  
         const accessToken = jwt.sign({_id:user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
         const refreshToken = jwt.sign({_id:user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
  
         user.refreshToken = refreshToken;
         user.save({validateBeforeSave : false});
        
         return res.status(200)
         .cookie("accessToken",accessToken,cookieOption)
         .cookie("refreshToken",refreshToken,cookieOption)
         .json(
          new ApiResponce(
            200,
            {accessToken,refreshToken},
            "token refresh successful"
          )
         )
      } catch (error) {
          throw new ApiError(
            400,
            error?.message || "invalid token",
          )
      }

})

const  changePassword = asyncHandler( async (req,res)=>{
      const {oldPassword , newPassword } = req.body
      
      if(!(oldPassword?.trim())|| !(newPassword?.trim())){
        throw new ApiError(400,"All field are required");
      }
       
      const user = await User.findById(req.user._id);
           
      if(!user){
        throw new ApiError(400,"user not found");
      }



      const isPasswordTrue = await bcrypt.compare(oldPassword,user.password);
      
      if(!isPasswordTrue){
        throw new ApiError(401,"Invalid old password");
      }

        const hashPassword = await bcrypt.hash(newPassword,10);

        user.password = hashPassword;
        await user.save({validateBeforeSave:false});

        return res.status(200).json(
          new ApiResponce(200,{},"password change successful")
        )

})
      const getCurrentUser = asyncHandler( async (req,res)=>{
        if(!req.user){
          throw new ApiError(401, "Unauthorized");
        }
          return res.status(200).json(
            new ApiResponce(
              200,
              req.user,
              "fetch successful"
            )
          )
      })
const updateCurrentUser = asyncHandler(async (req, res) => {
    const { name, email } = req.body;

    if (!name?.trim() || !email?.trim()) {
        throw new ApiError(400, "All fields are required");
    }

    if (req.user.email !== email) {
        const check = await User.findOne({
            email,
            _id: { $ne: req.user._id }
        });

        if (check) {
            throw new ApiError(400, "Email already exists");
        }
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                name,
                email
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken");

    return res.status(200).json(
        new ApiResponce(
            200,
            user,
            "User updated successfully"
        )
    );
}); 


const updateProfileImage = asyncHandler( async (req,res)=>{
  
  const imagePath = req.file?.path
  if(!imagePath){
     throw new ApiError(400 , "file path is not exist")
  }
                                            
  const uploadImage =  await uploadOnCloudinary(imagePath);

  if(!uploadImage){
    throw new ApiError(500,"something went wrong while uploading image");
  }



  const oldpublic_id = req.user?.profileImage?.public_id;


  const user = await User.findByIdAndUpdate(req.user._id , {
    $set :{
      profileImage : {
        url : uploadImage?.url,
        public_id : uploadImage?.public_id
      }
     }
  }, {new:true}).select(" -password -refreshToken")
    
  if(oldpublic_id){
    await cloudinary.uploader.destroy(req.user.profileImage.public_id);
  }

  res.status(200).json(
    new ApiResponce(200,
      user,
      "Profile Image update Successful"
    )
  )
})

const deleteAccount = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
        .populate("Todo");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const subTaskIds = [];

    user.Todo.forEach(todo => {
        subTaskIds.push(...todo.subTasks);
    });

    await SubTask.deleteMany({
        _id: {
            $in: subTaskIds
        }
    });

    await Todo.deleteMany({
        _id: {
            $in: user.Todo.map(todo => todo._id)
        }
    });

    await cloudinary.uploader.destroy(req.user.profileImage.public_id);

    await User.findByIdAndDelete(
        req.user._id
    );


    return res.status(200).json(
        new ApiResponce(
            200,
            {},
            "Account deleted successfully"
        )
    );
});




export {register,login ,logout ,deleteAccount, refreshAccessToken , getCurrentUser , changePassword , updateCurrentUser , updateProfileImage} 