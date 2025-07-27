import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';


const View = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({});


    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/employees/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.success) {
                    setEmployee(response.data.employee);
                }
            } catch (error) {
                if (error.response && error.response.data.error) {
                    alert(error.response.data.error);
                } else {
                    alert("An error occurred while fetching employee.");
                }
            }
        };

        fetchEmployee();
    }, [id]);

    return (
        <div>
           <div>
                <img src={`http://localhost:3000/uploads/${employee.profile_picture}`} alt="Profile" className="w-32 h-32 rounded-full" />
           </div>
        </div>
    )
}

export default View
