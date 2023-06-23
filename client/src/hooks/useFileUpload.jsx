import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
    deleteObject,
    getBlob,
    getBytes,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
    uploadBytesResumable,
    uploadString,
} from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCcK5xvAavsisF31WUY-W264rpieeE-uL4",
    authDomain: "filrouge-f24d1.firebaseapp.com",
    projectId: "filrouge-f24d1",
    storageBucket: "filrouge-f24d1.appspot.com",
    messagingSenderId: "204694112604",
    appId: "1:204694112604:web:9e33dd3ce17336407e1999",
    measurementId: "G-4GJ1PB6R6X",
};
const useFileUpload = () => {
    const app = initializeApp(firebaseConfig);
    // Initialize Cloud Storage and get a reference to the service
    const storage = getStorage(app);
    // Create a storage reference from our storage service
    function filenameFormat(str) {
        const timestamp = Date.now(); // Get the current timestamp
        const uniqueString = `${timestamp}_${str}`; // Append the timestamp to the string
        return uniqueString;
    }
    const uploadFile = async (item) => {
        const storageRef = ref(
            storage,
            `files/${filenameFormat(item?.file.name)}`
        );
        try {
            const uploadTask = await uploadBytes(storageRef, item.file, {
                contentType: item?.file.type,
            });

            const url = await getDownloadURL(uploadTask?.ref);
            return { ref: storageRef._location.path_, url };
        } catch (e) {
            throw e;
        }
    };

    const deleteFile = async (prevRef) => {
        const desertRef = ref(storage, `${prevRef}`);
        try {
            await deleteObject(desertRef);
        } catch (e) {
            throw e;
        }
    };
    const updateFile = async (item,prevRef)=>{
        const subjectresult = await uploadFile(item);
        await deleteFile(prevRef);
        return subjectresult;
    }


    return {uploadFile, deleteFile,updateFile};
    // return <div>useFileUpload</div>;
};

export default useFileUpload;
