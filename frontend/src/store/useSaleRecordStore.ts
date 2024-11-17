import { create } from "zustand";

export type Record = {
  product_id: number;
  quantity: number;
  cost: number;
  product: {
    price: number;
    product_name: string;
  };
  created_at: string;
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
      records: state.records.filter((item) => item.product_id !== id),
    }));
  },

  resetRecords() {
    set({ records: [] });
  },

  addQuantity: (id, quantity) => {
    set((state) => ({
      records: state.records.map((record) =>
        record.product_id === id
          ? {
              ...record,
              quantity: Number(record.quantity) + quantity,
              cost: (Number(record.quantity) + quantity) * record.product.price,
            }
          : record,
      ),
    }));
  },

  removeQuantity(id) {
    set((state) => ({
      records: state.records
        .map((record) =>
          record.product_id === id
            ? {
                ...record,
                quantity: record.quantity > 0 ? Number(record.quantity) - 1 : 0,
                cost: (Number(record.quantity) - 1) * record.product.price,
              }
            : record,
        )
        .filter((item) => item.quantity > 0),
    }));
  },
}));

export default useSaleRecordStore;
