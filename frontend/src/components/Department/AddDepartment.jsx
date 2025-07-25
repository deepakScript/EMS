import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: '',
    description: '',
  });

  const navigate = useNavigate();

  // ✅ Corrected function syntax and destructuring
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/department/add', department, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        navigate('/admin-dashboard/departments');
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        console.log(error.response.data.error);
      } else {
        alert('An error occurred while adding the department.');
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h3 className="text-2xl font-bold mb-6">Add Department</h3>
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
            required
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
          Add Department
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
