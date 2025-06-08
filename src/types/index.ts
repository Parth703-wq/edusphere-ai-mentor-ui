
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  enrolledCourses?: string[];
  createdAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  nextDeadline?: string;
  thumbnailUrl?: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  rating: number;
  students: number;
  duration: string;
}

export interface Message {
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  timeLimit: number;
  courseId: string;
}
