import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import connectToDatabase from './db/db.js';
connectToDatabase();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);

// Routes


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});