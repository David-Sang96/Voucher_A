import ActionButton from "../components/ActionButton";
import Breadcrumb from "../components/Breadcrumb";
import ProductTable from "../components/ProductTable";

import { IoAddSharp } from "react-icons/io5";
import Filter from "../components/Filter";
import ProductSearch from "../components/ProductSearch";

const Product = () => {
  return (
    <section>
      <Breadcrumb currentPageTitle="products" />
      <div className="mb-3 mt-5 flex items-center justify-between">
        <ProductSearch />
        <div className="flex items-center gap-3">
          <Filter />
          <ActionButton
            name=" Add new product "
            icon={<IoAddSharp className="text-lg" />}
          />
        </div>
      </div>
      <ProductTable />
    </section>
  );
};

export default Product;
