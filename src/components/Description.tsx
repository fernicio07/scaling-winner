import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { DescriptionProps } from '../types';

import BandSwitcher from './BandSwitcher';

const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const Description = ({ band, bands, onBandChange }: DescriptionProps) => {
  return (
    <div className="description-container">
      <img 
        src={band.imgUrl} 
        alt={band.name}
        className="band-image"
      />
      
      <h1 className="band-name">
        {band.name}
      </h1>
      
      <div className="event-details">
        <div className="event-detail-item">
          <Calendar size={18} />
          <span>{formatDate(band.date)}</span>
        </div>
        <div className="event-detail-item">
          <MapPin size={18} />
          <span>{band.location}</span>
        </div>
      </div>
      
      <div 
        className="band-description"
        dangerouslySetInnerHTML={{ __html: band.description_blurb }}
      />
      
      <BandSwitcher 
        bands={bands}
        currentBandId={band.id}
        onBandChange={onBandChange}
      />
    </div>
  );
};

export default Description;