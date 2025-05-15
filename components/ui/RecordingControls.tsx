// import React, { useState, useRef } from 'react';
// import { Mic, Upload } from 'lucide-react';

// interface RecordingControlsProps {
//   startRecording: () => void;
//   stopRecording: () => void;
//   onFileUpload: (file: File) => void;
//   isRecording: boolean;
// }

// const RecordingControls: React.FC<RecordingControlsProps> = ({
//   startRecording,
//   stopRecording,
//   onFileUpload,
//   isRecording
// }) => {
//   // Add a ref to track if we're currently in a hold-to-record state
//   const isHoldingRef = useRef(false);
  
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       onFileUpload(e.target.files[0]);
//     }
//   };

//   // Handle mouse events for hold-to-record
//   const handleMouseDown = () => {
//     isHoldingRef.current = true;
//     startRecording();
//   };

//   const handleMouseUp = () => {
//     if (isHoldingRef.current) {
//       isHoldingRef.current = false;
//       stopRecording();
//     }
//   };

//   // Handle touch events for mobile devices
//   const handleTouchStart = (e: React.TouchEvent) => {
//     e.preventDefault(); // Prevent default behavior
//     isHoldingRef.current = true;
//     startRecording();
//   };

//   const handleTouchEnd = (e: React.TouchEvent) => {
//     e.preventDefault(); // Prevent default behavior
//     if (isHoldingRef.current) {
//       isHoldingRef.current = false;
//       stopRecording();
//     }
//   };
  
//   // Add this handler to ensure we stop recording if focus is lost while holding
//   const handleBlur = () => {
//     if (isHoldingRef.current && isRecording) {
//       isHoldingRef.current = false;
//       stopRecording();
//     }
//   };

//   return (
//     <div className="flex items-center justify-between mb-4">
//       <button
//         onMouseDown={handleMouseDown}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseUp} // Stop recording if mouse leaves button
//         onTouchStart={handleTouchStart}
//         onTouchEnd={handleTouchEnd}
//         onBlur={handleBlur} // Stop recording if button loses focus
//         className={`flex items-center justify-center p-3 rounded-full transition duration-800 ${
//           isRecording 
//             ? 'bg-green-600 text-white animate-pulse' 
//             : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//         }`}
//         aria-label={isRecording ? "Stop recording" : "Start recording"}
//       >
//         <Mic size={20} />
//       </button>
      
//       <div className="relative">
//         <input
//           type="file"
//           id="audio-upload"
//           onChange={handleFileChange}
//           accept="audio/*"
//           className="hidden"
//         />
//         <label 
//           htmlFor="audio-upload"
//           className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200 transition duration-200"
//         >
//           <Upload size={16} className="mr-2" />
//           Choose file
//         </label>
//       </div>
//     </div>
//   );
// };

// export default RecordingControls;
import React, { useState, useRef } from 'react';
import { Mic, Upload } from 'lucide-react';

interface RecordingControlsProps {
  startRecording: () => void;
  stopRecording: () => void;
  onFileUpload: (file: File) => void;
  isRecording: boolean;
}

const RecordingControls: React.FC<RecordingControlsProps> = ({
  startRecording,
  stopRecording,
  onFileUpload,
  isRecording
}) => {
  // Add a ref to track if we're currently in a hold-to-record state
  const isHoldingRef = useRef(false);
  
  // Add state to track if button is being actively held
  const [isHolding, setIsHolding] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  // Handle mouse events for hold-to-record
  const handleMouseDown = () => {
    isHoldingRef.current = true;
    setIsHolding(true);
    startRecording();
  };

  const handleMouseUp = () => {
    if (isHoldingRef.current) {
      isHoldingRef.current = false;
      setIsHolding(false);
      stopRecording();
    }
  };

  // Handle touch events for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent default behavior
    isHoldingRef.current = true;
    setIsHolding(true);
    startRecording();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent default behavior
    if (isHoldingRef.current) {
      isHoldingRef.current = false;
      setIsHolding(false);
      stopRecording();
    }
  };
  
  // Add this handler to ensure we stop recording if focus is lost while holding
  const handleBlur = () => {
    if (isHoldingRef.current && isRecording) {
      isHoldingRef.current = false;
      setIsHolding(false);
      stopRecording();
    }
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Stop recording if mouse leaves button
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onBlur={handleBlur} // Stop recording if button loses focus
        className={`flex items-center justify-center p-3 rounded-full transition-all duration-300 ${
          isRecording 
            ? 'bg-green-600 text-white animate-pulse' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        } ${
          isHolding 
            ? 'transform scale-125 shadow-lg' 
            : ''
        }`}
        aria-label={isRecording ? "Stop recording" : "Start recording"}
      >
        <Mic size={20} />
      </button>
      
      <div className="relative">
        <input
          type="file"
          id="audio-upload"
          onChange={handleFileChange}
          accept="audio/*"
          className="hidden"
        />
        <label 
          htmlFor="audio-upload"
          className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200 transition duration-200"
        >
          <Upload size={16} className="mr-2" />
          Choose file
        </label>
      </div>
    </div>
  );
};

export default RecordingControls;