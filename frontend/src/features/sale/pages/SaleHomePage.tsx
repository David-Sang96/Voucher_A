import Breadcrumb from "../../../components/Breadcrumb";
import UserInfoForm from "../../voucher/components/UserInfoForm";
import SaleForm from "../components/SaleForm";
import SaleTable from "../components/SaleTable";

const SaleHomePage = () => {
  return (
    <section>
      <Breadcrumb currentPageTitle="Sales" />
      <div className="grid grid-cols-4 gap-4 pb-6">
        <div className="col-span-3">
          <SaleForm />
          <SaleTable />
        </div>
        <div className="col-span-1 flex flex-col justify-between">
          <UserInfoForm />
        </div>
      </div>
    </section>
  );
};

export default SaleHomePage;
