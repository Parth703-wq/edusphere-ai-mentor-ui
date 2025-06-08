
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, BookOpen, Trophy, TrendingUp, Plus, Calendar, BarChart3 } from 'lucide-react';

const TeacherDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const stats = [
    { label: 'Total Students', value: '1,247', change: '+12%', icon: Users, color: 'text-blue-600' },
    { label: 'Active Courses', value: '8', change: '+2', icon: BookOpen, color: 'text-green-600' },
    { label: 'Avg. Completion Rate', value: '87%', change: '+5%', icon: Trophy, color: 'text-purple-600' },
    { label: 'Revenue This Month', value: '$12,450', change: '+23%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  const courses = [
    {
      title: 'Complete Python Programming',
      students: 342,
      completion: 78,
      revenue: 4890,
      status: 'active'
    },
    {
      title: 'Machine Learning Fundamentals',
      students: 198,
      completion: 85,
      revenue: 3240,
      status: 'active'
    },
    {
      title: 'Web Development with React',
      students: 276,
      completion: 72,
      revenue: 5520,
      status: 'active'
    },
    {
      title: 'Data Structures & Algorithms',
      students: 156,
      completion: 91,
      revenue: 2800,
      status: 'completed'
    }
  ];

  const recentActivity = [
    { action: 'New enrollment', course: 'Python Programming', student: 'Alice Johnson', time: '2 hours ago' },
    { action: 'Quiz completed', course: 'Machine Learning', student: 'Bob Smith', time: '4 hours ago' },
    { action: 'Assignment submitted', course: 'React Development', student: 'Carol Davis', time: '6 hours ago' },
    { action: 'Course completed', course: 'Data Structures', student: 'David Wilson', time: '1 day ago' }
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Teacher Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your courses and track student progress</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <Card key={idx} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-success font-medium">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full bg-muted/50 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Performance */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Course Performance</h2>
                <div className="flex space-x-2">
                  {['week', 'month', 'quarter'].map((period) => (
                    <Button
                      key={period}
                      variant={selectedPeriod === period ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedPeriod(period)}
                    >
                      {period.charAt(0).toUpperCase() + period.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                {courses.map((course, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {course.students} students • ${course.revenue} revenue
                        </p>
                      </div>
                      <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                        {course.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Completion Rate</span>
                        <span className="font-medium">{course.completion}%</span>
                      </div>
                      <Progress value={course.completion} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Recent Activity</h3>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.course}</p>
                      <p className="text-xs text-muted-foreground">{activity.student}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Create New Course
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Live Session
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Message Students
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeacherDashboard;
