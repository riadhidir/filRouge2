import mongoose from "mongoose";
import Document from "./Documents.js";
const {Schema} = mongoose;
// memoire, these
const lowDocsSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    link:[{
        type: String,
        required: true
    }]
    
}); 

const Lowdocs = Document.discriminator("Lowdoc", lowDocsSchema);
export default Lowdocs; 