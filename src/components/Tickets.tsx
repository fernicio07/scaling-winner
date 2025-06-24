import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { TicketsProps, TicketSelectorProps, QuantityControlsProps } from '../types';

const formatPrice = (cents: number): string => `${(cents / 100).toFixed(2)}`;

const QuantityControls = ({ quantity, onIncrease, onDecrease }: QuantityControlsProps) => {
  return (
    <div className="quantity-controls">
      <button
        onClick={onDecrease}
        disabled={quantity === 0}
        className="quantity-button"
      >
        <Minus size={18} />
      </button>
      
      <span className="quantity-display">
        {quantity}
      </span>
      
      <button
        onClick={onIncrease}
        className="quantity-button"
      >
        <Plus size={18} />
      </button>
    </div>
  );
};

const TicketSelector = ({ ticket, quantity, onQuantityChange }: TicketSelectorProps) => {
  return (
    <div className="ticket-card">
      <div className="ticket-content">
        <div className="ticket-info">
          <h3 className="ticket-name">
            {ticket.name}
          </h3>
          <p className="ticket-description">
            {ticket.description}
          </p>
          <div className="ticket-price">
            {formatPrice(ticket.cost)}
          </div>
        </div>
        
        <QuantityControls 
          quantity={quantity}
          onIncrease={() => onQuantityChange(1)}
          onDecrease={() => onQuantityChange(-1)}
        />
      </div>
    </div>
  );
};

const Tickets = ({ band, tickets, onTicketChange }: TicketsProps) => {
  return (
    <div className="tickets-container">
      <h2 className="tickets-title">
        Select Tickets
      </h2>

      {band.ticketTypes.map((ticket) => (
        <TicketSelector
          key={ticket.type}
          ticket={ticket}
          quantity={tickets[ticket.type] || 0}
          onQuantityChange={(change) => onTicketChange(ticket.type, change)}
        />
      ))}
    </div>
  );
};

export default Tickets;