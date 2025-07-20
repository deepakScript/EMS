import { useNavigate } from "react-router-dom";

export const colomns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        sortable: true,
        width: "80px",
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

export const DepartmentButtons = ({ id }) => {
    const navigate = useNavigate();
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
            >
                Delete
            </button>
        </div>
    );
};
