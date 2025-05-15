import React from "react";
import RecordingControls from "./RecordingControls";
import AudioPlayer from "./AudioPlayer";

interface AudioPanelProps {
  title: string;
  panelType: "input" | "output";
  audioUrl: string | null;
  isRecording?: boolean;
  startRecording?: () => void;
  stopRecording?: () => void;
  onFileUpload?: (file: File) => void;
  recordingTime?: string;
}

const AudioPanel: React.FC<AudioPanelProps> = ({
  title,
  panelType,
  audioUrl,
  isRecording = false,
  startRecording,
  stopRecording,
  onFileUpload,
  recordingTime,
}) => {
  return (
    <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="text-black py-2 px-4 flex justify-center">
        <h3 className="text-md font-light">{title}</h3>
      </div>
      <div className="p-4">
        <div>
          {/* Only show recording controls for input panel */}
          {panelType === "input" &&
            startRecording &&
            stopRecording &&
            onFileUpload && (
              <RecordingControls
                isRecording={isRecording}
                startRecording={startRecording}
                stopRecording={stopRecording}
                onFileUpload={onFileUpload}
              />
            )}
          {isRecording && recordingTime && (
            <span className="ml-2 text-sm text-red-500">{recordingTime}</span>
          )}
        </div>
        {/* Audio Player */}
        <div className="mt-4 h-32 bg-white rounded-md border border-gray-200 p-3">
          <AudioPlayer audioUrl={audioUrl} panelType={panelType} />
        </div>
      </div>
    </div>
  );
};
export default AudioPanel;
