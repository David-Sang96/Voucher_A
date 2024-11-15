import { FaUserTie } from "react-icons/fa";
import { HiTemplate } from "react-icons/hi";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdPointOfSale } from "react-icons/md";

import LogoutBtn from "../../../components/LogoutBtn";
import ModuleBtn from "../components/ModuleBtn";

const DashboardPage = () => {
  return (
    <section>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <ModuleBtn
            name="Products"
            url="/dashboard/products"
            icon={<HiTemplate />}
          />
        </div>
        <div>
          <ModuleBtn
            name="Sales"
            url="/dashboard/sales"
            icon={<MdPointOfSale />}
          />
        </div>
        <div>
          <ModuleBtn
            name="Vouchers"
            url="/dashboard/voucher"
            icon={<LiaFileInvoiceSolid />}
          />
        </div>
        <div>
          <ModuleBtn
            name="Profile"
            url="/dashboard/user-profile"
            icon={<FaUserTie />}
          />
        </div>
      </div>
      <div className="mt-2 text-end">
        <LogoutBtn />
      </div>
    </section>
  );
};

export default DashboardPage;
