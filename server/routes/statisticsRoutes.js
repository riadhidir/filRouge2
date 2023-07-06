import  express from "express";
import {homeStats, universitiesStats } from "../controllers/statisticsController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import verifyRoles from "../middlewares/verifyRoles.js";
import roles from "../config/roles.js";
import multer from 'multer';
const upload = multer({storage: multer.memoryStorage()});
const router = express.Router();
const { ADMIN,STUDENT,TEACHER,LIBRARIAN} = roles;


router.get('/', universitiesStats);
router.get('/home', homeStats);
router.get('/:universityId', universitiesStats);



export default router;