import { create } from "zustand";

type Record = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  cost: number;
  createdAt: string;
};

type SaleRecordState = {
  records: Record[];
  addRecord: (record: Record) => void;
  deleteRecord: (id: number) => void;
  addQuantity: (id: number, quantity: number) => void;
  removeQuantity: (id: number) => void;
  resetRecords: () => void;
};

const useSaleRecordStore = create<SaleRecordState>((set) => ({
  records: [],

  addRecord: (record) => {
    set((state) => ({ records: [...state.records, record] }));
  },

  deleteRecord: (id) => {
    set((state) => ({
      records: state.records.filter((item) => item.id !== id),
    }));
  },

  resetRecords() {
    set({ records: [] });
  },

  addQuantity: (id, quantity) => {
    set((state) => ({
      records: state.records.map((record) =>
        record.id === id
          ? {
              ...record,
              quantity: Number(record.quantity) + quantity,
              cost: (Number(record.quantity) + quantity) * record.price,
            }
          : record,
      ),
    }));
  },

  removeQuantity(id) {
    set((state) => ({
      records: state.records
        .map((record) =>
          record.id === id
            ? {
                ...record,
                quantity: record.quantity > 0 ? Number(record.quantity) - 1 : 0,
                cost: (Number(record.quantity) - 1) * record.price,
              }
            : record,
        )
        .filter((item) => item.quantity > 0),
    }));
  },
}));

export default useSaleRecordStore;
