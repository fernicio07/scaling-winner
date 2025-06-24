import React from 'react';
import { Band } from './types';

import skaBandData from './band-json/ska-band.json';
import kpopBandData from './band-json/kpop-band.json';
import punkBandData from './band-json/punk-band.json';
import BandForm from './BandForm';

import './assets/styles.css';

const skaBand = skaBandData as Band;
const kpopBand = kpopBandData as Band;
const punkBand = punkBandData as Band;

const App = () => {
  const bands: Band[] = [skaBand, kpopBand, punkBand];
  
  return (
    <div className="App">
      <BandForm initialBand={bands[0]} bands={bands} />
    </div>
  );
};

export default App;