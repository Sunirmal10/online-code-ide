import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import indexRoute from './routes/indexRoute.js';

// dotenv config

dotenv.config();

// PORT

const port = process.env.PORT || 5000;

// MongoDB connection

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

// express app

const app = express();

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(cors(
  {
    origin: "https://online-code-ide-xv1x.onrender.com"
  }
));

// Routes 

app.use('/', indexRoute);

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again later.",
  });
});

// Start server

app.listen(port, ()=> {
console.log("Server is running on port:", port);
})



