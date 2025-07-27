import axios from 'axios';
import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { EmployeeButtons, colomns } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';




const List = () => {
    const [employees, setEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    

    useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/employees', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userID.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: <img src={`http://localhost:3000/${emp.userID.profileImage}`} />,
            action: <EmployeeButtons id={emp._id} />,
          }));
          setEmployees(data);
        }
      } catch (error) {
        if (error.response && error.response.data.error) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

    return (
        <div className='p-6'>
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Employees</h3>
            </div>
            <div className="flex justify-between items-center my-4">
                <input
                    type="text"
                    placeholder="Search by Dep Name"
                    className="px-4 py-0.5 border border-gray-300 rounded"
                    
                />
                <Link
                    to="/admin-dashboard/add-employee"
                    className="px-4 py-1 bg-teal-600 rounded text-white"
                >
                    Add New Employee
                </Link>
            </div>
            <div>
                {empLoading ? (
                    <div className="text-center mt-10 font-semibold text-gray-600 text-lg">Loading...</div>
                ) : (
                    <DataTable
                        columns={colomns}
                        data={employees}
                        pagination
                        highlightOnHover
                        pointerOnHover
                        striped
                    />
                )}
            </div>
        </div>
    )
}

export default List
