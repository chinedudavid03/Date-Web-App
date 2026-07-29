export type AppStep = 1 | 2 | 3 | 4 | 5 | 6;

export interface FoodOption {
  id: string;
  emoji: string;
  label: string;
  description: string;
}

export interface ProposalData {
  senderName: string;
  recipientName: string;
  selectedDate: string;
  selectedTime: string;
  selectedFood: string[];
  isPaid: boolean;
}
