
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen, Award } from 'lucide-react';

interface CourseCardProps {
  title: string;
  instructor: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  nextDeadline?: string;
  thumbnailUrl?: string;
  onClick?: () => void;
}

const CourseCard = ({
  title,
  instructor,
  progress,
  totalModules,
  completedModules,
  nextDeadline,
  thumbnailUrl,
  onClick
}: CourseCardProps) => {
  return (
    <div className="course-card group cursor-pointer" onClick={onClick}>
      <div className="relative mb-4">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-40 object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-primary/60" />
          </div>
        )}
        {progress > 0 && (
          <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-xs font-medium text-foreground">{Math.round(progress)}%</span>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{instructor}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{completedModules}/{totalModules} modules</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {nextDeadline && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Next deadline: {nextDeadline}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-1">
            {progress === 100 && (
              <div className="flex items-center space-x-1 text-success">
                <Award className="w-4 h-4" />
                <span className="text-xs font-medium">Completed</span>
              </div>
            )}
          </div>
          
          <Button
            variant={progress === 100 ? "outline" : "default"}
            size="sm"
            className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            {progress === 100 ? 'Review' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
