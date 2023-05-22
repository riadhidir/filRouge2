import Express  from "express";
import {  createCourse,deleteCourse,getCourse,getCourses,updateCourse} from "../controllers/courseController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Express.Router();

router.post('/',verifyJWT,createCourse);
router.delete('/:courseId',verifyJWT, deleteCourse);
router.patch('/:courseId', verifyJWT,updateCourse);
router.get('/', verifyJWT,getCourses);
router.get('/:courseId', verifyJWT,getCourse);

export default router;