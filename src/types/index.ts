// Core data types
export interface TicketType {
  type: string;
  name: string;
  description: string;
  cost: number;
}

export interface Band {
  id: string;
  name: string;
  date: number;
  location: string;
  description_blurb: string;
  imgUrl: string;
  ticketTypes: TicketType[];
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface TicketQuantities {
  [ticketType: string]: number;
}

// Component prop types
export interface DescriptionProps {
  band: Band;
  bands: Band[];
  onBandChange: (band: Band) => void;
}

export interface BandSwitcherProps {
  bands: Band[];
  currentBandId: string;
  onBandChange: (band: Band) => void;
}

export interface TicketsProps {
  band: Band;
  tickets: TicketQuantities;
  onTicketChange: (ticketType: string, change: number) => void;
}

export interface TicketSelectorProps {
  ticket: TicketType;
  quantity: number;
  onQuantityChange: (change: number) => void;
}

export interface QuantityControlsProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export interface FormsProps {
  total: number;
  totalTickets: number;
  customerInfo: CustomerInfo;
  onInfoChange: (field: keyof CustomerInfo, value: string) => void;
  onPurchase: () => void;
}

export interface FormInputProps {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export interface OrderSummaryProps {
  total: number;
  totalTickets: number;
}

export interface CustomerInfoFormProps {
  customerInfo: CustomerInfo;
  onInfoChange: (field: keyof CustomerInfo, value: string) => void;
}

export interface PaymentFormProps {
  customerInfo: CustomerInfo;
  onInfoChange: (field: keyof CustomerInfo, value: string) => void;
}

export interface PurchaseButtonProps {
  onPurchase: () => void;
  disabled: boolean;
}

export interface BandFormProps {
  initialBand: Band;
  bands: Band[];
}

export interface AppProps {}

// Order data type for purchase
export interface OrderData {
  band: string;
  tickets: TicketQuantities;
  total: number;
  customerInfo: CustomerInfo;
}