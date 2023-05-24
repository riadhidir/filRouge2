import Express  from "express";
import { createSpecialty,deleteSpecialty,getSpecialties,toggleSpecialtyState,updateSpecialty} from "../controllers/specialtyController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Express.Router();

// router.post('/',verifyJWT,createSpecialty);
router.delete('/:specialtyId',verifyJWT, deleteSpecialty);
router.patch('/:specialtyId',verifyJWT ,updateSpecialty);
router.patch('/:specialtyId',verifyJWT ,toggleSpecialtyState);
// router.get('/', verifyJWT,getSpecialties);

export default router;