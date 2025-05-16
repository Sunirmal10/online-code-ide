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

// GET request

app.get('/', (req, res) => {
    res.send("Backend is running well");
});

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173', // for local development
  'https://online-code-ide-hi90.onrender.com' // deployed frontend
 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // if you're using cookies or auth headers
}));

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



