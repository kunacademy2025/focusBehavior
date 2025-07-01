export const getOrderStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "text-amber-500";
    case "Error":
      return "text-red-600";
    case "Cancelled":
      return "text-red-950";
    case "Paid":
      return "text-green-600";
  }
};
