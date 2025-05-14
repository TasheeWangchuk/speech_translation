// import { useState } from 'react';

// type ModelOption = {
//   value: string;
//   label: string;
// };

// type LanguageOption = {
//   value: string;
//   label: string;
// };

// // API endpoints
// const DIRECT_API_URL = "http://10.2.5.119:5000/translate";
// const CASCADE_API_URL = "http://10.2.4.113:5000/api/translate";

// export const useAudioTranslation = () => {
//   const [model, setModel] = useState<string>('Direct');
//   const [sourceLanguage, setSourceLanguage] = useState<string>('English');
//   const [targetLanguage, setTargetLanguage] = useState<string>('Dzongkha');
//   const [targetAudio, setTargetAudio] = useState<string | null>(null);
//   const [isTranslating, setIsTranslating] = useState<boolean>(false);
//   const [transcriptionText, setTranscriptionText] = useState<string | null>(null);
//   const [translationText, setTranslationText] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const modelOptions: ModelOption[] = [
//     { value: 'Direct', label: 'Direct Model' },
//     { value: 'Cascade', label: 'Cascade Model' }
//   ];

//   const languageOptions: LanguageOption[] = [
//     { value: 'English', label: 'English' },
//     { value: 'Dzongkha', label: 'Dzongkha' }
//   ];

//   const swapLanguages = () => {
//     setSourceLanguage(targetLanguage);
//     setTargetLanguage(sourceLanguage);
//   };

//   const getLanguageParams = () => {
//     const isEnToDz = sourceLanguage === "English" && targetLanguage === "Dzongkha";

//     if (model === "Direct") {
//       return {
//         language: isEnToDz ? "en_dz" : "dz_en",
//       };
//     } else {
//       return {
//         source_lang: isEnToDz ? "en" : "dz",
//         target_lang: isEnToDz ? "dz" : "en",
//         audio_type: ".wav",
//         speaker: "female",
//       };
//     }
//   };

//   const translateAudio = async (audioFile: File | null) => {
//     if (!audioFile) {
//       setError("Please select or record audio first");
//       return;
//     }

//     setIsTranslating(true);
//     setError(null);

//     try {
//       const formData = new FormData();
//       const apiUrl = model === "Direct" ? DIRECT_API_URL : CASCADE_API_URL;
//       const langParams = getLanguageParams();

//       // Add audio file to formData
//       if (model === "Direct") {
//         formData.append("audio", audioFile);
//         formData.append("language", langParams.language);
//         formData.append("speaker_id", "0");
//       } else {
//         formData.append("audio", audioFile);
//         formData.append("source_lang", langParams.source_lang);
//         formData.append("target_lang", langParams.target_lang);
//         formData.append("audio_type", langParams.audio_type);
//         formData.append("speaker", langParams.speaker);
//       }

//       // Make API call
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         body: formData,
//         mode: "cors",
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }

//       // Handle response based on selected model
//       if (model === "Direct") {
//         // Get the audio blob from response
//         const audioBlob = await response.blob();
//         const audioUrl = URL.createObjectURL(audioBlob);

//         // Set the translated audio
//         setTargetAudio(audioUrl);
//         setTranscriptionText(null);
//         setTranslationText(null);
//       } else {
//         // Get JSON response for Cascade model
//         const jsonResponse = await response.json();

//         if (jsonResponse.success) {
//           // Set transcription and translation text
//           setTranscriptionText(jsonResponse.transcription);
//           setTranslationText(jsonResponse.translation);

//           // Get the audio from the URL
//           const audioUrl = `${jsonResponse.audio_url}`;

//           // Fetch the audio file
//           const audioResponse = await fetch(audioUrl);
//           const audioBlob = await audioResponse.blob();
//           const blobUrl = URL.createObjectURL(audioBlob);

//           // Set the translated audio
//           setTargetAudio(blobUrl);
//         } else {
//           throw new Error("Translation failed");
//         }
//       }
//     } catch (error) {
//       console.error("Translation failed:", error);

//       // Try with no-cors mode as a fallback for CORS errors
//       if (error instanceof Error && error.message.includes("CORS")) {
//         try {
//           alert("Attempting alternative connection method...");
//           const formData = new FormData();
//           const langParams = getLanguageParams();
//           const apiUrl = model === "Direct" ? DIRECT_API_URL : CASCADE_API_URL;

//           if (model === "Direct") {
//             formData.append("audio", audioFile);
//             formData.append("language", langParams.language);
//             formData.append("speaker_id", "0");
//           } else {
//             formData.append("audio", audioFile);
//             formData.append("source_lang", langParams.source_lang);
//             formData.append("target_lang", langParams.target_lang);
//             formData.append("audio_type", langParams.audio_type);
//             formData.append("speaker", langParams.speaker);
//           }

//           await fetch(apiUrl, {
//             method: "POST",
//             body: formData,
//             mode: "no-cors",
//           });

//           setError("Request sent to server, but response can't be processed due to CORS restrictions. Please check server logs or contact the administrator.");
//         } catch (secondError) {
//           setError(`Translation failed. The API server needs to be configured to allow CORS requests. Error: ${secondError instanceof Error ? secondError.message : 'Unknown error'}`);
//         }
//       } else {
//         setError(`Translation failed. Please check if the server is running. Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
//       }
//     } finally {
//       setIsTranslating(false);
//     }
//   };

//   const clearTranslation = () => {
//     if (targetAudio) {
//       URL.revokeObjectURL(targetAudio);
//     }
//     setTargetAudio(null);
//     setTranscriptionText(null);
//     setTranslationText(null);
//     setError(null);
//   };

