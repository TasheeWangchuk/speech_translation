import React from 'react';
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { RefreshCw } from 'lucide-react';

type LanguageOption = {
  value: string;
  label: string;
};

interface LanguageSelectorProps {
  sourceLanguage: string;
  targetLanguage: string;
  // onSourceChange: (event: SelectChangeEvent) => void;
  // onTargetChange: (event: SelectChangeEvent) => void;
  onSwapLanguages: () => void;
  languageOptions: LanguageOption[];
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  sourceLanguage,
  targetLanguage,
  // onSourceChange,
  // onTargetChange,
  onSwapLanguages,
  languageOptions
}) => {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex-1">
        <FormControl fullWidth variant="outlined">
          <Select
            value={sourceLanguage}
            // onChange={onSourceChange}
            className="bg-gray-50 border border-gray-200 rounded-lg text-black shadow-md"
            size="small"
            MenuProps={{
              PaperProps: {
                style: { maxHeight: 300 }
              }
            }}
          >
            {languageOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      
      <div className="flex-shrink-0">
        <button 
          onClick={onSwapLanguages}
          className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition duration-200 shadow-sm"
        >
          <RefreshCw size={20} />
        </button>
      </div>
      
      <div className="flex-1">
        <FormControl fullWidth variant="outlined">
          <Select
            value={targetLanguage}
            // onChange={onTargetChange}
            className="bg-gray-50 border border-gray-200 rounded-lg text-black shadow-md"
            size="small"
            MenuProps={{
              PaperProps: {
                style: { maxHeight: 300 }
              }
            }}
          >
            {languageOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default LanguageSelector;