import Express  from "express";
import { createSpecialty,deleteSpecialty,getSpecialties,updateSpecialty} from "../controllers/specialtyController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Express.Router();

router.post('/',verifyJWT,createSpecialty);
router.delete('/:specialtyId',verifyJWT, deleteSpecialty);
router.patch('/:specialtyId',verifyJWT ,updateSpecialty);
router.get('/', verifyJWT,getSpecialties);

export default router;