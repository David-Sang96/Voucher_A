import { format } from "date-fns";
import { handlePdf, handlePrint } from "../../../services/voucher";

interface VoucherType {
  customer_name: string;
  id: number;
  voucher_id: number;
  sale_date: string;
  updated_at: string;
  created_at: string;
  customer_email: string;
  total: number;
  tax: number;
  net_total: number;
  records: {
    id: number;
    voucher_id: string;
    quantity: number;
    cost: number;
    created_at: string;
    updated_at: string;
    product: {
      id: number;
      product_name: string;
      created_at: string;
      updated_at: string;
      price: number;
    };
  }[];
}

const VoucherCard = ({
  customer_name,
  voucher_id,
  sale_date,
  net_total,
  records,
  tax,
  total,
}: VoucherType) => {
  return (
    <>
      <div className="w-[14.8cm] bg-white" id="printArea">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">INVOICE</h1>
          <div className="text-right">
            <p className="text-xl font-semibold">Top </p>
            <p className="text-sm"> Reacher</p>
          </div>
        </div>

        <div className="mb-8 flex justify-between">
          <div>
            <p className="font-semibold">{voucher_id}</p>
            <p className="text-sm">
              Date: {format(sale_date, "EEE, dd MMMM yyyy")}
            </p>
          </div>
          <div>
            <p className="text-end font-semibold">Invoice to</p>
            {customer_name}
          </div>
        </div>

        <table className="mb-8 w-full">
          <thead>
            <tr className="border-b text-sm">
              <th className="py-2 text-left">No</th>
              <th className="py-2 text-left">Description</th>
              <th className="py-2 text-left">Qty</th>
              <th className="py-2 text-right">Price</th>
              <th className="py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr className="border-b text-sm" key={record.id}>
                <td className="py-2">{record.id}</td>
                <td className="py-2">{record.product.product_name}</td>
                <td className="py-2 text-center">{record.quantity}</td>
                <td className="py-2 text-right">{record.product.price}</td>
                <td className="py-2 text-right">{record.cost}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="text-sm">
            <tr className="border-b">
              <td className="w-[80%] py-4 text-right font-semibold" colSpan={4}>
                Total
              </td>
              <td className="w-[20%] text-right" colSpan={1}>
                RM {total}
              </td>
            </tr>
            <tr className="border-b">
              <td className="w-[80%] py-4 text-right font-semibold" colSpan={4}>
                Tax
              </td>
              <td className="w-[20%] pe-1 text-right" colSpan={1}>
                RM {tax}
              </td>
            </tr>
            <tr className="border-b">
              <td className="w-[80%] py-4 text-right font-semibold" colSpan={4}>
                Net-Total
              </td>
              <td className="w-[20%] text-right" colSpan={1}>
                RM {net_total}
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="mb-4 grid grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <h2 className="mb-2 font-semibold">Payment Transfer to</h2>
            <p>Hong Leong Bank: 09250152018</p>
            <p>May Bank : 02730102705025601</p>
            <p>Public Bank : 20003674121</p>
          </div>
          <div className="space-y-1 text-right">
            <h2 className="mb-2 font-semibold">Top Reacher</h2>
            <p>Jalan Baduri,Off Jalan Sam Peng</p>
            <p>+60 182 3734 67</p>
            <p>enquiry@4everyoung.com</p>
          </div>
        </div>

        <div className="border-t pt-4 text-center text-sm font-semibold">
          Thank you for purchasing the products!
        </div>
      </div>
      <div className="mt-6 flex w-1/2 justify-end pe-8">
        <button
          type="button"
          className="mb-2 me-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-blue-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:shadow-lg dark:shadow-blue-800/80 dark:focus:ring-blue-800"
          onClick={handlePrint}
        >
          Print Invoice
        </button>
        <button
          type="button"
          className="mb-2 me-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-blue-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:shadow-lg dark:shadow-blue-800/80 dark:focus:ring-blue-800"
          onClick={() => handlePdf(voucher_id)}
        >
          Download PDF
        </button>
      </div>
    </>
  );
};

export default VoucherCard;
