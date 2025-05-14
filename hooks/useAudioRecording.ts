import { useState, useRef, useEffect } from "react";

export const useAudioRecording = (
  onRecordingComplete?: (file: File) => void
) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [sourceAudio, setSourceAudio] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Clean up resources when component unmounts
  useEffect(() => {
    return () => {
      stopRecording();
      if (sourceAudio) {
        URL.revokeObjectURL(sourceAudio);
      }
    };
  }, []);
  const startRecording = async () => {
    try {
      // Check if we're already recording - prevent starting multiple recordings
      if (isRecording) return;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;

      // Initialize media recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      // Handle data available event
      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunksRef.current.push(event.data);
      });

      // Handle recording stop event
      mediaRecorder.addEventListener("stop", () => {
        // Only process the recording if we have audio chunks
        if (audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
          });
          const audioUrl = URL.createObjectURL(audioBlob);

          // Create a File object from the Blob
          const currentDate = new Date();
          const fileName = `recording_${currentDate.toISOString()}.wav`;
          const file = new File([audioBlob], fileName, { type: "audio/wav" });

          setSourceAudio(audioUrl);
          setAudioFile(file);

          // Call the callback if provided
          if (onRecordingComplete) {
            onRecordingComplete(file);
          }
        }

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
      // Clear any existing timer first
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Unable to access microphone. Please check your permissions.");
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setIsRecording(false);
  };

  const handleFileUpload = (file: File) => {
    if (file) {
      // Revoke previous URL to prevent memory leaks
      if (sourceAudio) {
        URL.revokeObjectURL(sourceAudio);
      }

      const url = URL.createObjectURL(file);
      setSourceAudio(url);
      setAudioFile(file);

      // Call the callback if provided
      if (onRecordingComplete) {
        onRecordingComplete(file);
      }
    }
  };

  const clearAudio = () => {
    if (sourceAudio) {
      URL.revokeObjectURL(sourceAudio);
    }
    setSourceAudio(null);
    setAudioFile(null);
    setRecordingTime(0);
  };

  return {
    isRecording,
    sourceAudio,
    audioFile,
    recordingTime,
    startRecording,
    stopRecording,
    handleFileUpload,
    clearAudio,
  };
};
