import React, { useState, useEffect } from 'react';
import { BandFormProps, Band, CustomerInfo, TicketQuantities, OrderData } from './types';

import Description from './components/Description';
import Tickets from './components/Tickets';
import Forms from './components/Forms';

const BandForm = ({ initialBand, bands }: BandFormProps) => {
  const [currentBand, setCurrentBand] = useState<Band>(initialBand);
  const [tickets, setTickets] = useState<TicketQuantities>({});
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  // Initialize tickets when band changes
  useEffect(() => {
    if (currentBand && currentBand.ticketTypes && Array.isArray(currentBand.ticketTypes)) {
      const initialTickets: TicketQuantities = currentBand.ticketTypes.reduce((acc, ticket) => ({ 
        ...acc, 
        [ticket.type]: 0 
      }), {});
      setTickets(initialTickets);
    } else {
      setTickets({});
    }
  }, [currentBand]);

  const handleBandChange = (newBand: Band): void => { 
    setCurrentBand(newBand);
  };

  const updateTicketQuantity = (ticketType: string, change: number): void => {
    setTickets(prev => ({
      ...prev,
      [ticketType]: Math.max(0, (prev[ticketType] || 0) + change)
    }));
  };

  const calculateTotal = (): number => {
    if (!currentBand || !currentBand.ticketTypes || !Array.isArray(currentBand.ticketTypes)) {
      return 0;
    }
    
    return currentBand.ticketTypes.reduce((total, ticket) => {
      const quantity = tickets[ticket.type] || 0;
      return total + (quantity * ticket.cost);
    }, 0);
  };

  const handleInputChange = (field: keyof CustomerInfo, value: string): void => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePurchase = (): void => {
    const orderData: OrderData = {
      band: currentBand?.name || 'Unknown',
      tickets,
      total: calculateTotal(),
      customerInfo
    };
    console.log('Order Data:', orderData);
    alert(`Order placed! Total: ${(calculateTotal() / 100).toFixed(2)}`);
  };

  const totalTickets: number = Object.values(tickets).reduce((sum, qty) => sum + (qty || 0), 0);

  // Don't render if no current band or invalid band data
  if (!currentBand) {
    return <div>Loading...</div>;
  }

  if (!currentBand.ticketTypes || !Array.isArray(currentBand.ticketTypes)) {
    return <div>Error: Invalid band data. Missing ticketTypes.</div>;
  }

  return (
    <div className="app-container">
      {/* Left Column - Band Description */}
      <Description 
        band={currentBand} 
        bands={bands || []}
        onBandChange={handleBandChange}
      />

      {/* Right Column - Tickets & Forms */}
      <div className="content-container">
        <Tickets 
          band={currentBand}
          tickets={tickets}
          onTicketChange={updateTicketQuantity}
        />
        
        <Forms
          total={calculateTotal()}
          totalTickets={totalTickets}
          customerInfo={customerInfo}
          onInfoChange={handleInputChange}
          onPurchase={handlePurchase}
        />
      </div>
    </div>
  );
};

export default BandForm;