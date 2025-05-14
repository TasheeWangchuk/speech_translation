"use client";

import React, { useState, useEffect } from "react";
import ModelSelector from "@/components/ui/ModelSelector";
import LanguageSelector from "@/components/ui/LanguageSelector";
import AudioPanel from "@/components/ui/AudioPanel";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useAudioRecording } from "@/hooks/useAudioRecording";
import { useAudioTranslation } from "@/hooks/useAudioTranslation";
import { formatTime } from "@/utils/formatTime";

const HeroWithTranslation: React.FC = () => {
  const scrollPosition = useScrollPosition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    model,
    setModel,
    sourceLanguage,
    setSourceLanguage,
    targetLanguage,
    setTargetLanguage,
    targetAudio,
    isTranslating,
    translateAudio,
    clearTranslation,
    modelOptions,
    languageOptions,
    swapLanguages,
    transcriptionText,
    translationText,
    error,
  } = useAudioTranslation();

  // Handle automatic translation when recording completes or file is uploaded
  const handleRecordingComplete = (file: File) => {
    setErrorMessage(null);
    if (file) {
      translateAudio(file);
    }
  };

  const {
    isRecording,
    sourceAudio,
    audioFile,
    recordingTime,
    startRecording,
    stopRecording,
    handleFileUpload,
    clearAudio,
  } = useAudioRecording(handleRecordingComplete);

  // Display any error from the translation hook
  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  const handleClear = () => {
    clearAudio();
    clearTranslation();
    setErrorMessage(null);
  };

  const handleSourceLanguageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSourceLanguage(event.target.value);
  };

  const handleTargetLanguageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTargetLanguage(event.target.value);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center py-16">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-fixed" 
           style={{ backgroundImage: `url('/dragon-background.jpg')` }} />
      <div className="absolute inset-0 bg-black/70" />

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
          {/* Header section */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <ModelSelector
              model={model}
              setModel={setModel}
              modelOptions={modelOptions}
              // className="w-full max-w-md mx-auto"
            />
          </div>

          {/* Main content section */}
          <div className="p-6">
              {/* Language selector */}
              <div className="mb-6">
              <LanguageSelector
                sourceLanguage={sourceLanguage}
                targetLanguage={targetLanguage}
                onSourceChange={handleSourceLanguageChange}
                onTargetChange={handleTargetLanguageChange}
                onSwapLanguages={swapLanguages}
                languageOptions={languageOptions}
              />
            </div>
            {/* Audio panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <AudioPanel
                title="Input Audio"
                panelType="input"
                audioUrl={sourceAudio}
                isRecording={isRecording}
                startRecording={startRecording}
                stopRecording={stopRecording}
                onFileUpload={handleFileUpload}
                recordingTime={isRecording ? formatTime(recordingTime) : undefined}
              />

              <AudioPanel
                title="Output Audio"
                panelType="output"
                audioUrl={targetAudio}
              />
            </div>

            {/* Error message */}
            {errorMessage && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errorMessage}
              </div>
            )}

            {/* Translation Status */}
            {isTranslating && (
              <div className="mb-6 p-3 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Translating...
              </div>
            )}
            {/* Clear button only */}
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={handleClear}
                disabled={!sourceAudio && !targetAudio}
                className={`px-6 py-2 rounded-md transition duration-200 shadow-md ${
                  !sourceAudio && !targetAudio
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroWithTranslation;