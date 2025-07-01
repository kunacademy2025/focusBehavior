export const getStrapiData = (item: any) => {
  return item?.data?.attributes || item?.attributes || item || {};
};
