import Department from '../models/Department.js';


const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return res.status(200).json({ success: true, departments });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'get department server error' });
    }
}

const addDepartment = async (req, res) => {
    try {
        const { dep_name, description } = req.body;

        // ✅ Optional: Check for duplicates
        const existing = await Department.findOne({ dep_name });
        if (existing) {
            return res.status(400).json({ success: false, error: 'Department name already exists' });
        }

        const newDepartment = new Department({
            dep_name,
            description,
        });

        await newDepartment.save();

        // ❌ Remove console.log after return; it won't be executed
        console.log(newDepartment); // ✅ Place before return if needed for debugging

        return res.status(200).json({ success: true, department: newDepartment });

    } catch (error) {
        console.error(error); // ✅ Helpful for debugging server logs
        return res.status(500).json({ success: false, error: 'Add department server error' });
    }
};

export { addDepartment, getDepartments };
