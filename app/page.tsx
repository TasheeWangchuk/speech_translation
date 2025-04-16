"use client";

import { useState } from "react";
import { RefreshCw, Mic, Share2, Download } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [selectedFromLang, setSelectedFromLang] = useState("English");
  const [selectedToLang, setSelectedToLang] = useState("Dzongkha");

  const swapLanguages = () => {
    setSelectedFromLang(selectedToLang);
    setSelectedToLang(selectedFromLang);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] relative bg-white overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 left-0 w-1/3 h-2/3 bg-yellow-200 rounded-br-[100px]" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-yellow-200 rounded-tl-[100px]" />
      
    
      {/* Main content */}
      <div className="relative max-w-4xl mx-auto px-4 py-8">
        <p className="text-center text-gray-600 italic mb-8">
          "Convenient translation at your fingertips...."
        </p>

        <p className="mb-4 font-medium">Translate from English to Dzongkha</p>

        {/* Language Selection */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <select
            value={selectedFromLang}
            onChange={(e) => setSelectedFromLang(e.target.value)}
            className="w-40 p-2 rounded-lg border border-gray-300 bg-white"
          >
            <option value="English">English</option>
            <option value="Dzongkha">Dzongkha</option>
          </select>

          <button
            onClick={swapLanguages}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <RefreshCw className="w-5 h-5 text-gray-600" />
          </button>

          <select
            value={selectedToLang}
            onChange={(e) => setSelectedToLang(e.target.value)}
            className="w-40 p-2 rounded-lg border border-gray-300 bg-white"
          >
            <option value="Dzongkha">Dzongkha</option>
            <option value="English">English</option>
          </select>
        </div>

        {/* Audio Input Section */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-2">
            <Mic className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-600">Your Audio</span>
            <button className="bg-orange-200 text-orange-600 px-4 py-1 rounded-full text-sm">
              Select Audio
            </button>
          </div>

          {/* Audio Player */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex items-center gap-4">
              <button className="text-gray-600">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4l12 6-12 6z" />
                </svg>
              </button>
              <div className="flex-1 h-2 bg-gray-200 rounded-full">
                <div className="w-1/3 h-full bg-orange-500 rounded-full"></div>
              </div>
              <Share2 className="w-4 h-4 text-gray-600" />
              <Download className="w-4 h-4 text-gray-600" />
            </div>
          </div>

          {/* Translated Audio */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-4">
              <button className="text-gray-600">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4l12 6-12 6z" />
                </svg>
              </button>
              <div className="flex-1 h-2 bg-gray-200 rounded-full">
                <div className="w-1/2 h-full bg-orange-500 rounded-full"></div>
              </div>
              <Share2 className="w-4 h-4 text-gray-600" />
              <Download className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Text Input/Output */}
        <div className="grid grid-cols-2 gap-6">
          <textarea
            placeholder="English Text..."
            className="w-full h-32 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none bg-white"
          />
          <textarea
            placeholder="Dzongkha Text..."
            className="w-full h-32 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none bg-white"
            readOnly
          />
        </div>

        <div className="mt-6 text-center">
          <button className="bg-orange-500 text-white px-8 py-2 rounded-full hover:bg-orange-600 transition-colors">
            Translate
          </button>
        </div>
      </div>
    </div>
  );
}