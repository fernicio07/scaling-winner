import React from 'react';
import { BandSwitcherProps } from '../types';

const BandSwitcher = ({ bands, currentBandId, onBandChange }: BandSwitcherProps) => {
  return (
    <div className="band-switcher">
      <h3 className="switcher-title">Upcoming Concerts</h3>
      <div className="band-options">
        {bands.map((band) => (
          <button
            key={band.id}
            onClick={() => onBandChange(band)}
            className={`band-option ${currentBandId === band.id ? 'active' : ''}`}
          >
            <div className="band-option-name">{band.name}</div>
            <div className="band-option-location">{band.location.split(',')[0]}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BandSwitcher;