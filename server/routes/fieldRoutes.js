import Express  from "express";
import { createField, getFields, updateField, deleteField } from "../controllers/fieldController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
 
const router = Express.Router();

router.post('/', verifyJWT,createField);
router.delete('/:fieldId',verifyJWT, deleteField);
router.patch('/:fieldId', verifyJWT,updateField);
router.get('/', verifyJWT,getFields);

export default router;