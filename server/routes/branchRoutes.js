import Express  from "express";
import { createBranch,deleteBranch,getBranches,updateBranch } from "../controllers/branchController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
 
const router = Express.Router();

router.post('/',verifyJWT,createBranch);
router.delete('/:branchId',verifyJWT, deleteBranch);
router.patch('/:branchId', verifyJWT,updateBranch);
router.get('/', verifyJWT,getBranches);

export default router;