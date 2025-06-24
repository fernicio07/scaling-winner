import React from 'react';
import { 
  FormsProps, 
  FormInputProps, 
  OrderSummaryProps, 
  CustomerInfoFormProps, 
  PaymentFormProps, 
  PurchaseButtonProps,
  CustomerInfo 
} from '../types';

const formatPrice = (cents: number): string => `$${(cents / 100).toFixed(2)}`;

// Credit card formatting function
const formatCardNumber = (value: string): string => {
  // Remove all non-digits
  const numericValue = value.replace(/\D/g, '');
  // Limit to 16 digits
  const limitedValue = numericValue.slice(0, 16);
  // Add spaces every 4 digits
  return limitedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
};

// Expiry date formatting function
const formatExpiryDate = (value: string): string => {
  // Remove all non-digits
  const numericValue = value.replace(/\D/g, '');
  // Limit to 4 digits
  const limitedValue = numericValue.slice(0, 4);
  // Add slash after 2 digits
  if (limitedValue.length >= 2) {
    return limitedValue.slice(0, 2) + '/' + limitedValue.slice(2);
  }
  return limitedValue;
};

// CVV formatting function
const formatCVV = (value: string): string => {
  // Remove all non-digits and limit to 4 digits
  return value.replace(/\D/g, '').slice(0, 4);
};

const FormInput = ({ 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  className = "",
  maxLength
}: FormInputProps & { maxLength?: number }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`form-input ${className}`}
      maxLength={maxLength}
    />
  );
};

const OrderSummary = ({ total, totalTickets }: OrderSummaryProps) => {
  return (
    <div className="order-summary">
      <h3 className="total-price">
        Total: {formatPrice(total)}
      </h3>
      <p className="ticket-count">
        {totalTickets} ticket{totalTickets !== 1 ? 's' : ''}
      </p>
    </div>
  );
};

const CustomerInfoForm = ({ customerInfo, onInfoChange }: CustomerInfoFormProps) => {
  return (
    <>
      <h3 className="section-title">
        Your Information
      </h3>
      
      <div className="input-grid">
        <FormInput
          placeholder="First Name"
          value={customerInfo.firstName}
          onChange={(value) => onInfoChange('firstName', value)}
        />
        <FormInput
          placeholder="Last Name"
          value={customerInfo.lastName}
          onChange={(value) => onInfoChange('lastName', value)}
        />
      </div>

      <FormInput
        type="email"
        placeholder="Email Address"
        value={customerInfo.email}
        onChange={(value) => onInfoChange('email', value)}
        className="full-width-input"
      />

      <FormInput
        placeholder="Address"
        value={customerInfo.address}
        onChange={(value) => onInfoChange('address', value)}
        className="full-width-input-spaced"
      />
    </>
  );
};

const PaymentForm = ({ customerInfo, onInfoChange }: PaymentFormProps) => {
  const handleCardNumberChange = (value: string) => {
    const formattedValue = formatCardNumber(value);
    onInfoChange('cardNumber', formattedValue);
  };

  const handleExpiryDateChange = (value: string) => {
    const formattedValue = formatExpiryDate(value);
    onInfoChange('expiryDate', formattedValue);
  };

  const handleCVVChange = (value: string) => {
    const formattedValue = formatCVV(value);
    onInfoChange('cvv', formattedValue);
  };

  return (
    <>
      <h3 className="section-title">
        Payment Details
      </h3>

      <FormInput
        placeholder="1234 5678 9012 3456"
        value={customerInfo.cardNumber}
        onChange={handleCardNumberChange}
        className="full-width-input"
        maxLength={19} // 16 digits + 3 spaces
      />

      <div className="payment-grid">
        <FormInput
          placeholder="MM/YY"
          value={customerInfo.expiryDate}
          onChange={handleExpiryDateChange}
          maxLength={5} // MM/YY format
        />
        <FormInput
          placeholder="CVV"
          value={customerInfo.cvv}
          onChange={handleCVVChange}
          maxLength={4}
          type="password"
        />
      </div>
    </>
  );
};

const PurchaseButton = ({ onPurchase, disabled }: PurchaseButtonProps) => {
  return (
    <button
      onClick={onPurchase}
      disabled={disabled}
      className="purchase-button"
    >
      Get Tickets
    </button>
  );
};

const Forms = ({ 
  total, 
  totalTickets, 
  customerInfo, 
  onInfoChange, 
  onPurchase 
}: FormsProps) => {
  return (
    <div>
      <OrderSummary total={total} totalTickets={totalTickets} />
      <CustomerInfoForm customerInfo={customerInfo} onInfoChange={onInfoChange} />
      <PaymentForm customerInfo={customerInfo} onInfoChange={onInfoChange} />
      <PurchaseButton onPurchase={onPurchase} disabled={totalTickets === 0} />
    </div>
  );
};

export default Forms;