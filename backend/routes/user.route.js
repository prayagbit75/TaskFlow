import { Router } from "express";
import { register , login , logout , deleteAccount , refreshAccessToken , changePassword , getCurrentUser , updateCurrentUser , updateProfileImage} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

router.route('/register').post(
   upload.single("profileImage"),
register);

router.route('/login').post(login)
router.route('/logout').get(verifyJWT , logout)
router.route('/changePassword').post(verifyJWT,changePassword)
router.route('/CurrentUser').get(verifyJWT,getCurrentUser)
router.route('/updateUser').patch(verifyJWT,updateCurrentUser)
router.route('/updateProfileImage').patch(verifyJWT,upload.single("profileImage"),updateProfileImage)
router.route('/deleteAccount').delete(verifyJWT,deleteAccount)

export default router
