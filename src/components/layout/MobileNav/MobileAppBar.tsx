import { Link, useLocation } from "react-router-dom";
import {
  Home,
  ClipboardEdit,
  Lightbulb,
  Wallet,
  Clipboard,
} from "lucide-react";

const MobileAppBar = () => {
  const location = useLocation();
  const pathName = location.pathname;

  // Define navigation items with their paths and details
  const navItems = [
    {
      id: "home",
      path: "/",
      icon: Home,
      label: "Home",
    },
    {
      id: "tasks",
      path: "/tasks",
      icon: ClipboardEdit,
      label: "Task",
    },
    {
      id: "expenses",
      path: "/expenses",
      icon: Wallet,
      label: "Expenses",
    },
    {
      id: "projects",
      path: "/projects",
      icon: Clipboard,
      label: "Projects",
    },
    {
      id: "ideas",
      path: "/ideas",
      icon: Lightbulb,
      label: "Ideas",
    },
  ];

  // Function to check if a nav item is active
  const isActive = (path: string) => {
    if (path === "/" && pathName === "/") {
      return true;
    }
    return path !== "/" && pathName.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg z-50">
      <div className="relative">
        {/* Main Navigation Bar */}
        <div className="flex items-center justify-around h-[70px]">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center justify-center p-2 ${
                isActive(item.path) ? "text-white" : "text-blue-100"
              }`}
            >
              <item.icon size={22} />
              <span className="text-[14px] mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileAppBar;
