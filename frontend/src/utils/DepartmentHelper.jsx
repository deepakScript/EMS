import axios from "axios";
import { useNavigate } from "react-router-dom";

export const colomns = [
    {
        name: "S No",
        selector: (row) => row.sno,
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true,
    },
    {
        name: "Action",
        cell: (row) => <DepartmentButtons id={row._id} />,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
];

export const DepartmentButtons = ({ id, onDepartmentDelete }) => {
    const navigate = useNavigate();


    const handleDelete = async (id) => {
        const confirm = window.confirm("Do you want to delete?");
        if (confirm) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/department/${id}`,
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, }
                    });
                if (response.data.success) {
                    onDepartmentDelete(id)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
    }
    return (
        <div className=" flex space-x-2">
            <button
                onClick={() => navigate(`/admin-dashboard/department/${id}`)}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
            >
                Edit
            </button>
            <button
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                onClick={()=> {
                    handleDelete(id)
                }}
            >
                Delete
            </button>
        </div>
    );
};
