import React from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Navbar from '../components/dashboard/Navbar';

const AdminDashboard = () => {
  const {user, loading} = useAuth();
  const navigate = useNavigate();

  if(loading){
    return <div>Loading...</div>
  }
  if(!user){
    navigate('/login');
  }
  return (
    <div className='flex'>
      <AdminSidebar/>
      <div className='flex-1 ml-64 bg-gray-100 h-screen '>
        <Navbar/>
      </div>
    </div>
  )
}

export default AdminDashboard
