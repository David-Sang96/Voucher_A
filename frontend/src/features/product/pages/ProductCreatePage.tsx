import Breadcrumb from "../../../components/Breadcrumb";
import ProductCreateForm from "../components/ProductCreateForm";

const ProductCreatePage = () => {
  return (
    <section>
      <Breadcrumb
        currentPageTitle="Product Create"
        links={[{ title: "products", path: "/dashboard/products" }]}
      />
      <div className="rounded-md p-4 shadow-md md:w-3/5">
        <h1 className="font-semibold md:text-lg">Create New Product</h1>
        <p className="mb-7 mt-2 text-sm text-gray-500">
          Create a product and share it with your customers. Make sure to
          include all the important details!
        </p>
        <ProductCreateForm />
      </div>
    </section>
  );
};

export default ProductCreatePage;
