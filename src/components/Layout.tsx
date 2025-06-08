
import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
  user?: {
    name: string;
    role: 'student' | 'teacher';
    avatar?: string;
  };
}

const Layout = ({ children, user = { name: 'Alex Johnson', role: 'student' } }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">E</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">EduSphere</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/" className="text-foreground hover:text-primary transition-colors">Dashboard</a>
              <a href="/courses" className="text-muted-foreground hover:text-primary transition-colors">Courses</a>
              <a href="/quiz" className="text-muted-foreground hover:text-primary transition-colors">Quizzes</a>
              {user.role === 'teacher' && (
                <a href="/teacher" className="text-muted-foreground hover:text-primary transition-colors">Teaching</a>
              )}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
            </Button>
            
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
