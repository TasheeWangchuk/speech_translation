"use client";

import { useState, useRef, useEffect } from "react";
import {
  RefreshCw,
  Mic,
  Share2,
  Download,
  Play,
  Pause,
  StopCircle,
  FastForward,
} from "lucide-react";

export default function Home() {
  const [selectedFromLang, setSelectedFromLang] = useState("English");
  const [selectedToLang, setSelectedToLang] = useState("Dzongkha");
  const [selectedModel, setSelectedModel] = useState("Direct");
  const [audioFile, setAudioFile] = useState(null);
  const [audioFileName, setAudioFileName] = useState("No file selected");
  const [isLoading, setIsLoading] = useState(false);
  const [translatedAudio, setTranslatedAudio] = useState(null);
  const [translationText, setTranslationText] = useState(null);
  const [transcriptionText, setTranscriptionText] = useState(null);
  const [isSourcePlaying, setIsSourcePlaying] = useState(false);
  const [isTranslatedPlaying, setIsTranslatedPlaying] = useState(false);

  // Playback speed states
  const [sourcePlaybackSpeed, setSourcePlaybackSpeed] = useState(1);
  const [translatedPlaybackSpeed, setTranslatedPlaybackSpeed] = useState(1);

  // Recording related states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const sourceAudioRef = useRef(null);
  const translatedAudioRef = useRef(null);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioStreamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const timerRef = useRef(null);

  // Audio context and analyzer for visualization
  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);

  // API endpoints
  const DIRECT_API_URL = "http://10.2.5.233:5000/translate";
  const CASCADE_API_URL = "http://10.2.4.249:5000/api/translate";

  const swapLanguages = () => {
    setSelectedFromLang(selectedToLang);
    setSelectedToLang(selectedFromLang);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      setAudioFileName(file.name);

      // Create URL for the audio element
      if (sourceAudioRef.current) {
        const fileURL = URL.createObjectURL(file);
        sourceAudioRef.current.src = fileURL;
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Format recording time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Initialize audio visualization
  useEffect(() => {
    if (isRecording && canvasRef.current && analyser) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const visualize = () => {
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        const draw = () => {
          animationFrameRef.current = requestAnimationFrame(draw);

          analyser.getByteFrequencyData(dataArray);

          ctx.fillStyle = "rgb(255, 255, 255)";
          ctx.fillRect(0, 0, WIDTH, HEIGHT);

          const barWidth = (WIDTH / bufferLength) * 2.5;
          let barHeight;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] / 2;

            ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
            ctx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

            x += barWidth + 1;
          }
        };

        draw();
      };

      visualize();

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [isRecording, analyser]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      // Clean up audio streams
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      // Clear timers and animation frames
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Handle audio ended events
  useEffect(() => {
    const sourceAudio = sourceAudioRef.current;
    const translatedAudio = translatedAudioRef.current;

    const handleSourceEnded = () => setIsSourcePlaying(false);
    const handleTranslatedEnded = () => setIsTranslatedPlaying(false);

    if (sourceAudio) {
      sourceAudio.addEventListener("ended", handleSourceEnded);
    }

    if (translatedAudio) {
      translatedAudio.addEventListener("ended", handleTranslatedEnded);
    }

    return () => {
      if (sourceAudio) {
        sourceAudio.removeEventListener("ended", handleSourceEnded);
      }
      if (translatedAudio) {
        translatedAudio.removeEventListener("ended", handleTranslatedEnded);
      }
    };
  }, []);

  // Update playback rate when it changes
  useEffect(() => {
    if (sourceAudioRef.current) {
      sourceAudioRef.current.playbackRate = sourcePlaybackSpeed;
    }
  }, [sourcePlaybackSpeed]);

  useEffect(() => {
    if (translatedAudioRef.current) {
      translatedAudioRef.current.playbackRate = translatedPlaybackSpeed;
    }
  }, [translatedPlaybackSpeed]);

  // Start recording function
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;

      // Create audio context for visualization
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const analyzerNode = audioCtx.createAnalyser();
      const microphone = audioCtx.createMediaStreamSource(stream);
      microphone.connect(analyzerNode);

      setAudioContext(audioCtx);
      setAnalyser(analyzerNode);

      // Create media recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks = [];

      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);

        // Update the audio source
        if (sourceAudioRef.current) {
          sourceAudioRef.current.src = audioUrl;
        }

        // Create a file from the blob for the API
        const currentDate = new Date();
        const fileName = `recording_${currentDate.toISOString()}.wav`;
        const audioFile = new File([audioBlob], fileName, {
          type: "audio/wav",
        });

        setAudioFile(audioFile);
        setAudioFileName(fileName);

        // Clean up
        if (audioStreamRef.current) {
          audioStreamRef.current.getTracks().forEach((track) => track.stop());
        }
      });

      // Start recording
      mediaRecorder.start();
      setIsRecording(true);

      // Start timer
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Unable to access microphone. Please check your permissions.");
    }
  };

  // Stop recording function
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      // Clear animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
  };

  // Determine language parameters based on selected model and languages
  const getLanguageParams = () => {
    const isEnToDz =
      selectedFromLang === "English" && selectedToLang === "Dzongkha";

    if (selectedModel === "Direct") {
      return {
        language: isEnToDz ? "en_dz" : "dz_en",
      };
    } else {
      return {
        source_lang: isEnToDz ? "en" : "dz",
        target_lang: isEnToDz ? "dz" : "en",
        audio_type: ".wav",
        speaker: "female",
      };
    }
  };

  const translateAudio = async () => {
    if (!audioFile) {
      alert("Please select or record audio first");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      const apiUrl =
        selectedModel === "Direct" ? DIRECT_API_URL : CASCADE_API_URL;
      const langParams = getLanguageParams();

      // Add audio file to formData
      if (selectedModel === "Direct") {
        formData.append("audio", audioFile);
        formData.append("language", langParams.language);
        formData.append("speaker_id", "0");
      } else {
        formData.append("audio", audioFile);
        formData.append("source_lang", langParams.source_lang);
        formData.append("target_lang", langParams.target_lang);
        formData.append("audio_type", langParams.audio_type);
        formData.append("speaker", langParams.speaker);
      }

      // Make API call
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Handle response based on selected model
      if (selectedModel === "Direct") {
        // Get the audio blob from response
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        // Set the translated audio
        setTranslatedAudio(audioUrl);
        setTranscriptionText(null);
        setTranslationText(null);

        if (translatedAudioRef.current) {
          translatedAudioRef.current.src = audioUrl;
          translatedAudioRef.current.playbackRate = translatedPlaybackSpeed;
        }
      } else {
        // Get JSON response for Cascade model
        const jsonResponse = await response.json();

        if (jsonResponse.success) {
          // Set transcription and translation text
          setTranscriptionText(jsonResponse.transcription);
          setTranslationText(jsonResponse.translation);

          // Get the audio from the URL
          const audioUrl = `http://10.2.4.249:5000${jsonResponse.audio_url}`;

          // Fetch the audio file
          const audioResponse = await fetch(audioUrl);
          const audioBlob = await audioResponse.blob();
          const blobUrl = URL.createObjectURL(audioBlob);

          // Set the translated audio
          setTranslatedAudio(blobUrl);

          if (translatedAudioRef.current) {
            translatedAudioRef.current.src = blobUrl;
            translatedAudioRef.current.playbackRate = translatedPlaybackSpeed;
          }
        } else {
          throw new Error("Translation failed");
        }
      }
    } catch (error) {
      console.error("Translation failed:", error);

      // Try with no-cors mode as a fallback for CORS errors
      if (error.message.includes("CORS")) {
        try {
          alert("Attempting alternative connection method...");
          const formData = new FormData();
          const langParams = getLanguageParams();
          const apiUrl =
            selectedModel === "Direct" ? DIRECT_API_URL : CASCADE_API_URL;

          if (selectedModel === "Direct") {
            formData.append("audio", audioFile);
            formData.append("language", langParams.language);
            formData.append("speaker_id", "0");
          } else {
            formData.append("audio", audioFile);
            formData.append("source_lang", langParams.source_lang);
            formData.append("target_lang", langParams.target_lang);
            formData.append("audio_type", langParams.audio_type);
            formData.append("speaker", langParams.speaker);
          }

          await fetch(apiUrl, {
            method: "POST",
            body: formData,
            mode: "no-cors",
          });

          alert(
            "Request sent to server, but response can't be processed due to CORS restrictions. Please check server logs or contact the administrator."
          );
        } catch (secondError) {
          alert(
            `Translation failed. The API server needs to be configured to allow CORS requests. Error: ${secondError.message}`
          );
        }
      } else {
        alert(
          `Translation failed. Please check if the server is running. Error: ${error.message}`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSourceAudioPlay = () => {
    if (sourceAudioRef.current) {
      if (isSourcePlaying) {
        sourceAudioRef.current.pause();
      } else {
        sourceAudioRef.current.play();
      }
      setIsSourcePlaying(!isSourcePlaying);
    }
  };

  const toggleTranslatedAudioPlay = () => {
    if (translatedAudioRef.current) {
      if (isTranslatedPlaying) {
        translatedAudioRef.current.pause();
      } else {
        translatedAudioRef.current.play();
      }
      setIsTranslatedPlaying(!isTranslatedPlaying);
    }
  };

  const downloadTranslatedAudio = () => {
    if (translatedAudio) {
      const a = document.createElement("a");
      a.href = translatedAudio;
      a.download = `translated_${audioFileName}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  // Change playback speed functions
  const changeSourcePlaybackSpeed = (speed) => {
    setSourcePlaybackSpeed(speed);
    if (sourceAudioRef.current) {
      sourceAudioRef.current.playbackRate = speed;
    }
  };

  const changeTranslatedPlaybackSpeed = (speed) => {
    setTranslatedPlaybackSpeed(speed);
    if (translatedAudioRef.current) {
      translatedAudioRef.current.playbackRate = speed;
    }
  };

  return (
    <div className="min-h-screen relative bg-white overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 left-0 w-1/3 h-2/3 bg-yellow-200 rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-yellow-200 rounded-tl-full" />

      {/* Main content */}
      <div className="relative max-w-4xl mx-auto px-4 py-8">
        <p className="text-center text-gray-600 italic mb-8">
          "Convenient translation at your fingertips...."
        </p>

        <p className="mb-4 font-medium">
          Translate from {selectedFromLang} to {selectedToLang}
        </p>

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

        {/* Model Selection */}
        <div className="mb-6">
          <p className="mb-2 font-medium">Select Translation Model</p>
          <div className="flex items-center justify-center gap-4">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-60 p-2 rounded-lg border border-gray-300 bg-white"
            >
              <option value="Direct">Direct Model</option>
              <option value="Cascade">Cascade Model</option>
            </select>
            <span className="text-sm text-gray-500">
              {selectedModel === "Direct"
                ? "End-to-end translation"
                : "Transcription + Translation pipeline"}
            </span>
          </div>
        </div>

        {/* Audio Input Section */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-sm text-gray-600">Your Audio</span>
            <button
              className="bg-orange-200 text-orange-600 px-4 py-1 rounded-full text-sm"
              onClick={handleUploadClick}
            >
              Select Audio
            </button>

            {isRecording ? (
              <button
                className="bg-red-500 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1"
                onClick={stopRecording}
              >
                <StopCircle className="w-4 h-4" /> Stop Recording (
                {formatTime(recordingTime)})
              </button>
            ) : (
              <button
                className="bg-orange-200 text-orange-600 px-4 py-1 rounded-full text-sm flex items-center gap-1"
                onClick={startRecording}
              >
                <Mic className="w-4 h-4" /> Record Audio
              </button>
            )}

            <span className="text-sm text-gray-500">
              {isRecording ? "Recording..." : audioFileName}
            </span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="audio/*"
              className="hidden"
            />
          </div>

          {/* Audio Visualization */}
          {isRecording && (
            <div className="mb-4 bg-white rounded-lg shadow-md p-4">
              <canvas
                ref={canvasRef}
                className="w-full h-24 bg-white rounded"
              ></canvas>
            </div>
          )}

          {/* Source Audio Player */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex items-center gap-4">
              <button
                className={`text-gray-600 ${!audioFile ? "opacity-50" : ""}`}
                onClick={toggleSourceAudioPlay}
                disabled={!audioFile}
              >
                {isSourcePlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>
              <audio ref={sourceAudioRef} className="hidden" />
              <div className="flex-1 h-2 bg-gray-200 rounded-full">
                <div
                  className={`${
                    audioFile ? "w-1/3" : "w-0"
                  } h-full bg-orange-500 rounded-full`}
                ></div>
              </div>

              {/* Source Playback Speed Controls */}
              <div className="flex items-center gap-1">
                <FastForward className="w-4 h-4 text-gray-500" />
                <select
                  value={sourcePlaybackSpeed}
                  onChange={(e) =>
                    changeSourcePlaybackSpeed(parseFloat(e.target.value))
                  }
                  className={`text-xs border rounded p-1 ${
                    !audioFile ? "opacity-50" : ""
                  }`}
                  disabled={!audioFile}
                >
                  <option value="1">1x</option>
                  <option value="0.75">0.75x</option>
                  <option value="0.5">0.5x</option>
                  <option value="1.25">1.25x</option>
                  <option value="1.5">1.5x</option>
                </select>
              </div>

              <Share2
                className={`w-4 h-4 text-gray-600 ${
                  !audioFile ? "opacity-50" : ""
                }`}
              />
            </div>
          </div>

          {/* Cascade Model Text Output */}
          {selectedModel === "Cascade" && (
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <div className="mb-3">
                <span className="text-sm font-medium text-gray-600">
                  Transcription:
                </span>
                <p className="mt-1 text-gray-800">
                  {transcriptionText || "No transcription available"}
                </p>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-600">
                  Translation:
                </span>
                <p className="mt-1 text-gray-800">
                  {translationText || "No translation available"}
                </p>
              </div>
            </div>
          )}

          {/* Translated Audio */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-4">
              <button
                className={`text-gray-600 ${
                  !translatedAudio ? "opacity-50" : ""
                }`}
                onClick={toggleTranslatedAudioPlay}
                disabled={!translatedAudio}
              >
                {isTranslatedPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>
              <audio ref={translatedAudioRef} className="hidden" />
              <div className="flex-1 h-2 bg-gray-200 rounded-full">
                <div
                  className={`${
                    translatedAudio ? "w-1/2" : "w-0"
                  } h-full bg-orange-500 rounded-full transition-all`}
                ></div>
              </div>

              {/* Translated Playback Speed Controls */}
              <div className="flex items-center gap-1">
                <FastForward className="w-4 h-4 text-gray-500" />
                <select
                  value={translatedPlaybackSpeed}
                  onChange={(e) =>
                    changeTranslatedPlaybackSpeed(parseFloat(e.target.value))
                  }
                  className={`text-xs border rounded p-1 ${
                    !translatedAudio ? "opacity-50" : ""
                  }`}
                  disabled={!translatedAudio}
                >
                  <option value="1">1x</option>
                  <option value="0.75">0.75x</option>
                  <option value="0.5">0.5x</option>
                  <option value="1.25">1.25x</option>
                  <option value="1.5">1.5x</option>
                </select>
              </div>

              <Share2
                className={`w-4 h-4 text-gray-600 ${
                  !translatedAudio ? "opacity-50" : ""
                }`}
              />
              <Download
                className={`w-4 h-4 text-gray-600 ${
                  !translatedAudio ? "opacity-50" : ""
                }`}
                onClick={translatedAudio ? downloadTranslatedAudio : undefined}
                style={{ cursor: translatedAudio ? "pointer" : "default" }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            className={`bg-orange-500 text-white px-8 py-2 rounded-full transition-colors ${
              isLoading ? "opacity-70" : "hover:bg-orange-600"
            }`}
            onClick={translateAudio}
            disabled={isLoading || !audioFile}
          >
            {isLoading ? "Translating..." : "Translate"}
          </button>
        </div>
      </div>
    </div>
  );
}
