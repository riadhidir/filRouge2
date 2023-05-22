import mongoose from "mongoose";
import Document from "./Documents.js";
const {Schema} = mongoose;
// td,tp,examen
const highDocsSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        required: true
    },
    subjects:[{
        type: String,
        required: true
    }],
    answers:[{
        type: String,
        required: true
    }]
}); 

const Highdocs = Document.discriminator("Highdoc", highDocsSchema);
export default Highdocs; 