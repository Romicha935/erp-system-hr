export interface PaymentVoucherItem {
  id: string;
  sn: string;
  classType: string;
  description: string;
  qty: number;
  unitPrice: number;
  amount: number;
  vatPercent: number;
  vatAmount: number;
  grossAmount: number;
  whtPercent: number;
  whtAmount: number;
  netAmount: number;
}

export interface PaymentVoucher {
  id: string;
  sn: string;
  subject: string;
  date: string;
  preparedBy: string;
  sendTo: string;
  status?: string;
  items?: PaymentVoucherItem[];
  beneficiaryDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
}