//   return {
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
//     error
//   };
// };

import { useState } from "react";

type ModelOption = {
  value: string;
  label: string;
};

type LanguageOption = {
  value: string;
  label: string;
};

// Define return types for getLanguageParams to ensure type safety
type DirectParams = {
  language: string;
};

type CascadeParams = {
  source_lang: string;
  target_lang: string;
  audio_type: string;
  speaker: string;
};

// API endpoints
const DIRECT_API_URL = "http://10.2.5.119:5000/translate";
const CASCADE_API_URL =
  "https://5741-103-133-216-195.ngrok-free.app/api/translate";

export const useAudioTranslation = () => {
  const [model, setModel] = useState<string>("Direct");
  const [sourceLanguage, setSourceLanguage] = useState<string>("English");
  const [targetLanguage, setTargetLanguage] = useState<string>("Dzongkha");
  const [targetAudio, setTargetAudio] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [transcriptionText, setTranscriptionText] = useState<string | null>(
    null
  );
  const [translationText, setTranslationText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const modelOptions: ModelOption[] = [
    { value: "Direct", label: "Direct Model" },
    { value: "Cascade", label: "Cascade Model" },
  ];

  const languageOptions: LanguageOption[] = [
    { value: "English", label: "English" },
    { value: "Dzongkha", label: "Dzongkha" },
  ];

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  };

  // Specify return type for getLanguageParams to help TypeScript
  const getLanguageParams = (): DirectParams | CascadeParams => {
    const isEnToDz =
      sourceLanguage === "English" && targetLanguage === "Dzongkha";

    if (model === "Direct") {
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

  const translateAudio = async (audioFile: File | null) => {
    if (!audioFile) {
      setError("Please select or record audio first");
      return;
    }

    setIsTranslating(true);
    setError(null);

    try {
      const formData = new FormData();
      const apiUrl = model === "Direct" ? DIRECT_API_URL : CASCADE_API_URL;
      const langParams = getLanguageParams();

      // Add audio file to formData
      formData.append("audio", audioFile);

      if (model === "Direct") {
        // Use type assertion to help TypeScript understand the shape
        const directParams = langParams as DirectParams;
        formData.append("language", directParams.language);
        formData.append("speaker_id", "0");
      } else {
        // Use type assertion to help TypeScript understand the shape
        const cascadeParams = langParams as CascadeParams;
        formData.append("source_lang", cascadeParams.source_lang);
        formData.append("target_lang", cascadeParams.target_lang);
        formData.append("audio_type", cascadeParams.audio_type);
        formData.append("speaker", cascadeParams.speaker);
      }

      // Make API call
      const response = await fetch(apiUrl, {
        headers: {
          "ngrok-skip-browser-warning": "1",
        },
        method: "POST",
        body: formData,
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Handle response based on selected model
      if (model === "Direct") {
        // Get the audio blob from response
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        // Set the translated audio
        setTargetAudio(audioUrl);
        setTranscriptionText(null);
        setTranslationText(null);
      } else {
        // Get JSON response for Cascade model
        const jsonResponse = await response.json();

        if (jsonResponse.success) {
          // Set transcription and translation text
          setTranscriptionText(jsonResponse.transcription);
          setTranslationText(jsonResponse.translation);

          // Get the audio from the URL
          const audioUrl = `${jsonResponse.audio_url}`;

          // Fetch the audio file
          // const audioResponse = await fetch(audioUrl);
          // When fetching the audio file:
          const audioResponse = await fetch(audioUrl, {
            headers: {
              "ngrok-skip-browser-warning": "1",
            },
          });
          const audioBlob = await audioResponse.blob();
          const blobUrl = URL.createObjectURL(audioBlob);

          // Set the translated audio
          setTargetAudio(blobUrl);
        } else {
          throw new Error("Translation failed");
        }
      }
    } catch (error) {
      console.error("Translation failed:", error);

      // Try with no-cors mode as a fallback for CORS errors
      if (error instanceof Error && error.message.includes("CORS")) {
        try {
          alert("Attempting alternative connection method...");
          const formData = new FormData();
          const apiUrl = model === "Direct" ? DIRECT_API_URL : CASCADE_API_URL;
          const langParams = getLanguageParams();

          formData.append("audio", audioFile);

          if (model === "Direct") {
            const directParams = langParams as DirectParams;
            formData.append("language", directParams.language);
            formData.append("speaker_id", "0");
          } else {
            const cascadeParams = langParams as CascadeParams;
            formData.append("source_lang", cascadeParams.source_lang);
            formData.append("target_lang", cascadeParams.target_lang);
            formData.append("audio_type", cascadeParams.audio_type);
            formData.append("speaker", cascadeParams.speaker);
          }

          await fetch(apiUrl, {
            method: "POST",
            body: formData,
            mode: "no-cors",
          });

          setError(
            "Request sent to server, but response can't be processed due to CORS restrictions. Please check server logs or contact the administrator."
          );
        } catch (secondError) {
          setError(
            `Translation failed. The API server needs to be configured to allow CORS requests. Error: ${
              secondError instanceof Error
                ? secondError.message
                : "Unknown error"
            }`
          );
        }
      } else {
        setError(
          `Translation failed. Please check if the server is running. Error: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    } finally {
      setIsTranslating(false);
    }
  };

  const clearTranslation = () => {
    if (targetAudio) {
      URL.revokeObjectURL(targetAudio);
    }
    setTargetAudio(null);
    setTranscriptionText(null);
    setTranslationText(null);
    setError(null);
  };

  return {
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
  };
};
