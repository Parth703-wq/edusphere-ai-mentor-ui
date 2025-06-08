
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return user.role === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />;
};

export default Dashboard;
