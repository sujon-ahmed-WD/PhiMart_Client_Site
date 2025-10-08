import  { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from '../components/Dashboard/Sidebar';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
    return (
    <div className="drawer lg:drawer-open">
      {/* Drawer toggle button (for mobile view) */}
      <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
      {/* Page content */}
      <div className="drawer-content p-6">
        {/* Navbar */}
        <Navbar sidebarOpen={sidebarOpen}/>
        {/* Main section */}
        <main className="p-6">
        <Outlet/>
        </main>
      </div>
      {/* Sidebar */}
      <Sidebar />
    </div>
    );
};

export default DashboardLayout;