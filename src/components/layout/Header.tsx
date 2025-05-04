import { useAppSelector } from "@/hooks/useAppSelector";
import { Bell, User } from "lucide-react";

const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between border-b border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800">Welcome</h1>

      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
        </button>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-700 hidden md:inline-block">
              {user?.email}
            </span>
            <span className="text-sm font-medium text-gray-700 hidden md:inline-block">
              {user?.userId}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
