"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, ArrowRight, Wallet, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Token {
  tokenIdentifier: string;
  weight: number;
}

interface ResultCardProps {
  bundle: {
    name: string;
    description: { en: string; gr: string };
    tokens: Token[];
    longDescription?: { en: string; gr: string };
  };
  onRestart: () => void;
  language: "en" | "gr";
}

export function ResultCard({ bundle, onRestart, language }: ResultCardProps) {
  const getTokenName = (identifier: string) => identifier.split('-')[0];
  const getTokenImageUrl = (identifier: string) => 
    `https://raw.githubusercontent.com/ElrondNetwork/assets/master/tokens/${identifier}/logo.png`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl border-blue-100 hover:border-blue-200 transition-colors duration-300">
        <div className="text-center">
          <motion.div 
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
          >
            <Wallet className="h-10 w-10 text-white" />
          </motion.div>

          <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {language === "gr" ? "Η Πρότασή μας" : "Our Recommendation"}
          </h2>
          
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-3 text-blue-600">
              {bundle.name}
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              {bundle.description[language]}
            </p>
            <div className="bg-blue-50/50 p-6 rounded-xl text-left">
              <p className="text-gray-700 leading-relaxed">
                {bundle.longDescription?.[language]}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4 text-left text-gray-700">
              {language === "gr" ? "Σύνθεση Χαρτοφυλακίου" : "Portfolio Composition"}
            </h4>
            <div className="space-y-3">
              {bundle.tokens.map((token, index) => (
                <motion.div
                  key={token.tokenIdentifier}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between bg-blue-50/50 p-4 rounded-lg hover:bg-blue-100/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 relative bg-white rounded-full p-1 shadow-sm">
                      <Image
                        src={getTokenImageUrl(token.tokenIdentifier)}
                        alt={getTokenName(token.tokenIdentifier)}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                    <span className="font-medium text-gray-700">
                      {getTokenName(token.tokenIdentifier)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-medium">{token.weight}%</span>
                    <ChevronRight className="h-4 w-4 text-gray-400 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className="bg-amber-50 border border-amber-200 p-6 rounded-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <AlertTriangle className="mx-auto mb-3 text-amber-500 h-6 w-6" />
            <p className="text-amber-700">
              {language === "gr" 
                ? "Αυτό δεν αποτελεί οικονομική συμβουλή. Παρακαλώ κάντε τη δική σας έρευνα πριν επενδύσετε."
                : "This is not financial advice. Please do your own research before investing."}
            </p>
          </motion.div>

          <div className="space-y-4">
            <Button
              onClick={() => window.open("https://valoro.fund/onboarding/", "_blank")}
              className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200"
            >
              <Wallet className="mr-2 h-5 w-5" />
              {language === "gr" ? "Ξεκινήστε την Επένδυση" : "Start Investing"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button
              onClick={onRestart}
              variant="outline"
              className="w-full py-6 text-lg border-blue-200 hover:border-blue-300 hover:bg-blue-50"
            >
              {language === "gr" ? "Ξεκινήστε Ξανά" : "Start Over"}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}