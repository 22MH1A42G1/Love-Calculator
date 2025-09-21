"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoveCalculator() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateLove = () => {
    if (!name1.trim() || !name2.trim()) return;
    
    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      // Simple algorithm to calculate compatibility
      const combinedNames = (name1 + name2).toLowerCase().replace(/\s/g, '');
      let sum = 0;
      
      for (let i = 0; i < combinedNames.length; i++) {
        sum += combinedNames.charCodeAt(i);
      }
      
      // Generate percentage between 40-100 for more positive results
      const percentage = 40 + (sum % 61);
      
      setResult(percentage);
      setIsCalculating(false);
      
      // Set message based on percentage
      if (percentage < 50) {
        setMessage("There's potential here! Love grows with time.");
      } else if (percentage < 70) {
        setMessage("A promising connection! Worth exploring.");
      } else if (percentage < 85) {
        setMessage("Wow! You two have something special.");
      } else {
        setMessage("Perfect match! Love is in the air!");
      }
    }, 800);
  };

  const resetCalculator = () => {
    setName1("");
    setName2("");
    setResult(null);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl border-pink-200">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Heart className="text-pink-500 fill-pink-500" size={48} />
          </div>
          <CardTitle className="text-2xl font-bold text-pink-700">Love Calculator</CardTitle>
          <CardDescription>Discover your compatibility with someone special</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name1" className="text-pink-600">Your Name</Label>
              <Input
                id="name1"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                placeholder="Enter your name"
                className="border-pink-200 focus:ring-pink-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name2" className="text-pink-600">Their Name</Label>
              <Input
                id="name2"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                placeholder="Enter their name"
                className="border-pink-200 focus:ring-pink-400"
              />
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={calculateLove}
              disabled={!name1.trim() || !name2.trim() || isCalculating}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {isCalculating ? "Calculating..." : "Calculate Love"}
            </Button>
          </div>
          
          {result !== null && (
            <div className="mt-6 text-center animate-fade-in">
              <div className="relative">
                <div className="w-48 h-48 mx-auto rounded-full border-8 border-pink-200 flex items-center justify-center">
                  <div className="text-4xl font-bold text-pink-600">
                    {result}%
                  </div>
                </div>
                <Heart className="absolute top-4 right-4 text-pink-400 fill-pink-400" size={32} />
                <Heart className="absolute bottom-4 left-4 text-pink-400 fill-pink-400" size={24} />
              </div>
              
              <p className="mt-6 text-lg font-medium text-pink-700">
                {message}
              </p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Button 
            onClick={resetCalculator}
            variant="ghost"
            className="text-pink-500 hover:text-pink-700"
          >
            Reset Calculator
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
