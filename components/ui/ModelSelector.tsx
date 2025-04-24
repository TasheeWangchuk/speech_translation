import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

type ModelOption = {
  value: string;
  label: string;
};

interface ModelSelectorProps {
  model: string;
  setModel: (model: string) => void;
  modelOptions: ModelOption[];
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ model, setModel, modelOptions }) => {
  const handleModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModel(event.target.value);
  };

  // Split options into two columns
  const halfLength = Math.ceil(modelOptions.length / 2);
  const firstColumn = modelOptions.slice(0, halfLength);
  const secondColumn = modelOptions.slice(halfLength);

  return (
    <div>
      <FormControl component="fieldset" className="w-full"> 
        <div className="flex justify-center">
          <div className="flex gap-8">
            {/* First Column */}
            <div>
              <RadioGroup
                name="model-radio-group-1"
                value={model}
                onChange={handleModelChange}
              >
                {firstColumn.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio color="success" />}
                    label={option.label}
                    className="mb-2"
                  />
                ))}
              </RadioGroup>
            </div>
            
            {/* Second Column */}
            <div>
              <RadioGroup
                name="model-radio-group-2"
                value={model}
                onChange={handleModelChange}
              >
                {secondColumn.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio color="success" />}
                    label={option.label}
                    className="mb-2"
                  />
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>
      </FormControl>
    </div>
  );
};

export default ModelSelector;