import Express  from "express";
import { updateField, deleteField, ToggleFieldState, getField } from "../controllers/fieldController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
 
const router = Express.Router();

// router.post('/', verifyJWT,createField);
router.delete('/:fieldId',verifyJWT, deleteField);
router.get('/:fieldId',verifyJWT, getField);
router.patch('/:fieldId', verifyJWT,updateField);
router.patch('/:fieldId/state', verifyJWT,ToggleFieldState);

// router.get('/', verifyJWT,getFields);

export default router;