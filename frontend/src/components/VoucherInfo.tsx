import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner3 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import useSaleRecordStore from "../store/useSaleRecordStore";
import axiosInstance from "../ultis/axios";
import {
  currentDateTime,
  generateInvoiceNumber,
  getUTCTime,
} from "../ultis/helperFn";
import SaleForm from "./SaleForm";
import SaleTable from "./SaleTable";

interface IFormInput {
  id: number;
  voucher_id: number;
  name: string;
  email: string;
  is_correct: boolean;
  sale_date: string;
  createdAt: string;
  go_to_voucher: boolean;
}

const VoucherInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const { records, resetRecords } = useSaleRecordStore();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    data.sale_date = getUTCTime(data.sale_date);
    data.createdAt = getUTCTime();
    const total = records.reduce((a, c) => a + c.cost, 0);
    const tax = total * 0.05;
    const netTotal = total + tax;
    try {
      setIsLoading(true);
      const newVoucher = await axiosInstance.post("/vouchers", {
        voucher_id: data.voucher_id,
        name: data.name,
        email: data.email,
        sale_date: data.sale_date,
        records,
        total,
        tax,
        netTotal,
        createdAt: data.createdAt,
      });

      resetRecords();
      reset();
      toast.success("Voucher created");
      if (data.go_to_voucher) navigate(`/voucher/${newVoucher.data.id}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} id="infoForm">
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="mb-3">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Voucher ID
            </label>
            <input
              type="text"
              defaultValue={generateInvoiceNumber()}
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${errors.voucher_id && "border-red-500 focus:border-red-500 focus:ring-red-500"}`}
              {...register("voucher_id", {
                required: true,
              })}
            />
            {errors.voucher_id?.type === "required" && (
              <span className="text-xs font-bold text-red-500">
                Voucher ID is required
              </span>
            )}
          </div>
          <div className="mb-3">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Customer Name
            </label>
            <input
              type="text"
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500"}`}
              {...register("name", {
                required: true,
              })}
            />
            {errors.name?.type === "required" && (
              <span className="text-xs font-bold text-red-500">
                Customer name is required
              </span>
            )}
          </div>
          <div className="mb-3">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Customer Email
            </label>
            <input
              type="email"
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500"}`}
              {...register("email", {
                required: true,
              })}
            />
            {errors.email?.type === "required" && (
              <span className="text-xs font-bold text-red-500">
                Customer email is required
              </span>
            )}
          </div>
          <div className="mb-3">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Sale Date & Time
            </label>
            <input
              type="datetime-local"
              defaultValue={currentDateTime()}
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${errors.sale_date && "border-red-500 focus:border-red-500 focus:ring-red-500"}`}
              {...register("sale_date", {
                required: true,
              })}
            />
            {errors.sale_date?.type === "required" && (
              <span className="text-xs font-bold text-red-500">
                Sale date and time are required
              </span>
            )}
          </div>
        </div>
      </form>
      <SaleForm />
      <SaleTable />

      <div className="mt-4 flex flex-col items-end justify-end gap-2">
        <div>
          <input
            id="go_to_voucher"
            type="checkbox"
            defaultValue=""
            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            {...register("go_to_voucher")}
          />
          <label
            htmlFor="go_to_voucher"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Go to voucher detail
          </label>
        </div>
        <div>
          <input
            id="is_correct"
            form="infoForm"
            required
            type="checkbox"
            defaultValue=""
            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            {...register("is_correct", { required: true })}
          />
          <label
            htmlFor="is_correct"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Fields already fill up
          </label>
        </div>
        <div>
          <button
            type="submit"
            form="infoForm"
            className={`w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:inline-flex sm:w-auto sm:items-center sm:gap-1 ${isLoading && "cursor-not-allowed bg-blue-400 hover:bg-blue-400"}`}
            disabled={isLoading}
          >
            <span> Confirm Voucher </span>
            {isLoading && <ImSpinner3 className="size-4 animate-spin" />}
          </button>
        </div>
      </div>
    </>
  );
};

export default VoucherInfo;
