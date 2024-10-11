import { TbFilterCancel } from "react-icons/tb";
import ActionButton from "../components/ActionButton";
import Breadcrumb from "../components/Breadcrumb";
import VoucherSearch from "../components/VoucherSearch";
import VoucherTable from "../components/VoucherTable";

const Voucher = () => {
  return (
    <section>
      <Breadcrumb currentPageTitle="Vouchers" />
      <div className="mb-5 font-bold">Vouchers List</div>
      <div className="mb-3 mt-5 flex items-center justify-between">
        <VoucherSearch />

        <ActionButton
          name=" Create Sale "
          icon={<TbFilterCancel className="text-lg" />}
          to="/sales"
        />
      </div>
      <VoucherTable />
    </section>
  );
};

export default Voucher;
