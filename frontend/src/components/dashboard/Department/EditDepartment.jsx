import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const EditDepartment = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState(null)
    const [depLoading, setDepLoading] = useState(false)

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.success) {
                    setDepartment(response.data.department)
                }
            } catch (error) {
                if (error.response && error.response.data.error) {
                    alert(error.response.data.error);
                } else {
                    alert("An error occurred while fetching departments.");
                }
            } finally {
                console.log("finally done");

            }
        };

        fetchDepartments();
    }, []);
    return (
        <>
            {depLoading ? <div>
                Loading ...
            </div> :
                <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
                    <h3 className="text-2xl font-bold mb-6">Edit`` Department</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="dep_name" className="text-sm font-medium text-gray-700 block mb-1">
                                Department Name
                            </label>
                            <input
                                type="text"
                                name="dep_name"
                                id="dep_name"
                                placeholder="Enter Dep Name"
                                value={department.dep_name}
                                onChange={handleChange}
                                value
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="text-sm font-medium text-gray-700 block mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                placeholder="Description"
                                value={department.description}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                rows="4"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Edit Department
                        </button>
                    </form>
                </div>
            } </>
    )
}

export default EditDepartment
