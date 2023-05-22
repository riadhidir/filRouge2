
import  express from "express";

import { verifyJWT } from "../middlewares/verifyJWT.js";
import verifyRoles from "../middlewares/verifyRoles.js";
import { getAdmins, getUser, getUsers, updateUser } from '../controllers/userController.js';
import roles from "../config/roles.js";
const router = express.Router();

/**
 * get list of uni's employees with filters 
 * @param filter role
*/
router.get('/',getUsers);
//get list of admins
router.get('/admins', getAdmins);

//get a specific profile
// router.get('/profile',[verifyJWT], getUser);
//update a specific profile
router.patch('/profile',[verifyJWT], updateUser);
router.get('/profile',[verifyJWT], getUser),

//delete a user
router.delete('/:userId',);


export default router;
