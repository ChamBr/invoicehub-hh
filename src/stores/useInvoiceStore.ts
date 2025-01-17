import { create } from 'zustand';
import { InvoiceItem, InvoiceStore } from './types/invoice';

const TAX_RATE = 0.10; // 10% de imposto

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  items: [],
  
  addItem: (item: InvoiceItem) => 
    set((state) => ({ items: [...state.items, item] })),
  
  removeItem: (index: number) =>
    set((state) => ({ 
      items: state.items.filter((_, i) => i !== index) 
    })),
  
  updateItem: (index: number, item: InvoiceItem) =>
    set((state) => ({
      items: state.items.map((oldItem, i) => 
        i === index ? item : oldItem
      )
    })),
  
  clearItems: () => set({ items: [] }),
  
  calculateTotal: () => {
    const items = get().items;
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const taxTotal = items.reduce((sum, item) => {
      if (item.hasTax) {
        return sum + (item.total * TAX_RATE);
      }
      return sum;
    }, 0);
    return subtotal + taxTotal;
  },
}));