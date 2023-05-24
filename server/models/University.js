import mongoose, { SchemaType } from "mongoose";
const { Schema, model } = mongoose;

const options = {
    timestamps: true,
};
const universitySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        admin: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        key: {
            type: String,
            required: true,
            max: 5,
        },
        state: {
            type: String,
            enum: ["pending", "active", "refused", "suspended"],
            default: "pending",
        },
        accounts: {
            type: Number,
            default: 50,
        },
        // fields: [
        //     {
        //         field: {
        //             type: Schema.Types.ObjectId,
        //             ref: "Field", //add state here active || archived
        //             unique:true
        //         },
        //         state: {
        //             type: String,
        //             enum: ["active", "archived"],
        //             default: "active",
        //         },
        //     },
        // ],
        // branches: [{

        //     branch: {
        //         // filiéres
        //         type: Schema.Types.ObjectId,
        //         ref: "Branch",
        //     },
        //     state: {
        //         type: String,
        //         enum: ["active", "archived"],
        //         default: "active",
        //     },
        // }
           
        // ],
        // specialties: [
        //     {
        //      specialty: {
        //         type: Schema.Types.ObjectId,
        //         ref: "Specialty",
        //     },  
        //     state: {
        //         type: String,
        //         enum: ["active", "archived"],
        //         default: "active",
        //     },
        //     }
            
        // ],
        // courses : [{
        //     type : Schema.Types.ObjectId,
        //     ref: "Course"
        // }],
    },
    options
);

const University = new model("University", universitySchema);
export default University;
