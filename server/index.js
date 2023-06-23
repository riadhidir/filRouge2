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
import teacherDocRoutes from './routes/teacherDocRoutes.js'
import studentDocRoutes from './routes/studentDocRoutes.js'
import statisticsRoutes from './routes/statisticsRoutes.js'
import LibraryRoutes from './routes/libraryRoutes.js'

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
app.use(Express.static('/public'))  
// mongoose.set('strictQuery', false);

// app.post('/files', upload.single('file'), uploadFile);
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/universities',universityRoutes);
app.use('/api/fields',fieldRoutes);
app.use('/api/branches',branchRoutes);
app.use('/api/specialties',specialtyRoutes);
app.use('/api/courses',courseRoutes);
app.use('/api/documents',teacherDocRoutes);
app.use('/api/documents',studentDocRoutes);
app.use('/api/statistics',statisticsRoutes);
app.use('/api/library',LibraryRoutes);
mongoose.connection.once('open',()=>{
app.listen(process.env.PORT, ()=>{console.log(`http://localhost:${process.env.PORT}`)});
})

// app.use('/domaines', domaineRoutes);
// app.use('/filieres', filiereRoutes);
// app.use('/specialites', specialiteRoutes);
// app.use('/modules', moduleRoutes);
// app.use('/cycles', cycleRoutes);


