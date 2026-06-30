import {Router} from 'express';
import {verifyJWT} from '../middleware/auth.middleware.js'
import  {createTitle , createTask , getTitle , getTask , updateTask , updateTitle , toggleComplete , deleteTask , deleteTodo } from '../controllers/todo.controller.js'
const router = Router();


router.route('/createTitle').post(verifyJWT , createTitle)
router.route('/getTitle').get(verifyJWT , getTitle)
router.route('/:titleId/createTask').post(verifyJWT , createTask)
router.route('/:titleId/getTask').get(verifyJWT , getTask)
router.route('/:titleId/updateTitle').patch(verifyJWT , updateTitle)
router.route('/:taskId/updateTask').patch(verifyJWT , updateTask)
router.route('/:taskId/toggleComplete').patch(verifyJWT , toggleComplete)
router.route('/:titleId/:taskId/deleteTask').delete(verifyJWT , deleteTask)
router.route('/:titleId/deleteTodo').delete(verifyJWT , deleteTodo)
 

export default router;