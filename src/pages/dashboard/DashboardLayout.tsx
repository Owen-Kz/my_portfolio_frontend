// src/layouts/DashboardLayout.tsx
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Image, Upload, LogOut, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <div className="h-0 flex-1 flex flex-col pt-5 pb-4">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-creative-primary">Dzidzom Admin</h1>
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-2">
              <Link
                to="/dashboard"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              <Link
                to="/dashboard/portfolio"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
              >
                <Image className="mr-3 h-5 w-5" />
                Portfolio Items
              </Link>
              <Link
                to="/dashboard/upload"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
              >
                <Upload className="mr-3 h-5 w-5" />
                Upload New
              </Link>
                <Link
                to="/"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
              >
                <ExternalLink className="mr-3 h-5 w-5" />
                Preview
              </Link>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div>
                <div className="text-sm font-medium text-gray-700">{user?.name}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;