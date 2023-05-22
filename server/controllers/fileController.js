
import { initializeApp } from "firebase/app";
import { getStorage ,ref, uploadBytesResumable } from "firebase/storage";
import firebaseConfig from '../config/fireBase.js';
// Initialize Firebase
// Initialize Cloud Storage and get a reference to the service
// Create a storage reference from our storage service

export const uploadFile = async (req,res)=>{
  const file = req.file;
  
  try {
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
  
    const storageRef = ref(storage, `files/${file.originalname}`);
    // const bytes = new Uint8Array(files);
    uploadBytesResumable(storageRef.child, file).then((snapshot)=>{

      console.log("uploaded a file");
    })

  } catch (err) {
    res.json({message: err.message});
  }

}