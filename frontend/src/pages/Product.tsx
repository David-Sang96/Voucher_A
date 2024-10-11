import ActionButton from "../components/ActionButton";
import Breadcrumb from "../components/Breadcrumb";
import ProductTable from "../components/ProductTable";

import { IoAddSharp } from "react-icons/io5";
import useSWR from "swr";
import Filter from "../components/Filter";

import ProductSearch from "../components/ProductSearch";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Product = () => {
  const { isLoading, data } = useSWR(
    `${import.meta.env.VITE_API_URL}/products`,
    fetcher,
  );

  return (
    <section>
      <Breadcrumb currentPageTitle="Products" />
      <div className="mb-3 flex items-center justify-between">
        <ProductSearch />
        <div className="flex items-center gap-3">
          <Filter />
          <ActionButton
            name=" Add new product "
            icon={<IoAddSharp className="text-lg" />}
            to="/product/create"
          />
        </div>
      </div>
      <ProductTable products={data} isLoading={isLoading} />
    </section>
  );
};

export default Product;
