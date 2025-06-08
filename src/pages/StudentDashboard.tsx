
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import CourseCard from '@/components/CourseCard';
import ProgressRing from '@/components/ProgressRing';
import AIMentor from '@/components/AIMentor';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp, Clock, Target } from 'lucide-react';

const StudentDashboard = () => {
  const [isMentorOpen, setIsMentorOpen] = useState(false);

  const courses = [
    {
      title: "Linear Algebra Fundamentals",
      instructor: "Dr. Sarah Chen",
      progress: 68,
      totalModules: 12,
      completedModules: 8,
      nextDeadline: "Quiz due in 2 days"
    },
    {
      title: "Introduction to Machine Learning",
      instructor: "Prof. Michael Ross",
      progress: 45,
      totalModules: 15,
      completedModules: 7,
      nextDeadline: "Assignment due in 5 days"
    },
    {
      title: "Data Structures & Algorithms",
      instructor: "Dr. Emily Zhang",
      progress: 100,
      totalModules: 10,
      completedModules: 10
    },
    {
      title: "Python Programming Basics",
      instructor: "John Smith",
      progress: 25,
      totalModules: 8,
      completedModules: 2,
      nextDeadline: "Practice due in 1 week"
    }
  ];

  const upcomingTasks = [
    { title: "Linear Algebra Quiz", course: "Linear Algebra", dueDate: "Tomorrow", type: "quiz" },
    { title: "ML Assignment #3", course: "Machine Learning", dueDate: "In 5 days", type: "assignment" },
    { title: "Python Practice Set", course: "Python Basics", dueDate: "Next week", type: "practice" }
  ];

  const overallProgress = Math.round(courses.reduce((acc, course) => acc + course.progress, 0) / courses.length);

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, Alex! 👋</h1>
            <p className="text-muted-foreground mt-1">Ready to continue your learning journey?</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>On track</span>
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Progress Overview */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Your Progress</h2>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  This Week
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <ProgressRing progress={overallProgress} size={100} />
                  <p className="text-sm font-medium mt-2">Overall Progress</p>
                  <p className="text-xs text-muted-foreground">Across all courses</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Courses Active</span>
                      <span className="text-2xl font-bold text-primary">{courses.filter(c => c.progress < 100).length}</span>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Completed</span>
                      <span className="text-2xl font-bold text-success">{courses.filter(c => c.progress === 100).length}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Weekly Goal</span>
                      <span className="text-2xl font-bold text-accent">85%</span>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Streak</span>
                      <span className="text-2xl font-bold text-warning">7 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Course Cards */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Your Courses</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course, idx) => (
                  <CourseCard
                    key={idx}
                    {...course}
                    onClick={() => console.log(`Navigate to ${course.title}`)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Next Tasks */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Upcoming Tasks</h3>
              </div>
              
              <div className="space-y-4">
                {upcomingTasks.map((task, idx) => (
                  <div key={idx} className="border-l-4 border-primary/20 pl-4 py-2">
                    <h4 className="font-medium text-sm">{task.title}</h4>
                    <p className="text-xs text-muted-foreground">{task.course}</p>
                    <div className="flex items-center justify-between mt-1">
                      <Badge 
                        variant={task.type === 'quiz' ? 'destructive' : task.type === 'assignment' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {task.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4" size="sm">
                View All Tasks
              </Button>
            </Card>

            {/* Learning Goals */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">This Week's Goals</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Complete 3 modules</span>
                  <Badge variant="outline" className="text-xs">2/3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Take 2 quizzes</span>
                  <Badge variant="outline" className="text-xs">1/2</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Study 5 hours</span>
                  <Badge className="text-xs bg-success">7/5</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <AIMentor
        context="Student Dashboard"
        isOpen={isMentorOpen}
        onToggle={() => setIsMentorOpen(!isMentorOpen)}
      />
    </Layout>
  );
};

export default StudentDashboard;
