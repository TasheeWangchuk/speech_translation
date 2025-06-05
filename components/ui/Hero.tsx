  // "use client";

  // import React, { useState, useEffect } from "react";
  // import ModelSelector from "@/components/ui/ModelSelector";
  // import LanguageSelector from "@/components/ui/LanguageSelector";
  // import AudioPanel from "@/components/ui/AudioPanel";
  // import { useScrollPosition } from "@/hooks/useScrollPosition";
  // import { useAudioRecording } from "@/hooks/useAudioRecording";
  // import { useAudioTranslation } from "@/hooks/useAudioTranslation";
  // import { formatTime } from "@/utils/formatTime";

  // const HeroWithTranslation: React.FC = () => {
  //   const scrollPosition = useScrollPosition();
  //   const [errorMessage, setErrorMessage] = useState<string | null>(null);

  //   const {
  //     model,
  //     setModel,
  //     sourceLanguage,
  //     setSourceLanguage,
  //     targetLanguage,
  //     setTargetLanguage,
  //     targetAudio,
  //     isTranslating,
  //     translateAudio,
  //     clearTranslation,
  //     modelOptions,
  //     languageOptions,
  //     swapLanguages,
  //     transcriptionText,
  //     translationText,
  //     error,
  //   } = useAudioTranslation();

  //   // Handle automatic translation when recording completes or file is uploaded
  //   const handleRecordingComplete = (file: File) => {
  //     setErrorMessage(null);
  //     if (file) {
  //       translateAudio(file);
  //     }
  //   };

  //   const {
  //     isRecording,
  //     sourceAudio,
  //     audioFile,
  //     recordingTime,
  //     startRecording,
  //     stopRecording,
  //     handleFileUpload,
  //     clearAudio,
  //   } = useAudioRecording(handleRecordingComplete);

  //   // Display any error from the translation hook
  //   useEffect(() => {
  //     if (error) {
  //       setErrorMessage(error);
  //     }
  //   }, [error]);

  //   const handleClear = () => {
  //     clearAudio();
  //     clearTranslation();
  //     setErrorMessage(null);
  //   };

  //   const handleSourceLanguageChange = (
  //     event: React.ChangeEvent<HTMLInputElement>
  //   ) => {
  //     setSourceLanguage(event.target.value);
  //   };

  //   const handleTargetLanguageChange = (
  //     event: React.ChangeEvent<HTMLInputElement>
  //   ) => {
  //     setTargetLanguage(event.target.value);
  //   };

  //   return (
  //     <div
  //       id="hero"
  //       className="relative min-h-screen w-full flex items-center justify-center py-16"
  //     >
  //       {/* Background image with overlay */}
  //       <div
  //         className="absolute inset-0 bg-cover bg-center bg-fixed"
  //         style={{ backgroundImage: `url('/dragon-background.jpg')` }}
  //       />
  //       <div className="absolute inset-0 bg-black/70" />

  //       {/* Main content container */}
  //       <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
  //         <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
  //           {/* Header section */}
  //           {/*<div className="p-6 bg-gray-50 border-b border-gray-200">
  //             <ModelSelector
  //               model={model}
  //               setModel={setModel}
  //               modelOptions={modelOptions}
  //               // className="w-full max-w-md mx-auto"
  //             />
  //           </div>*/}

  //           {/* Main content section */}
  //           <div className="p-6">
  //             {/* Language selector */}
  //             <div className="mb-6">
  //               <LanguageSelector
  //                 sourceLanguage={sourceLanguage}
  //                 targetLanguage={targetLanguage}
  //                 // onSourceChange={handleSourceLanguageChange}
  //                 // onTargetChange={handleTargetLanguageChange}
  //                 onSwapLanguages={swapLanguages}
  //                 languageOptions={languageOptions}
  //               />
  //             </div>
  //             {/* Audio panels */}
  //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  //               <AudioPanel
  //                 title="Input Audio"
  //                 panelType="input"
  //                 audioUrl={sourceAudio}
  //                 isRecording={isRecording}
  //                 startRecording={startRecording}
  //                 stopRecording={stopRecording}
  //                 onFileUpload={handleFileUpload}
  //                 recordingTime={
  //                   isRecording ? formatTime(recordingTime) : undefined
  //                 }
  //               />

  //               <AudioPanel
  //                 title="Output Audio"
  //                 panelType="output"
  //                 audioUrl={targetAudio}
  //               />
  //             </div>

  //             {/* Error message */}
  //             {errorMessage && (
  //               <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center">
  //                 <svg
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   className="h-5 w-5 mr-2"
  //                   viewBox="0 0 20 20"
  //                   fill="currentColor"
  //                 >
  //                   <path
  //                     fillRule="evenodd"
  //                     d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
  //                     clipRule="evenodd"
  //                   />
  //                 </svg>
  //                 {errorMessage}
  //               </div>
  //             )}

  //             {/* Translation Status */}
  //             {isTranslating && (
  //               <div className="mb-6 p-3 bg-transparent  text-black rounded-lg flex items-center justify-center">
  //                 <svg
  //                   className="animate-spin h-5 w-5 mr-2"
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   fill="none"
  //                   viewBox="0 0 24 24"
  //                 >
  //                   <circle
  //                     className="opacity-25"
  //                     cx="12"
  //                     cy="12"
  //                     r="10"
  //                     stroke="currentColor"
  //                     strokeWidth="4"
  //                   ></circle>
  //                   <path
  //                     className="opacity-75"
  //                     fill="currentColor"
  //                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  //                   ></path>
  //                 </svg>
  //                 Translating...
  //               </div>
  //             )}
  //             {/* Clear button only */}
  //             <div className="flex items-center justify-center gap-4">
  //               <button
  //                 onClick={handleClear}
  //                 disabled={!sourceAudio && !targetAudio}
  //                 className={`px-6 py-2 rounded-md transition duration-200 shadow-md ${
  //                   !sourceAudio && !targetAudio
  //                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
  //                     : "bg-red-500 text-white hover:bg-red-600"
  //                 }`}
  //               >
  //                 Clear
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // export default HeroWithTranslation;

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
  const [isPlayingAudio, setIsPlayingAudio] = useState(false); // Track audio playback state

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

  // Mock function to simulate audio playback detection
  // In real implementation, this would be connected to your audio player
  useEffect(() => {
    // This is a placeholder - you would connect this to your actual audio player
    // For demo purposes, let's simulate playback when targetAudio exists
    if (targetAudio) {
      setIsPlayingAudio(true);
      const timer = setTimeout(() => setIsPlayingAudio(false), 3000); // 3 second demo
      return () => clearTimeout(timer);
    }
  }, [targetAudio]);

  const handleClear = () => {
    clearAudio();
    clearTranslation();
    setErrorMessage(null);
    setIsPlayingAudio(false);
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

  const handleFileUploadWrapper = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center py-16"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('/dragon-background.jpg')` }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
          {/* Main content section */}
          <div className="p-6">
            {/* Language selector */}
            <div className="mb-6">
              <LanguageSelector
                sourceLanguage={sourceLanguage}
                targetLanguage={targetLanguage}
                onSwapLanguages={swapLanguages}
                languageOptions={languageOptions}
              />
            </div>

            {/* Desktop: Audio panels */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <AudioPanel
                title="Input Audio"
                panelType="input"
                audioUrl={sourceAudio}
                isRecording={isRecording}
                startRecording={startRecording}
                stopRecording={stopRecording}
                onFileUpload={handleFileUpload}
                recordingTime={
                  isRecording ? formatTime(recordingTime) : undefined
                }
              />

              <AudioPanel
                title="Output Audio"
                panelType="output"
                audioUrl={targetAudio}
              />
            </div>

            {/* Mobile: Recording controls in vertical stack */}
            <div className="md:hidden mb-6">
              <div className="flex flex-col items-center space-y-4">
                {/* Recording Button with Pulsing Animation */}
                <div className="relative">
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all duration-200 ${
                      isRecording 
                        ? 'bg-red-500 shadow-lg' 
                        : 'bg-blue-500 hover:bg-blue-600 shadow-md'
                    }`}
                  >
                    {/* Pulsing animation rings when recording */}
                    {isRecording && (
                      <>
                        <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-30"></div>
                        <div className="absolute inset-0 rounded-full bg-red-400 animate-pulse opacity-20"></div>
                      </>
                    )}
                    
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 relative z-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {isRecording ? (
                        <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        />
                      )}
                    </svg>
                  </button>
                  
                  {/* Recording time display */}
                  {isRecording && (
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-600 font-mono">
                      {formatTime(recordingTime)}
                    </div>
                  )}
                </div>

                {/* File Upload Button */}
                <div className="relative">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUploadWrapper}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="audio-upload-mobile"
                  />
                  <label
                    htmlFor="audio-upload-mobile"
                    className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 cursor-pointer shadow-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    Upload Audio
                  </label>
                </div>

                {/* Playback Animation - shown when audio is playing */}
                {isPlayingAudio && (
                  <div className="flex items-center space-x-1 py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M9 9v6l4.5-3L9 9z"
                      />
                    </svg>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 bg-blue-500 rounded-full animate-pulse"
                          style={{
                            height: `${Math.random() * 20 + 10}px`,
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: '0.5s'
                          }}
                        ></div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">Playing...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Error message */}
            {errorMessage && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errorMessage}
              </div>
            )}

            {/* Translation Status */}
            {isTranslating && (
              <div className="mb-6 p-3 bg-transparent text-black rounded-lg flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Translating...
              </div>
            )}

            {/* Clear button */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleClear}
                disabled={!sourceAudio && !targetAudio}
                className={`px-6 py-2 rounded-md transition duration-200 shadow-md ${
                  !sourceAudio && !targetAudio
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600"
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