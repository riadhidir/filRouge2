import  express from "express";
import { createResetToken, login, logout, refreshLogin, register, registerAdmin, registerMany, resetPassword } from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import verifyRoles from "../middlewares/verifyRoles.js";
import roles from "../config/roles.js";
import multer from 'multer';
const upload = multer({storage: multer.memoryStorage()});
const router = express.Router();
const { ADMIN,STUDENT,TEACHER,LIBRARIAN} = roles;


router.post('/register', register);
router.post('/register_many',upload.single('data'), registerMany);
router.post('/admin-register', registerAdmin);
router.post('/login', login);
router.patch('/logout', logout);


router.post('/reset-token', createResetToken);

router.patch('/reset-password',resetPassword );
router.get('/refresh', refreshLogin);

export default router;