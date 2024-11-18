type SortParams = { sort_by: string; sort_direction: string };

export const sortByCategory = (
  val: string,
  module: string,
  limit: string,
  setFetchUrl: (url: string) => void,
  setParams: (params: SortParams) => void,
) => {
  const directionMap: Record<string, SortParams> = {
    asc: { sort_by: "id", sort_direction: "asc" },
    desc: { sort_by: "id", sort_direction: "desc" },
    "Voucher_Id Asc": { sort_by: "id", sort_direction: "asc" },
    "Voucher_Id Desc": { sort_by: "id", sort_direction: "desc" },
    "Tax (Low To High)": { sort_by: "tax", sort_direction: "asc" },
    "Tax (High To Low)": { sort_by: "tax", sort_direction: "desc" },
    "Total (Low To High)": { sort_by: "total", sort_direction: "asc" },
    "Total (High To Low)": { sort_by: "total", sort_direction: "desc" },
    "Name (A To Z)": {
      sort_by: "product_name",
      sort_direction: "asc",
    },
    "Name (Z To A)": {
      sort_by: "product_name",
      sort_direction: "desc",
    },
    "Price (Low To High)": {
      sort_by: "price",
      sort_direction: "asc",
    },
    "Price (High To Low)": {
      sort_by: "price",
      sort_direction: "desc",
    },
    "CusName (A To Z)": {
      sort_by: "customer_name",
      sort_direction: "asc",
    },
    "CusName (Z To A)": {
      sort_by: "customer_name",
      sort_direction: "desc",
    },
  };

  const option = directionMap[val];
  if (option) {
    const params = { ...option, limit };
    setFetchUrl(
      `${import.meta.env.VITE_AUTH_API_URL}/${module}?sort_by=${params.sort_by}&sort_direction=${params.sort_direction}&limit=${params.limit}`,
    );
    setParams(params);
  }
};
