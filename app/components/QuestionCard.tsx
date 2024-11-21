"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface QuestionCardProps {
  question: string;
  options: Array<{ en: string; gr: string; score: any }>;
  onAnswer: (score: any) => void;
  progress: number;
  language: "en" | "gr";
}

export function QuestionCard({ question, options, onAnswer, progress, language }: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl border-blue-100 hover:border-blue-200 transition-colors duration-300">
        <div className="relative h-2 w-full bg-blue-100 rounded-full mb-8 overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          {question}
        </h2>

        <div className="space-y-4">
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                onClick={() => onAnswer(option.score)}
                className="w-full py-6 text-base justify-between group hover:scale-102 transition-all duration-200 bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-600 border border-blue-100 hover:border-blue-200"
                variant="outline"
              >
                <span>{option[language]}</span>
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}