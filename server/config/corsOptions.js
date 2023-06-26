import allowedOrigins from "./allowedOrigins.js";

const corsOptions = {
    origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        // console.log(origin)
        callback(null, true)
    } else {
        // console.log(origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200
    }
export default corsOptions;