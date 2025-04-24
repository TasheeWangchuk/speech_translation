// import React from 'react';
// import RecordingControls from './RecordingControls';
// import AudioPlayer from './AudioPlayer';

// interface AudioPanelProps {
//   title: string;
//   panelType: 'input' | 'output';
//   audioUrl: string | null;
//   isRecording?: boolean;
//   toggleRecording?: () => void;
//   onFileUpload?: (file: File) => void;
// }

// const AudioPanel: React.FC<AudioPanelProps> = ({ 
//   title, 
//   panelType, 
//   audioUrl,
//   isRecording = false,
//   toggleRecording,
//   onFileUpload,
// }) => {
//   return (
//     <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden border border-gray-200">
//       {/* <div className="bg-green-500 text-white py-2 px-4">
//         <h2 className="text-lg font-medium">{title}</h2>
//       </div> */}
//       <div className='text-black py-2 px-4 flex justify-center'>
//         <h3 className="text-md font-light">{title}</h3>
//       </div>
//       <div className="p-4">
//         {/* Only show recording controls for input panel */}
//         {panelType === 'input' && toggleRecording && onFileUpload && (
//           <RecordingControls 
//             isRecording={isRecording}
//             toggleRecording={toggleRecording}
//             onFileUpload={onFileUpload}
//           />
//         )}
        
//         {/* Show recording status if recording */}
//         {panelType === 'input' && isRecording && (
//           <div className="flex items-center justify-center p-2 bg-red-50 text-red-500 rounded-md mb-4">
//             <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
//             Recording...
//           </div>
//         )}
        
//         {/* Audio Player */}
//         <div className="mt-4 h-32 bg-white rounded-md border border-gray-200 p-3">
//           <AudioPlayer audioUrl={audioUrl} panelType={panelType} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AudioPanel;
import React from 'react';
import RecordingControls from './RecordingControls';
import AudioPlayer from './AudioPlayer';

interface AudioPanelProps {
  title: string;
  panelType: 'input' | 'output';
  audioUrl: string | null;
  isRecording?: boolean;
  toggleRecording?: () => void;
  onFileUpload?: (file: File) => void;
  recordingTime?: string;
}

const AudioPanel: React.FC<AudioPanelProps> = ({ 
  title, 
  panelType, 
  audioUrl,
  isRecording = false,
  toggleRecording,
  onFileUpload,
  recordingTime,
}) => {
  return (
    <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className='text-black py-2 px-4 flex justify-center'>
        <h3 className="text-md font-light">{title}</h3>
      </div>
      <div className="p-4">
        {/* Only show recording controls for input panel */}
        {panelType === 'input' && toggleRecording && onFileUpload && (
          <RecordingControls 
            isRecording={isRecording}
            toggleRecording={toggleRecording}
            onFileUpload={onFileUpload}
          />
        )}
        
        {/* Show recording status if recording */}
        {panelType === 'input' && isRecording && (
          <div className="flex items-center justify-center p-2 bg-red-50 text-red-500 rounded-md mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
            Recording... {recordingTime && `(${recordingTime})`}
          </div>
        )}
        
        {/* Audio Player */}
        <div className="mt-4 h-32 bg-white rounded-md border border-gray-200 p-3">
          <AudioPlayer audioUrl={audioUrl} panelType={panelType} />
        </div>
      </div>
    </div>
  );
};

export default AudioPanel;