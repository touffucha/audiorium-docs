import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import useIsBrowser from '@docusaurus/useIsBrowser';

const Choices = [
  {
    value: 'light',
    label: 'ライト',
    icon: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" />
      </>
    ),
  },
  {
    value: 'dark',
    label: 'ダーク',
    icon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />,
  },
  {
    value: null,
    label: 'システムの設定に従う',
    icon: (
      <>
        <rect x="3" y="4.5" width="18" height="12" />
        <path d="M8.5 20h7M12 16.5V20" />
      </>
    ),
  },
];

export default function ThemeSwitch() {
  const { colorModeChoice, setColorMode } = useColorMode();
  const isBrowser = useIsBrowser();
  return (
    <div className="theme-switch" role="group" aria-label="配色">
      {Choices.map(({ value, label, icon }) => (
        <button
          key={label}
          type="button"
          className="theme-switch__button"
          title={label}
          aria-label={label}
          aria-pressed={isBrowser && colorModeChoice === value}
          onClick={() => setColorMode(value)}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {icon}
          </svg>
        </button>
      ))}
    </div>
  );
}
