import { format } from "date-fns";
import html2pdf from "html2pdf.js";
import printJS from "print-js";

interface VoucherType {
  name: string;
  email: string;
  voucher_id: string;
  tax: number;
  total: number;
  netTotal: number;
  sale_date: string;
  records: {
    id: number;
    name: string;
    price: number;
    quantity: string;
    cost: number;
    createdAt: string;
  }[];
}

const VoucherCard = ({
  name,
  voucher_id,
  sale_date,
  netTotal,
  records,
  tax,
  total,
}: VoucherType) => {
  const handlePrint = () => {
    printJS({
      printable: "printArea",
      type: "html",
      css: [
        "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
      ], // External CSS link
    });
  };

  const handlePdf = () => {
    const element = document.getElementById("printArea");

    html2pdf()
      .from(element)
      .set({
        margin: 1,
        paddingBottom: 2,
        image: { type: "jpeg", quality: 0.98 },
        filename: `invoice_${voucher_id}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .save();
  };

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
            {name}
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
                <td className="py-2">{record.name}</td>
                <td className="py-2 text-center">{record.quantity}</td>
                <td className="py-2 text-right">{record.price}</td>
                <td className="py-2 text-right">{record.cost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="text-sm">
            <tr className="border-b">
              <td className="w-[80%] py-4 text-right font-semibold" colSpan={4}>
                Total
              </td>
              <td className="w-[20%] text-right" colSpan={1}>
                RM {total.toFixed(2)}
              </td>
            </tr>
            <tr className="border-b">
              <td className="w-[80%] py-4 text-right font-semibold" colSpan={4}>
                Tax
              </td>
              <td className="w-[20%] pe-1 text-right" colSpan={1}>
                RM {tax.toFixed(2)}
              </td>
            </tr>
            <tr className="border-b">
              <td className="w-[80%] py-4 text-right font-semibold" colSpan={4}>
                Net-Total
              </td>
              <td className="w-[20%] text-right" colSpan={1}>
                RM {netTotal.toFixed(2)}
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
          onClick={handlePdf}
        >
          Download PDF
        </button>
      </div>
    </>
  );
};

export default VoucherCard;