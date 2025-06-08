
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import CourseCard from '@/components/CourseCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Star, Clock, Users, BookOpen } from 'lucide-react';
import { Course } from '@/types';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const courses: Course[] = [
    {
      id: '1',
      title: 'Complete Python Programming Bootcamp',
      description: 'Master Python from basics to advanced concepts with hands-on projects',
      instructor: 'Dr. Sarah Chen',
      instructorId: '1',
      progress: 68,
      totalModules: 12,
      completedModules: 8,
      nextDeadline: 'Assignment due in 3 days',
      category: 'Programming',
      level: 'beginner',
      price: 89.99,
      rating: 4.8,
      students: 15420,
      duration: '12 weeks',
      thumbnailUrl: '/placeholder.svg'
    },
    {
      id: '2',
      title: 'Machine Learning Fundamentals',
      description: 'Learn the core concepts of ML with practical implementations',
      instructor: 'Prof. Michael Ross',
      instructorId: '2',
      progress: 45,
      totalModules: 15,
      completedModules: 7,
      nextDeadline: 'Quiz due in 2 days',
      category: 'Data Science',
      level: 'intermediate',
      price: 129.99,
      rating: 4.9,
      students: 8932,
      duration: '16 weeks'
    },
    {
      id: '3',
      title: 'Web Development with React',
      description: 'Build modern web applications with React and TypeScript',
      instructor: 'Emily Zhang',
      instructorId: '3',
      progress: 0,
      totalModules: 10,
      completedModules: 0,
      category: 'Web Development',
      level: 'intermediate',
      price: 99.99,
      rating: 4.7,
      students: 12350,
      duration: '10 weeks'
    },
    {
      id: '4',
      title: 'Digital Marketing Mastery',
      description: 'Complete guide to digital marketing strategies and tools',
      instructor: 'Alex Johnson',
      instructorId: '4',
      progress: 25,
      totalModules: 8,
      completedModules: 2,
      category: 'Marketing',
      level: 'beginner',
      price: 79.99,
      rating: 4.6,
      students: 9876,
      duration: '8 weeks'
    },
    {
      id: '5',
      title: 'Advanced Data Structures',
      description: 'Deep dive into complex data structures and algorithms',
      instructor: 'Dr. Robert Kim',
      instructorId: '5',
      progress: 0,
      totalModules: 14,
      completedModules: 0,
      category: 'Computer Science',
      level: 'advanced',
      price: 149.99,
      rating: 4.9,
      students: 5432,
      duration: '14 weeks'
    },
    {
      id: '6',
      title: 'UX/UI Design Principles',
      description: 'Learn to create beautiful and functional user interfaces',
      instructor: 'Lisa Chen',
      instructorId: '6',
      progress: 0,
      totalModules: 9,
      completedModules: 0,
      category: 'Design',
      level: 'beginner',
      price: 94.99,
      rating: 4.8,
      students: 11234,
      duration: '9 weeks'
    }
  ];

  const categories = ['all', 'Programming', 'Data Science', 'Web Development', 'Marketing', 'Computer Science', 'Design'];
  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Course Catalog</h1>
            <p className="text-muted-foreground mt-1">Discover your next learning adventure</p>
          </div>
          <Button>
            <BookOpen className="w-4 h-4 mr-2" />
            Create Course
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search courses, instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>
                      {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-primary/60" />
                </div>
                
                <div className="absolute top-3 left-3">
                  <Badge variant={course.level === 'beginner' ? 'secondary' : course.level === 'intermediate' ? 'default' : 'destructive'}>
                    {course.level}
                  </Badge>
                </div>
                
                <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-medium">{course.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{course.instructor}</p>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{course.description}</p>
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="text-lg font-bold text-primary">
                    ${course.price}
                  </div>
                  
                  <Button size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {course.progress > 0 ? 'Continue' : 'Enroll Now'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <Card className="p-12 text-center">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Courses;
