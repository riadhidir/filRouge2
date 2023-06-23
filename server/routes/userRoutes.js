
import  express from "express";

import { verifyJWT } from "../middlewares/verifyJWT.js";
import verifyRoles from "../middlewares/verifyRoles.js";
import { ToggleUserState, deleteUser, getUser, updateUser } from '../controllers/userController.js';
import roles from "../config/roles.js";
const router = express.Router();

/**
 * get list of uni's employees with filters 
 * @param filter role
*/
// router.get('/',[verifyJWT],getUsers);
//get list of admins
// router.get('/admins', getAdmins);

//get a specific profile
// router.get('/profile',[verifyJWT], getUser);
//update a specific profile
router.patch('/:userId',[verifyJWT], updateUser);

router.patch('/:userId/state',[verifyJWT], ToggleUserState);

router.get('/profile/:userId',[verifyJWT], getUser),
//delete a user
router.delete('/:userId',[verifyJWT],deleteUser);


export default router;
