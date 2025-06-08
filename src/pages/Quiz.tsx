
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import { QuizQuestion } from '@/types';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const quizData = {
    title: "Python Fundamentals Quiz",
    description: "Test your knowledge of Python basics",
    timeLimit: 30,
    totalQuestions: 5
  };

  const questions: QuizQuestion[] = [
    {
      id: '1',
      question: 'Which of the following is the correct way to create a list in Python?',
      options: ['list = []', 'list = ()', 'list = {}', 'list = <>'],
      correctAnswer: 0,
      explanation: 'Square brackets [] are used to create lists in Python. Parentheses () create tuples, curly braces {} create dictionaries or sets.'
    },
    {
      id: '2',
      question: 'What does the "len()" function do in Python?',
      options: ['Returns the length of an object', 'Returns the last element', 'Returns the first element', 'Removes elements'],
      correctAnswer: 0,
      explanation: 'The len() function returns the number of items in an object (string, list, tuple, etc.).'
    },
    {
      id: '3',
      question: 'Which keyword is used to define a function in Python?',
      options: ['function', 'def', 'func', 'define'],
      correctAnswer: 1,
      explanation: 'The "def" keyword is used to define a function in Python.'
    },
    {
      id: '4',
      question: 'What is the output of: print(type([]))?',
      options: ['<class "list">', '<class "array">', '<class "tuple">', '<class "dict">'],
      correctAnswer: 0,
      explanation: 'Empty square brackets create a list object, so type([]) returns <class "list">.'
    },
    {
      id: '5',
      question: 'Which operator is used for floor division in Python?',
      options: ['/', '//', '%', '**'],
      correctAnswer: 1,
      explanation: 'The "//" operator performs floor division, returning the largest integer less than or equal to the result.'
    }
  ];

  useEffect(() => {
    if (!isCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmitQuiz();
    }
  }, [timeLeft, isCompleted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setIsCompleted(true);
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100) };
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setTimeLeft(1800);
    setIsCompleted(false);
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <Layout>
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <Card className="p-8 text-center">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-primary" />
                </div>
              </div>
              
              <div>
                <h1 className="text-3xl font-bold mb-2">Quiz Completed!</h1>
                <p className="text-muted-foreground">Here are your results</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{score.percentage}%</div>
                  <div className="text-sm text-muted-foreground">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success">{score.correct}</div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-destructive">{score.total - score.correct}</div>
                  <div className="text-sm text-muted-foreground">Incorrect</div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button onClick={restartQuiz} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Quiz
                </Button>
                <Button>View Course</Button>
              </div>
            </div>
          </Card>

          {/* Answer Review */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Answer Review</h2>
            <div className="space-y-6">
              {questions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start space-x-3 mb-4">
                    {selectedAnswers[index] === question.correctAnswer ? (
                      <CheckCircle className="w-6 h-6 text-success mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-destructive mt-1" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium mb-3">Question {index + 1}: {question.question}</h3>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-lg border ${
                              optionIndex === question.correctAnswer
                                ? 'border-success bg-success/10'
                                : selectedAnswers[index] === optionIndex && optionIndex !== question.correctAnswer
                                ? 'border-destructive bg-destructive/10'
                                : 'border-border'
                            }`}
                          >
                            {option}
                            {optionIndex === question.correctAnswer && (
                              <Badge variant="secondary" className="ml-2">Correct</Badge>
                            )}
                            {selectedAnswers[index] === optionIndex && optionIndex !== question.correctAnswer && (
                              <Badge variant="destructive" className="ml-2">Your Answer</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm"><strong>Explanation:</strong> {question.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Quiz Header */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">{quizData.title}</h1>
              <p className="text-muted-foreground">{quizData.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className={timeLeft < 300 ? 'text-destructive font-medium' : ''}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
            </div>
            <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
          </div>
        </Card>

        {/* Question Card */}
        <Card className="p-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">
              {questions[currentQuestion].question}
            </h2>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left border rounded-lg transition-colors ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                    }`} />
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            
            <div className="flex space-x-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 rounded-full text-sm ${
                    index === currentQuestion
                      ? 'bg-primary text-primary-foreground'
                      : selectedAnswers[index] !== undefined
                      ? 'bg-success text-success-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            {currentQuestion === questions.length - 1 ? (
              <Button
                onClick={handleSubmitQuiz}
                disabled={selectedAnswers[currentQuestion] === undefined}
              >
                Submit Quiz
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
              >
                Next
              </Button>
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Quiz;
