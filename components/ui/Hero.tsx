"use client";

import React, { useState, useEffect } from "react";
import ModelSelector from "@/components/ui/ModelSelector";
import LanguageSelector from "@/components/ui/LanguageSelector";
import AudioPanel from "@/components/ui/AudioPanel";
import ActionButtons from "@/components/ui/ActionButtons";
// import TranscriptionDisplay from "@/components/ui/TranscriptionDisplay";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useAudioRecording } from "@/hooks/useAudioRecording";
import { useAudioTranslation } from "@/hooks/useAudioTranslation";
import { formatTime } from "@/utils/formatTime";

const HeroWithTranslation: React.FC = () => {
  const scrollPosition = useScrollPosition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    isRecording,
    sourceAudio,
    audioFile,
    recordingTime,
    toggleRecording,
    handleFileUpload,
    clearAudio,
  } = useAudioRecording();

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

  // Display any error from the translation hook
  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  const handleTranslate = () => {
    setErrorMessage(null);
    if (audioFile) {
      translateAudio(audioFile);
    } else {
      setErrorMessage("Please select or record audio first");
    }
  };

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
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Audio Translation</h2>
            <ModelSelector
              model={model}
              setModel={setModel}
              modelOptions={modelOptions}
              className="w-full max-w-md mx-auto"
            />
          </div>

          {/* Main content section */}
          <div className="p-6">
            {/* Audio panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <AudioPanel
                title="Input Audio"
                panelType="input"
                audioUrl={sourceAudio}
                isRecording={isRecording}
                toggleRecording={toggleRecording}
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

            {/* Action buttons */}
            <ActionButtons
              onTranslate={handleTranslate}
              onClear={handleClear}
              isTranslating={isTranslating}
              isTranslateDisabled={!sourceAudio}
              isAudioPresent={!!sourceAudio}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroWithTranslation;