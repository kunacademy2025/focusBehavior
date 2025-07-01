export const useCheckout = (price: number) => {
  let subtotal: number = Math.round(price);
  let tax: number = Math.round(0);
  let discount: number = Math.round(0);

  let total = Math.round(subtotal - discount + tax);

  return {
    subtotal,
    tax,
    total,
    discount,
  };
};

const getCurrentPrice = (amount: number, currency: any) => {
  if (!currency || !currency.code || !currency.exchange_rate) {
    throw new Error("Invalid currency object");
  }

  return currency.code.toLowerCase() !== "aed"
    ? amount * currency.exchange_rate
    : amount;
};

export const customStyles = (error: any) => ({
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: "0.5rem",
    border: error
      ? "2px solid #e53e3e"
      : state.isFocused
        ? "2px solid #be3a3d"
        : "1px solid #e5e7eb",
    boxShadow: "none",
    "&:hover": {
      border: "2px solid #be3a3d",
    },
    backgroundColor: "#f3f4f6",
    height: "2.6rem",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "rgb(190, 58, 61, 0.10)" : "white",
    color: state.isSelected ? "#be3a3d" : "black",
    borderBottom: !state.isSelected
      ? "1px solid #e0e0e0"
      : "1px solid rgb(190, 58, 61, 0.25)",
    "&:hover": {
      backgroundColor: !state.isSelected ? "#e5e7eb" : "#be3a3d",
      color: state.isSelected && "#fff",
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "black",
  }),
  menu: (provided: any) => ({
    ...provided,
    zIndex: 1000,
  }),
});
