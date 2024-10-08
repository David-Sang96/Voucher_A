import { HiTemplate } from "react-icons/hi";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdPointOfSale } from "react-icons/md";
import HomeCard from "../components/HomeCard";

const DashBoard = () => {
  return (
    <section>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        <div className="">
          <HomeCard name="Products" url="/products" icon={<HiTemplate />} />
        </div>
        <div className="">
          <HomeCard name="Sales" url="/sales" icon={<MdPointOfSale />} />
        </div>
        <div className="">
          <HomeCard
            name="Vouchers"
            url="/voucher"
            icon={<LiaFileInvoiceSolid />}
          />
        </div>
      </div>
    </section>
  );
};

export default DashBoard;
