import  express from "express";
import { login, logout, refreshLogin, register, registerAdmin } from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import verifyRoles from "../middlewares/verifyRoles.js";
import roles from "../config/roles.js";
const router = express.Router();
const { ADMIN,STUDENT,TEACHER,LIBRARIAN} = roles;

router.post('/register', register);
router.post('/admin-register', registerAdmin);
router.post('/login', login);
router.patch('/logout', logout);
router.get('/refresh', refreshLogin);

export default router;