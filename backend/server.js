import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/auth.js';
import eventRoutes from './routes/eventRoutes.js';
// import startScheduler from './utils/sendReminderScheduler.js';

// Load environment variables
dotenv.config();

const app = express();

const allowedOrigins = [

  process.env.FRONTEND_ORIGIN || 'http://localhost:5173',

  'https://event-reminder-frontend.vercel.app', // <-- add your deployed frontend domain here

];

// Middleware
// app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }));
app.use(

  cors({

    origin: function (origin, callback) {

      // Allow requests with no origin (like mobile apps or Postman)

      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      return callback(new Error('CORS policy violation: Origin not allowed'));

    },

    methods: ['GET', 'POST', 'PUT', 'DELETE'],

    credentials: true,

  })

);

app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Test route
app.get('/', (req, res) => res.json({ ok: true }));

// Port
const PORT = process.env.PORT || 4000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log('Server listening on', PORT);
    });
    // Start the reminders scheduler
    // startScheduler();
  })
  .catch(err => console.error('DB error', err));
