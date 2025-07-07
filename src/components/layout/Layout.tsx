import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProtectRoutes from "@/routes/private.routes";

const Layout: React.FC = () => {
  return (
    <ProtectRoutes>
      <div className="min-h-screen bg-purple-50 relative w-full">
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
          <div
            className="absolute inset-0 w-full h-full bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3' cy='3' r='3' fill='%239C92AC' fill-opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>
        <Sidebar />

        <div className="flex-1 flex flex-col md:ml-20 lg:ml-60">
          <Header />

          <main className="flex-1 p-6 overflow-auto relative mt-20">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectRoutes>
  );
};

export default Layout;
