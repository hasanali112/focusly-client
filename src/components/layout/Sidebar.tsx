import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  DollarSign,
  Briefcase,
  Lightbulb,
  Settings,
  Menu,
  X,
} from "lucide-react";

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { path: "/tasks", icon: <CheckSquare size={20} />, label: "Tasks" },
    { path: "/planner", icon: <Calendar size={20} />, label: "Daily Planner" },
    { path: "/expenses", icon: <DollarSign size={20} />, label: "Expenses" },
    { path: "/projects", icon: <Briefcase size={20} />, label: "Projects" },
    { path: "/ideas", icon: <Lightbulb size={20} />, label: "Ideas" },
    { path: "/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white"
        onClick={toggleMobileSidebar}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar for mobile */}
      <div
        className={`
        fixed inset-0 bg-gray-800 bg-opacity-75 z-40 md:hidden transition-opacity duration-300
        ${isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
        onClick={toggleMobileSidebar}
      >
        <div
          className={`
            fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300
            ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-indigo-600">
              ProductivityHub
            </h2>
          </div>
          <nav className="mt-4">
            <ul>
              {navItems.map((item) => (
                <li key={item.path} className="mb-1">
                  <Link
                    to={item.path}
                    className={`
                      flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600
                      ${
                        location.pathname === item.path
                          ? "bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600"
                          : ""
                      }
                    `}
                    onClick={toggleMobileSidebar}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Sidebar for desktop */}
      <div
        className={`
        hidden md:block fixed top-0 left-0 h-full bg-white shadow-lg z-30
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-16" : "w-56"}
      `}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-xl font-bold text-indigo-600">
              ProductivityHub
            </h2>
          )}
          <button
            className="p-1 rounded-md hover:bg-gray-100"
            onClick={toggleSidebar}
          >
            <Menu size={20} className="text-gray-500" />
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.path} className="mb-1">
                <Link
                  to={item.path}
                  className={`
                    flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600
                    ${
                      location.pathname === item.path
                        ? "bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600"
                        : ""
                    }
                  `}
                  title={isCollapsed ? item.label : ""}
                >
                  <span className={isCollapsed ? "mx-auto" : "mr-3"}>
                    {item.icon}
                  </span>
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
