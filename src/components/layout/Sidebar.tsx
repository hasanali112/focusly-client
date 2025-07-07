import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  ClipboardEdit,
  Calendar,
  Lightbulb,
  Settings,
  Clipboard,
  Wallet,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logout } from "@/redux/features/auth/authSlice";
import MobileAppBar from "./MobileNav/MobileAppBar";

const Sidebar = () => {
  const location = useLocation();
  const dispath = useAppDispatch();
  const navItems = [
    { path: "/", icon: <LayoutGrid size={20} />, label: "Dashboard" },
    { path: "/tasks", icon: <ClipboardEdit size={20} />, label: "Tasks" },
    { path: "/planner", icon: <Calendar size={20} />, label: "Daily Planner" },
    { path: "/expenses", icon: <Wallet size={20} />, label: "Expenses" },
    { path: "/projects", icon: <Clipboard size={20} />, label: "Projects" },
    { path: "/ideas", icon: <Lightbulb size={20} />, label: "Ideas" },
    { path: "/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <div>
      <div
        className="fixed top-0 left-0 h-full bg-white shadow-sm z-30
      transition-all duration-300 ease-in-out hidden md:block md:w-20 lg:w-60"
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
                  <span className="lg:mr-4">{item.icon}</span>
                  <span className="whitespace-nowrap hidden lg:inline">
                    {item.label}
                  </span>
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
      <div className="md:hidden block">
        <MobileAppBar />
      </div>
    </div>
  );
};

export default Sidebar;
