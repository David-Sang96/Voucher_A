import { FaUserTie } from "react-icons/fa";
import { HiTemplate } from "react-icons/hi";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdPointOfSale } from "react-icons/md";
import HomeCard from "../components/HomeCard";
import Logout from "../components/Logout";

const DashBoard = () => {
  return (
    <section>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <HomeCard
            name="Products"
            url="/dashboard/products"
            icon={<HiTemplate />}
          />
        </div>
        <div>
          <HomeCard
            name="Sales"
            url="/dashboard/sales"
            icon={<MdPointOfSale />}
          />
        </div>
        <div>
          <HomeCard
            name="Vouchers"
            url="/dashboard/voucher"
            icon={<LiaFileInvoiceSolid />}
          />
        </div>
        <div>
          <HomeCard
            name="Profile"
            url="/dashboard/user-profile"
            icon={<FaUserTie />}
          />
        </div>
      </div>
      <div className="mt-2 text-end">
        <Logout />
      </div>
    </section>
  );
};

export default DashBoard;
