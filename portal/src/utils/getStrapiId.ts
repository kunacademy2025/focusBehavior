export const getStrapiId = (item: any) => {
  return item?.data?.id || item?.id || 0;
};
