import axios from 'axios';

import { useNavigate } from "react-router-dom";


const fetchDepartments = async () => {
    let departments = [];
    try {
        const response = await axios.get('http://localhost:3000/api/department', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.data.success) {
            departments = response.data.departments
        }
    } catch (error) {
        if (error.response && error.response.data.error) {
            alert(error.response.data.error);
        }
    }
    return departments;
};


export const colomns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "50px",
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "150px",
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "100px",
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        sortable: true,
        width: "150px",
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        width: "200px",
    },
    {
        name: "Action",
        cell: (row) => <EmployeeButtons id={row._id} />,
        button: true,
    },
];

export const EmployeeButtons = ({ id }) => {
    const navigate = useNavigate();
    
    
    return (
        <div className=" flex space-x-2 items-center min-w-max">
            <button
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                onClick={() => navigate(`/admin-dashboard/employees/${id}`)}
                >
                View
            </button>
            <button
                className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                >
                Edit
            </button>
            <button
                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                >
                Salary
            </button>
            <button
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                Leave
            </button>
        </div>
    );
};

export {fetchDepartments};