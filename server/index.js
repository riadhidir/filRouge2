import Express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import credentials from "./middlewares/credentials.js";
import connectDB from "./config/DBconn.js"
// import pkg from "express-openid-connect"
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import fieldRoutes from './routes/fieldRoutes.js';
import branchRoutes from './routes/branchRoutes.js';
import specialtyRoutes from './routes/specialtyRoutes.js';
import courseRoutes from './routes/courseRoutes.js'
import universityRoutes from './routes/univertsityRoutes.js'

// import {uploadFile } from './controllers/fileController.js'


// import multer from "multer";
// const upload = multer({ storage:multer.memoryStorage() });
// const {auth, requiresAuth  } = pkg
// import cycleRoutes  from "./routes/cycleRoutes.js";
// import domaineRoutes  from "./routes/domaineRoutes.js";
// import filiereRoutes  from "./routes/filiereRoutes.js";
// import specialiteRoutes  from "./routes/specialiteRoutes.js";
// import moduleRoutes  from "./routes/moduleRoutes.js";
dotenv.config();

//connect to db
connectDB();
const app = Express();

app.use(credentials);
//cross origin Ressource sharing
app.use(cors(corsOptions));
//built in middleware for to handle urlencoded form data
app.use(Express.urlencoded({extended:true}));
//built in middleware for json
app.use(Express.json());

//middleware for cookies
app.use(cookieParser());


//serve static files
// app.use(Express.static('public'))  uncomment this when a public folder is needed
// mongoose.set('strictQuery', false);

// app.post('/files', upload.single('file'), uploadFile);
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/universities',universityRoutes);
app.use('/api/fields',fieldRoutes);
app.use('/api/branches',branchRoutes);
app.use('/api/specialties',specialtyRoutes);
app.use('/api/courses',courseRoutes);
mongoose.connection.once('open',()=>{
app.listen(process.env.PORT, ()=>{console.log(`http://localhost:${process.env.PORT}`)});
})

// app.use('/domaines', domaineRoutes);
// app.use('/filieres', filiereRoutes);
// app.use('/specialites', specialiteRoutes);
// app.use('/modules', moduleRoutes);
// app.use('/cycles', cycleRoutes);


