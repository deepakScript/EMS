import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaBuilding,
  FaCalendar,
  FaMoneyBill,
  FaTachometerAlt,
  FaTimesCircle,
  FaUsers
} from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
      <div className='bg-teal-600 flex items-center justify-center py-4'>
        <h3 className='text-2xl text-center font-pacific'>Employee Ms</h3>
      </div>
      <div className='px-4'>
        <NavLink
          to='/admin-dashboard'
          className={({ isActive }) =>
            `${isActive ? 'bg-teal-500 ' : ''}flex items-center space-x-4 py-2.5 px-4 rounded`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to='/admin-dashboard/employees'
          className={({ isActive }) =>
            `${isActive ? 'bg-teal-500 ' : ''}flex items-center space-x-4 py-2.5 px-4 rounded`
          }
        >
          <FaUsers />
          <span>Employee</span>
        </NavLink>

        <NavLink
          to='/admin-dashboard/departments'
          className={({ isActive }) =>
            `${isActive ? 'bg-teal-500 ' : ''}flex items-center space-x-4 py-2.5 px-4 rounded`
          }
        >
          <FaBuilding />
          <span>Department</span>
        </NavLink>

        <NavLink
          to='/admin-dashboard/leave'
          className={({ isActive }) =>
            `${isActive ? 'bg-teal-500 ' : ''}flex items-center space-x-4 py-2.5 px-4 rounded`
          }
        >
          <FaCalendar />
          <span>Leave</span>
        </NavLink>

        <NavLink
          to='/admin-dashboard/salary'
          className={({ isActive }) =>
            `${isActive ? 'bg-teal-500 ' : ''}flex items-center space-x-4 py-2.5 px-4 rounded`
          }
        >
          <FaMoneyBill />
          <span>Salary</span>
        </NavLink>

        <NavLink
          to='/admin-dashboard/setting'
          className={({ isActive }) =>
            `${isActive ? 'bg-teal-500 ' : ''}flex items-center space-x-4 py-2.5 px-4 rounded`
          }
        >
          <FaTimesCircle />
          <span>Setting</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
