import express from 'express';
import authMiddleware from '../middleware/authMiddlware.js';
import { addDepartment, getDepartments } from '../controllers/departmentController.js';


const router = express();

router.post('/add',authMiddleware, addDepartment)
router.get('/',authMiddleware, getDepartments)


export default router