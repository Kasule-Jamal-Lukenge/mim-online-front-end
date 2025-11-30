import React, { useState } from 'react';

export default function SidebarComponent({ onNavigate }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: 'fa-tachometer-alt',
      path: '/admin/dashboard'
    },
    {
      title: 'Orders',
      icon: 'fa-shopping-cart',
      path: '/admin/orders'
    },
    {
      title: 'Products',
      icon: 'fa-box',
      path: '/admin/products'
    },
    {
      title: 'Categories',
      icon: 'fa-list',
      path: '/admin/categories'
    },
    {
      title: 'Customers',
      icon: 'fa-users',
      path: '/admin/customers'
    },
    {
      title: 'Reports',
      icon: 'fa-chart-bar',
      path: '/admin/reports'
    },
    {
      title: 'Settings',
      icon: 'fa-cog',
      path: '/admin/settings'
    }
  ];

  return (
    <div
      className={`bg-blue-900 text-white h-screen fixed left-0 top-0 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } shadow-lg z-40`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-blue-800">
        {!isCollapsed && (
          <h2 className="text-xl font-bold">Alostore Admin</h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:bg-blue-800 p-2 rounded transition"
        >
          <i className={`fas ${isCollapsed ? 'fa-angle-right' : 'fa-angle-left'}`}></i>
        </button>
      </div>

      {/* Menu Items */}
      <nav className="mt-6">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => onNavigate && onNavigate(item.path)}
            className="w-full flex items-center gap-4 px-4 py-3 bg-blue-900 hover:bg-blue-800 transition group"
            title={isCollapsed ? item.title : ''}
          >
            <i className={`fas ${item.icon} text-lg w-6`}></i>
            {!isCollapsed && (
              <span className="text-sm font-medium">{item.title}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-800">
          <p className="text-xs text-blue-300 text-center">
            © 2025 Alostore Africa
          </p>
        </div>
      )}
    </div>
  );
}