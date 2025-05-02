
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Settings, Bell, Trophy, ShieldCheck, Link as LinkIcon, 
  Calendar, BookOpen, LogOut, Menu, X, Home, AlertCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-20">
        <Button 
          variant="outline" 
          size="icon"
          className="bg-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-center h-16 px-6 bg-primary text-white">
          <ShieldCheck className="h-6 w-6 mr-2" />
          <h1 className="text-xl font-bold">KÜID</h1>
        </div>

        <div className="flex flex-col justify-between h-[calc(100%-4rem)]">
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-4 p-2 rounded-lg bg-gray-50">
              <div className="bg-primary text-white p-2 rounded-full">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">{user?.name || 'Usuario'}</p>
                <p className="text-xs text-muted-foreground">{user?.email || 'usuario@email.com'}</p>
              </div>
            </div>

            <nav className="space-y-1 mt-6">
              <Link 
                to="/dashboard" 
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 rounded-md hover:bg-primary/5 hover:text-primary"
              >
                <Home className="h-5 w-5" />
                <span>Inicio</span>
              </Link>

              <Separator className="my-3" />
              
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-2">
                Ajustes
              </p>
              
              <Link 
                to="/profile" 
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 rounded-md hover:bg-primary/5 hover:text-primary"
              >
                <User className="h-5 w-5" />
                <span>Perfil</span>
              </Link>
              
              <Link 
                to="/connected-devices" 
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 rounded-md hover:bg-primary/5 hover:text-primary"
              >
                <LinkIcon className="h-5 w-5" />
                <span>Dispositivos y Apps</span>
              </Link>
              
              <Link 
                to="/insurance-settings" 
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 rounded-md hover:bg-primary/5 hover:text-primary"
              >
                <ShieldCheck className="h-5 w-5" />
                <span>Configuración de Seguro</span>
              </Link>

              <Separator className="my-3" />
              
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-2">
                Gamificación
              </p>
              
              <Link 
                to="/rewards" 
                className="flex items-center justify-between px-3 py-2 text-gray-700 rounded-md hover:bg-primary/5 hover:text-primary"
              >
                <div className="flex items-center space-x-3">
                  <Trophy className="h-5 w-5" />
                  <span>Recompensas</span>
                </div>
                <Badge className="bg-green-500 hover:bg-green-600">2</Badge>
              </Link>
              
              <Separator className="my-3" />
              
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-2">
                Más información
              </p>
              
              <Link 
                to="/real-stories" 
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 rounded-md hover:bg-primary/5 hover:text-primary"
              >
                <BookOpen className="h-5 w-5" />
                <span>Historias reales</span>
              </Link>
              
              <Link 
                to="/notifications" 
                className="flex items-center justify-between px-3 py-2 text-gray-700 rounded-md hover:bg-primary/5 hover:text-primary"
              >
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5" />
                  <span>Alertas</span>
                </div>
                <Badge className="bg-red-500 hover:bg-red-600">3</Badge>
              </Link>
            </nav>
          </div>

          <div className="p-4">
            <Button 
              variant="ghost" 
              className="w-full flex items-center justify-start text-gray-700 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>Cerrar sesión</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        <header className="h-16 border-b flex items-center justify-end px-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                3
              </span>
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
