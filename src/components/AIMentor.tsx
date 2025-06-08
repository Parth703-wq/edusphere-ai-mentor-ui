
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, Lightbulb, HelpCircle, BookOpen } from 'lucide-react';

interface AIMentorProps {
  context?: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AIMentor = ({ context, isOpen, onToggle }: AIMentorProps) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([
    {
      type: 'ai' as const,
      content: "Hi! I'm your AI mentor. I can help explain concepts, create quizzes, or clarify anything you're learning. What would you like to know?",
      timestamp: new Date()
    }
  ]);

  const quickActions = [
    { label: 'Explain this topic', icon: Lightbulb, prompt: 'Can you explain this topic in simple terms?' },
    { label: 'Quiz me', icon: HelpCircle, prompt: 'Give me a quick quiz on this topic' },
    { label: 'Summarize', icon: BookOpen, prompt: 'Can you summarize the key points?' }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      type: 'user' as const,
      content: message,
      timestamp: new Date()
    };

    const aiResponse = {
      type: 'ai' as const,
      content: generateAIResponse(message, context),
      timestamp: new Date()
    };

    setConversation(prev => [...prev, userMessage, aiResponse]);
    setMessage('');
  };

  const generateAIResponse = (userMessage: string, context?: string) => {
    // Simulated AI responses
    const responses = [
      "That's a great question! Let me break this down for you...",
      "I can help with that. Here's what you need to know:",
      "Based on what you're studying, here's a useful explanation:",
      "Let me provide some context that might help:"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)] + " " + 
           (context ? `In the context of ${context}, ` : "") + 
           "this concept relates to fundamental principles that you can apply in practical scenarios.";
  };

  const handleQuickAction = (prompt: string) => {
    setMessage(prompt);
    handleSendMessage();
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg z-50"
        size="sm"
      >
        <Bot className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-96 flex flex-col shadow-xl z-50 animate-slide-in">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold">AI Mentor</h3>
            {context && (
              <Badge variant="secondary" className="text-xs">
                {context}
              </Badge>
            )}
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onToggle}>
          ×
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${
              msg.type === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}>
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t space-y-3">
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction(action.prompt)}
              className="text-xs"
            >
              <action.icon className="w-3 h-3 mr-1" />
              {action.label}
            </Button>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <Input
            placeholder="Ask me anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AIMentor;
