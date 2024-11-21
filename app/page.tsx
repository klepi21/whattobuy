"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "./components/QuestionCard";
import { ResultCard } from "./components/ResultCard";
import { FloatingIcons } from "./components/FloatingIcons";
import { motion } from "framer-motion";

const questions = [
  {
    en: "What's your investment experience level?",
    gr: "Ποιο είναι το επίπεδο επενδυτικής σας εμπειρίας;",
    options: [
      { 
        en: "I'm new to investing", 
        gr: "Είμαι νέος στις επενδύσεις",
        score: { lowRisk: 3, balanced: 1 }
      },
      { 
        en: "I have some experience", 
        gr: "Έχω κάποια εμπειρία",
        score: { balanced: 2, growth: 1 }
      },
      { 
        en: "I'm an experienced investor", 
        gr: "Είμαι έμπειρος επενδυτής",
        score: { growth: 2, defi: 1 }
      }
    ]
  },
  {
    en: "What's your risk tolerance?",
    gr: "Ποια είναι η ανοχή σας στο ρίσκο;",
    options: [
      { 
        en: "I prefer safety over high returns", 
        gr: "Προτιμώ την ασφάλεια",
        score: { lowRisk: 3 }
      },
      { 
        en: "I can handle moderate risk", 
        gr: "Μπορώ να διαχειριστώ μέτριο ρίσκο",
        score: { balanced: 2, growth: 1 }
      },
      { 
        en: "I'm comfortable with high risk", 
        gr: "Είμαι άνετος με υψηλό ρίσκο",
        score: { growth: 2, defi: 2 }
      }
    ]
  },
  {
    en: "What's your investment timeframe?",
    gr: "Ποιο είναι το χρονικό πλαίσιο της επένδυσής σας;",
    options: [
      { 
        en: "Short term (< 1 year)", 
        gr: "Βραχυπρόθεσμα (< 1 έτος)",
        score: { lowRisk: 2 }
      },
      { 
        en: "Medium term (1-3 years)", 
        gr: "Μεσοπρόθεσμα (1-3 έτη)",
        score: { balanced: 2, growth: 1 }
      },
      { 
        en: "Long term (3+ years)", 
        gr: "Μακροπρόθεσμα (3+ έτη)",
        score: { growth: 2, defi: 2 }
      }
    ]
  },
  {
    en: "What interests you most about crypto?",
    gr: "Τι σας ενδιαφέρει περισσότερο στα κρυπτονομίσματα;",
    options: [
      { 
        en: "Store of value", 
        gr: "Αποθήκευση αξίας",
        score: { lowRisk: 2, balanced: 1 }
      },
      { 
        en: "DeFi and yield farming", 
        gr: "DeFi",
        score: { defi: 3 }
      },
      { 
        en: "Growth potential", 
        gr: "Δυνατότητα ανάπτυξης",
        score: { growth: 3 }
      }
    ]
  }
];

