import { useParams } from "react-router-dom";
import useSWR from "swr";

import Breadcrumb from "../../../components/Breadcrumb";
import { fetcher } from "../../../services/voucher";
import VoucherCard from "../components/VoucherCard";

const VoucherUpdatePage = () => {
  const { vid } = useParams();

  const { data, isLoading, error } = useSWR(
    `${import.meta.env.VITE_AUTH_API_URL}/vouchers/${vid}`,
    fetcher,
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading voucher</div>;
  if (!data) return <div>No data available</div>;

  return (
    <section>
      <Breadcrumb
        currentPageTitle="Voucher Details"
        links={[{ title: "Vouchers", path: "/dashboard/vouchers" }]}
      />
      <VoucherCard {...data?.data} />
    </section>
  );
};

export default VoucherUpdatePage;
