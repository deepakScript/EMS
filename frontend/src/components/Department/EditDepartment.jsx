import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [department, setDepartment] = useState({
    dep_name: '',
    description: ''
  });
  const [depLoading, setDepLoading] = useState(true);

  useEffect(() => {
    const fetchDepartment = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        if (error.response && error.response.data.error) {
          alert(error.response.data.error);
        } else {
          alert("An error occurred while fetching department.");
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/department/update/${id}`, department, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        alert('Department updated successfully!');
        navigate('/admin-dashboard/departments');
      }
    } catch (error) {
      alert('Error updating department');
    }
  };

  return (
    <>
      {depLoading ? (
        <div className="text-center mt-10 font-semibold text-gray-600 text-lg">Loading...</div>
      ) : (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
          <h3 className="text-2xl font-bold mb-6">Edit Department</h3>
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
      )}
    </>
  );
};

export default EditDepartment;
