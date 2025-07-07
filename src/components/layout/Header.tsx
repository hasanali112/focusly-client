import { useAppSelector } from "@/hooks/useAppSelector";
import { Bell, User } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm py-4 px-3 md:px-6 flex items-center justify-between border-b border-gray-200 fixed top-0 w-full md:w-[calc(100%-80px)] lg:w-[calc(100%-240px)] z-40">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 truncate md:max-w-[200px] max-w-none">
        Welcome
      </h1>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <button
          className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Notifications"
        >
          <Bell size={20} className="text-gray-600" />
        </button>

        <div className="relative flex items-center">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
              <User size={16} className="text-white" />
            </div>

            <div className="hidden sm:flex sm:flex-col">
              {user?.email && (
                <span className="text-sm font-medium text-gray-700 truncate max-w-[150px] md:max-w-[200px]">
                  {user.email}
                </span>
              )}
              {user?.userId && (
                <span className="text-xs text-gray-500 truncate max-w-[150px] md:max-w-[200px]">
                  {user.userId}
                </span>
              )}
            </div>
          </div>

          {/* Dropdown menu for mobile */}
          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              {user?.email && (
                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100 sm:hidden">
                  <p className="font-medium truncate">{user.email}</p>
                  {user?.userId && (
                    <p className="text-xs text-gray-500 truncate">
                      {user.userId}
                    </p>
                  )}
                </div>
              )}
              <a
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </a>
              <a
                href="/logout"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
