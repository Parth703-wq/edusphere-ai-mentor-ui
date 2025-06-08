
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff, GraduationCap, Users, BookOpen } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = (userType: 'student' | 'teacher') => {
    const demoCredentials = {
      student: { email: 'student@example.com', password: 'demo123' },
      teacher: { email: 'teacher@example.com', password: 'demo123' }
    };
    
    setEmail(demoCredentials[userType].email);
    setPassword(demoCredentials[userType].password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">E</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">EduSphere</h1>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Transform Your Learning Journey
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of students and educators in our AI-powered learning management system.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-card rounded-lg border">
              <GraduationCap className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold">Personalized Learning</h3>
                <p className="text-sm text-muted-foreground">AI-powered adaptive learning paths</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-card rounded-lg border">
              <Users className="w-8 h-8 text-accent" />
              <div>
                <h3 className="font-semibold">Interactive Community</h3>
                <p className="text-sm text-muted-foreground">Connect with peers and mentors</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-card rounded-lg border">
              <BookOpen className="w-8 h-8 text-success" />
              <div>
                <h3 className="font-semibold">Rich Content Library</h3>
                <p className="text-sm text-muted-foreground">Access thousands of courses and resources</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="p-8 w-full max-w-md mx-auto">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold">Welcome Back</h3>
              <p className="text-muted-foreground">Sign in to your account to continue learning</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="space-y-3">
              <div className="text-center text-sm text-muted-foreground">
                Or try a demo account:
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => demoLogin('student')}
                  className="text-xs"
                >
                  Demo Student
                </Button>
                <Button
                  variant="outline"
                  onClick={() => demoLogin('teacher')}
                  className="text-xs"
                >
                  Demo Teacher
                </Button>
              </div>
            </div>

            <div className="text-center space-y-2">
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot your password?
              </Link>
              <div className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
