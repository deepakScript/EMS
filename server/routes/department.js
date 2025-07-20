import express from 'express';
import authMiddleware from '../middleware/authMiddlware.js';
import { addDepartment, getDepartments,getDepartment, updateDepartment, deleteDepartment } from '../controllers/departmentController.js';


const router = express();

router.post('/add',authMiddleware, addDepartment)
router.get('/',authMiddleware, getDepartments)
router.get('/:id',authMiddleware, getDepartment)
router.put('/update/:id',authMiddleware, updateDepartment)
router.delete('/:id',authMiddleware, deleteDepartment)



export default router