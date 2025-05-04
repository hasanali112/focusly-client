import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  ClipboardEdit,
  Calendar,
  DollarSign,
  Briefcase,
  Lightbulb,
  Settings,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logout } from "@/redux/features/auth/authSlice";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const dispath = useAppDispatch();
  const navItems = [
    { path: "/", icon: <LayoutGrid size={20} />, label: "Dashboard" },
    { path: "/tasks", icon: <ClipboardEdit size={20} />, label: "Tasks" },
    { path: "/planner", icon: <Calendar size={20} />, label: "Daily Planner" },
    { path: "/expenses", icon: <DollarSign size={20} />, label: "Expenses" },
    { path: "/projects", icon: <Briefcase size={20} />, label: "Projects" },
    { path: "/ideas", icon: <Lightbulb size={20} />, label: "Ideas" },
    { path: "/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <div
      className="fixed top-0 left-0 h-full bg-white shadow-sm z-30
      transition-all duration-300 ease-in-out w-52 "
    >
      <div className="flex items-center justify-center pt-2">
        <img src={logo} alt="EfficiZen" className="w-20" />
      </div>
      <nav className="mt-4 ">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`
                  flex items-center px-6 py-4 text-gray-700 hover:text-indigo-600
                  ${
                    location.pathname === item.path
                      ? "bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600"
                      : ""
                  }
                 
                `}
                title={item.label}
              >
                <span className="mr-4">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="absolute bottom-2 left-3 w-full">
          <Button
            onClick={() => dispath(logout())}
            className="w-[80%] bg-gradient-to-r bg-linear-to-bl from-violet-500 to-fuchsia-500 text-white"
          >
            <span>Logout</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
