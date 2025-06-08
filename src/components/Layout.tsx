
import React from 'react';
import { Bell, ChevronDown, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActivePage = (path: string) => {
    return location.pathname === path;
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border/50 px-6 py-4 sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">E</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">EduSphere</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to="/dashboard" 
                className={`transition-colors ${
                  isActivePage('/dashboard') 
                    ? 'text-primary font-medium' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/courses" 
                className={`transition-colors ${
                  isActivePage('/courses') 
                    ? 'text-primary font-medium' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Courses
              </Link>
              <Link 
                to="/quiz" 
                className={`transition-colors ${
                  isActivePage('/quiz') 
                    ? 'text-primary font-medium' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Quizzes
              </Link>
              {user.role === 'teacher' && (
                <Link 
                  to="/teaching" 
                  className={`transition-colors ${
                    isActivePage('/teaching') 
                      ? 'text-primary font-medium' 
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  Teaching
                </Link>
              )}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-3 cursor-pointer hover:bg-muted/50 rounded-lg px-3 py-2 transition-colors">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-medium text-sm">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
