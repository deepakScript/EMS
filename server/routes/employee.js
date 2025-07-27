import express from 'express';
import authMiddleware from '../middleware/authMiddlware.js';
import { addEmployee, getEmployee } from '../controllers/employeeController.js';
import { upload } from '../controllers/employeeController.js';


const router = express();

router.get('/', authMiddleware, getEmployee);
router.post('/add',authMiddleware,upload.single('image'),  addEmployee)
// router.get('/',authMiddleware, getDepartments)
// router.get('/:id',authMiddleware, getDepartment)
// router.put('/update/:id',authMiddleware, updateDepartment)
// router.delete('/:id',authMiddleware, deleteDepartment)



export default router