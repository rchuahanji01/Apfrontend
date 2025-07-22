
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFileInvoice, FaFileUpload } from 'react-icons/fa';
import { HiOutlineClipboardCheck } from 'react-icons/hi';

const Sidebar = () => {
  const menuItems = [
    { path: '/home/purchaseRequest', label: 'Purchase Request', icon: <FaFileInvoice /> },
    { path: '/home/uploadInvoice', label: 'Upload Invoice', icon: <FaFileUpload /> },
    { path: '/home/approvals', label: 'Approvals', icon: <HiOutlineClipboardCheck /> }

  ];

  return (
    <aside className="w-64 h-screen bg-gray-800 text-gray-100 flex flex-col justify-between shadow-lg">
      {/* Logo and Header */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold tracking-tight text-white mb-8">FinFlo</h2>

        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-700 hover:text-white text-gray-300'
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-500 text-center p-4">
        © {new Date().getFullYear()} FinFlo
      </div>
    </aside>
  );
};

export default Sidebar;
