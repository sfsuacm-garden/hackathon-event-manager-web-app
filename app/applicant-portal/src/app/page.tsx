"use client";
// src/pages/index.tsx (or src/App.tsx if CRA)

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-100 via-purple-50 to-yellow-50">
      <Card className="max-w-4xl w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center py-16">
          <CardTitle className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-yellow-600 bg-clip-text text-transparent mb-6">
            SFHacks 2026
          </CardTitle>
          <CardDescription className="text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
            Welcome to the official registration portal for San Francisco&apos;s premier hackathon event.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-10 pb-16">
          <div className="bg-gradient-to-r from-purple-100 to-yellow-100 border-2 border-purple-200 rounded-2xl p-10">
            <p className="text-xl text-gray-800 leading-relaxed font-medium">
              🚀 Join hundreds of hackers, designers, and innovators for <span className="font-bold text-purple-700">48 hours</span> of building, learning, and networking.
            </p>
          </div>
          
          <div className="flex flex-col gap-6">
            <Link href="/register">
              <Button className="w-full h-20 bg-gradient-to-r from-purple-600 to-yellow-500 hover:from-purple-700 hover:to-yellow-600 text-white font-bold text-2xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-200 transform hover:scale-105">
                ✨ Register Now ✨
              </Button>
            </Link>
            <Button variant="outline" className="w-full h-16 border-2 border-purple-400 hover:border-yellow-400 text-xl font-bold rounded-2xl text-purple-700 hover:bg-purple-50 transition-colors">
              📚 Learn More
            </Button>
          </div>
          
          <div className="bg-yellow-100 border-2 border-yellow-300 rounded-2xl p-8 mt-10">
            <p className="text-lg text-yellow-800 font-bold">
              ⏰ Registration closes soon. Secure your spot today!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-base text-gray-700">
            <div className="flex items-center justify-center space-x-3 bg-purple-50 rounded-xl p-6">
              <span className="text-3xl">💻</span>
              <span className="font-semibold">48 Hours</span>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-yellow-50 rounded-xl p-6">
              <span className="text-3xl">🏆</span>
              <span className="font-semibold">Amazing Prizes</span>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-purple-50 rounded-xl p-6">
              <span className="text-3xl">🌐</span>
              <span className="font-semibold">Global Network</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
