export const urlToParamsObject = (url: string) => {
  const currentUrl = new URL(url);
  const searchParams = new URLSearchParams(currentUrl.search);
  return Object.fromEntries(searchParams.entries());
};
