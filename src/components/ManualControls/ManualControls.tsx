import React from 'react';

interface ManualControlsProps {
  settings: {
    sentimentPositive: boolean;
    macroPositive: boolean;
  };
  onSettingChange: (key: 'sentimentPositive' | 'macroPositive', value: boolean) => void;
}

const ManualControls: React.FC<ManualControlsProps> = ({ settings, onSettingChange }) => {
  const Toggle: React.FC<{
    id: string;
    label: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  }> = ({ id, label, description, checked, onChange }) => (
    <div className="flex items-center space-x-3">
      <div className="flex-1">
        <label htmlFor={id} className="text-sm font-medium text-white cursor-pointer">
          {label}
        </label>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-bitcoin-orange focus:ring-offset-2 focus:ring-offset-gray-800
          ${checked ? 'bg-bitcoin-orange' : 'bg-gray-600'}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );

  return (
    <div className="glassmorphism rounded-xl p-6 min-w-[300px]">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <span className="text-2xl mr-2">⚙️</span>
        Manual Settings
      </h3>
      
      <div className="space-y-4">
        <Toggle
          id="sentiment-toggle"
          label="Market Sentiment"
          description="Overall market sentiment (news, social media, etc.)"
          checked={settings.sentimentPositive}
          onChange={(checked) => onSettingChange('sentimentPositive', checked)}
        />
        
        <Toggle
          id="macro-toggle"
          label="Macro Factors"
          description="Economic conditions, regulations, institutional adoption"
          checked={settings.macroPositive}
          onChange={(checked) => onSettingChange('macroPositive', checked)}
        />
      </div>

      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-xs text-blue-300">
          💡 Use these toggles to factor in qualitative analysis that can't be automatically measured
        </p>
      </div>
    </div>
  );
};

export default ManualControls;