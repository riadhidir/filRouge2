import Express  from "express";
import {  deleteCourse,toggleCourseState,updateCourse} from "../controllers/courseController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Express.Router();

// router.post('/',verifyJWT,createCourse);
router.delete('/:courseId',verifyJWT, deleteCourse);
router.patch('/:courseId', verifyJWT,updateCourse);
// router.get('/', verifyJWT,getCourses);
router.get('/:courseId', verifyJWT,toggleCourseState);

export default router;