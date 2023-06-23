import Express  from "express";
import { deleteBranch,toggleBranchState,updateBranch } from "../controllers/branchController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
 
const router = Express.Router();


router.delete('/:branchId',verifyJWT, deleteBranch);
router.patch('/:branchId', verifyJWT,updateBranch);
router.patch('/:branchId/state', verifyJWT,toggleBranchState);


export default router;