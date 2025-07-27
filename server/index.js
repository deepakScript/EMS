import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js';
import connectToDatabase from './db/db.js';
connectToDatabase();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.static('public')); // Serve static files from the public directory
app.use(express.json()); // Parse JSON bodies

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/department',departmentRouter);
app.use('/api/employees', employeeRouter);


// Routes


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});