import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";

import testRoutes from "./routes/testRoutes.js";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRotues from "./routes/userRotues.js";
import resturantRoutes from "./routes/resturantRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";

// Rest object
const app = express();

// Parse JSON
app.use(express.json());

//dot env configation
dotenv.config();
connectDb();

//middleware 
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// route
app.get('/', (req, res) => {
  res.send("<h1>Welcome to food App runing successfully!</h1>");
});


// API route
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRotues);
app.use('/api/v1/resturant', resturantRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/food', foodRoutes);

// port
const PORT = process.env.PORT || 9090;

// listen
app.listen(PORT, () => {
  console.log(`server runing on ${PORT}`.white.bgMagenta);
});