const bundles = {
  lowRisk: {
    name: "Path to Heaven",
    description: {
      en: "A low-risk portfolio focused on established cryptocurrencies",
      gr: "Ένα χαρτοφυλάκιο χαμηλού ρίσκου επικεντρωμένο σε καθιερωμένα κρυπτονομίσματα"
    },
    tokens: [
      { tokenIdentifier: "WBTC-5349b3", weight: 50 },
      { tokenIdentifier: "WETH-b4ca29", weight: 30 },
      { tokenIdentifier: "WEGLD-bd4d79", weight: 20 }
    ],
    longDescription: {
      en: "Valoro Heaven is the crown jewel of funds, designed for those seeking steady growth with minimal risk. This fund is based on three powerhouse assets: Wrapped Bitcoin (WBTC), Wrapped Ethereum (WETH), and the heart of the MultiversX ecosystem, EGLD.",
      gr: "Το Valoro Heaven είναι το κορυφαίο ταμείο μας, σχεδιασμένο για όσους αναζητούν σταθερή ανάπτυξη με ελάχιστο ρίσκο. Αυτό το ταμείο βασίζεται σε τρία ισχυρά περιουσιακά στοιχεία: Wrapped Bitcoin (WBTC), Wrapped Ethereum (WETH) και την καρδιά του οικοσυστήματος MultiversX, EGLD."
    }
  },
  balanced: {
    name: "WAGMI, right?",
    description: {
      en: "A balanced portfolio with a mix of established and growth potential tokens",
      gr: "Ένα ισορροπημένο χαρτοφυλάκιο με συνδυασμό καθιερωμένων και αναπτυσσόμενων tokens"
    },
    tokens: [
      { tokenIdentifier: "LEGLD-d74da9", weight: 30 },
      { tokenIdentifier: "HTM-f51d55", weight: 20 },
      { tokenIdentifier: "ASH-a642d1", weight: 20 },
      { tokenIdentifier: "XOXNO-c1293a", weight: 15 },
      { tokenIdentifier: "UTK-2f80e9", weight: 10 },
      { tokenIdentifier: "BOBER-9eb764", weight: 5 }
    ],
    longDescription: {
      en: "Valoro WAGMI is composed of a diverse range of promising tokens within the MultiversX ecosystem, including staked EGLD (LEGLD) for consistent returns, HTM from Hatom Labs, ASH from AshSwap, and more.",
      gr: "Το Valoro WAGMI αποτελείται από μια ποικιλία υποσχόμενων tokens στο οικοσύστημα MultiversX, συμπεριλαμβανομένου του staked EGLD (LEGLD) για σταθερές αποδόσεις, HTM από το Hatom Labs, ASH από το AshSwap και άλλα."
    }
  },
  growth: {
    name: "Valoro Growth",
    description: {
      en: "High-growth potential tokens for aggressive investors",
      gr: "Tokens με υψηλό δυναμικό ανάπτυξης για επιθετικούς επενδυτές"
    },
    tokens: [
      { tokenIdentifier: "QWT-46ac01", weight: 25 },
      { tokenIdentifier: "BEE-cb37b6", weight: 25 },
      { tokenIdentifier: "XOXNO-c1293a", weight: 25 },
      { tokenIdentifier: "CRT-52decf", weight: 15 },
      { tokenIdentifier: "EAPES-014cd7", weight: 10 }
    ],
    longDescription: {
      en: "Valoro Growth is crafted for investors aiming to tap into high-potential projects within the MultiversX ecosystem, with a focus on real-world applications and dynamic growth sectors.",
      gr: "Το Valoro Growth είναι σχεδιασμένο για επενδυτές που στοχεύουν σε projects υψηλού δυναμικού εντός του οικοσυστήματος MultiversX, με έμφαση σε εφαρμογές πραγματικού κόσμου και δυναμικούς τομείς ανάπτυξης."
    }
  },
  defi: {
    name: "MultiversX DeFi",
    description: {
      en: "Focus on DeFi protocols and yield-generating assets",
      gr: "Εστίαση σε πρωτόκολλα DeFi και περιουσιακά στοιχεία που παράγουν απόδοση"
    },
    tokens: [
      { tokenIdentifier: "HTM-f51d55", weight: 40 },
      { tokenIdentifier: "ASH-a642d1", weight: 35 },
      { tokenIdentifier: "MEX-455c57", weight: 25 }
    ],
    longDescription: {
      en: "Valoro DeFi includes the top three DeFi projects within the MultiversX ecosystem, featuring Hatom for lending, ASH from Ashswap for trading, and MEX from xExchange.",
      gr: "Το Valoro DeFi περιλαμβάνει τα τρία κορυφαία έργα DeFi στο οικοσύστημα MultiversX, με το Hatom για δανεισμό, το ASH από το Ashswap για συναλλαγές και το MEX από το xExchange."
    }
  }
};

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    lowRisk: 0,
    balanced: 0,
    growth: 0,
    defi: 0
  });
  const [showResult, setShowResult] = useState(false);
  const [language, setLanguage] = useState<"en" | "gr">("en");

  const handleAnswer = (score: any) => {
    const newScores = { ...scores };
    Object.entries(score).forEach(([key, value]) => {
      if (typeof value === 'number') {
        newScores[key as keyof typeof scores] = (newScores[key as keyof typeof scores] || 0) + value;
      }
    });
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getRecommendedBundle = () => {
    const maxScore = Math.max(...Object.values(scores));
    const recommendation = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] || 'balanced';
    return bundles[recommendation as keyof typeof bundles];
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScores({
      lowRisk: 0,
      balanced: 0,
      growth: 0,
      defi: 0
    });
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 relative overflow-hidden">
      <FloatingIcons />
      
      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              {language === "gr" ? "Ξεκινήστε το Ταξίδι σας στο Web3" : "Start Your Web3 Journey"}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {language === "gr" 
                ? "Ανακαλύψτε το ιδανικό επενδυτικό πακέτο για εσάς"
                : "Discover your ideal investment package"}
            </p>
            
            <Button
              variant="outline"
              onClick={() => setLanguage(language === "gr" ? "en" : "gr")}
              className="bg-white/80 backdrop-blur-sm border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
            >
              {language === "gr" ? "English" : "Ελληνικά"}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {!showResult ? (
              <QuestionCard
                question={questions[currentQuestion][language]}
                options={questions[currentQuestion].options}
                onAnswer={handleAnswer}
                progress={(currentQuestion / questions.length) * 100}
                language={language}
              />
            ) : (
              <ResultCard
                bundle={getRecommendedBundle()}
                onRestart={handleRestart}
                language={language}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}