import Express  from "express";

import { verifyJWT } from "../middlewares/verifyJWT.js";
import { ToggleState, createDoc, deleteDoc, deleteDocs, getDocs, getMyDocs, updateDoc } from "../controllers/studentDocController.js";

const router = Express.Router();

// router.post('/',verifyJWT,createSpecialty);
router.post('/studentDocs',verifyJWT, createDoc);
router.get('/studentDocs',verifyJWT, getDocs);
router.get('/mystudentDocs',verifyJWT, getMyDocs);
router.delete('/studentDocs/:docId',verifyJWT, deleteDoc);
router.delete('/studentDocs',verifyJWT, deleteDocs);
router.patch('/studentDocs/:docId',verifyJWT, ToggleState);
router.put('/studentDocs/:docId',verifyJWT, updateDoc);


// router.get('/', verifyJWT,getSpecialties);

export default router;