type SortParams = { sort_by: string; sort_direction: string };

export const sortByCategory = (
  val: string,
  category: string,
  setFetchUrl: (url: string) => void,
  setParams: (params: SortParams) => void,
) => {
  const directionMap: Record<string, SortParams> = {
    asc: { sort_by: "id", sort_direction: "asc" },
    desc: { sort_by: "id", sort_direction: "desc" },
    "Name (A To Z)": { sort_by: "product_name", sort_direction: "asc" },
    "Name (Z To A)": { sort_by: "product_name", sort_direction: "desc" },
    "Price (Low To High)": { sort_by: "price", sort_direction: "asc" },
    "Price (High To Low)": { sort_by: "price", sort_direction: "desc" },
    "CusName (A To Z)": { sort_by: "customer_name", sort_direction: "asc" },
    "CusName (Z To A)": { sort_by: "customer_name", sort_direction: "desc" },
  };

  const option = directionMap[val];
  if (option) {
    setFetchUrl(
      `${import.meta.env.VITE_AUTH_API_URL}/${category}?sort_by=${option.sort_by}&sort_direction=${option.sort_direction}`,
    );
    setParams(option);
  }
};
