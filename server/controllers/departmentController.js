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

const getDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById({ _id: id })
        return res.status(200).json({ success: true, department })
    } catch (error) {
        return res.status(500).json({ success: false, error: "get department server error" })
    }
}

const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { dep_name, description } = req.body;

        const updateDep = await Department.findByIdAndUpdate({ _id: id }, { dep_name, description });
        return res.status(200).json({ success: true, updateDep });
    } catch (error) {
        return res.status(500).json({ success: false, error: "update department server error" })
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteDep = await Department.findByIdAndDelete({ _id: id });
        return res.status(200).json({ success: true, deleteDep });
    } catch (error) {
        return res.status(500).json({ success: false, error: "delete department server error" })
    }
}

export { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment };
