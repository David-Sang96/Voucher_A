import { useParams } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb";
import ProductUpdateForm from "../components/ProductUpdateForm";

const ProductUpdatePage = () => {
  const { pid } = useParams();

  return (
    <section>
      <Breadcrumb
        currentPageTitle="Product Update"
        links={[{ title: "products", path: "/dashboard/products" }]}
      />
      <div className="rounded-md p-4 shadow-md md:w-3/5">
        <h1 className="font-semibold md:text-lg">Update Product</h1>
        <p className="mb-7 mt-2 text-sm text-gray-500">
          Update a product and share it with your customers. Make sure to
          include all the important details!
        </p>
        <ProductUpdateForm pid={pid as string} />
      </div>
    </section>
  );
};

export default ProductUpdatePage;
