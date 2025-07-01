import React from "react";
import { Text } from "rizzui";
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";
import { THEME_COLOR } from "@/config";
const animatedComponents = makeAnimated();

const customStyles = (error: any) => ({
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: "6px",
    border: error
      ? "1px solid #e53e3e"
      : state.isFocused
      ? `1px solid ${THEME_COLOR}`
      : "1px solid #efefef",
    boxShadow: "none",
    "&:hover": {
      border: `1px solid ${THEME_COLOR}`,
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "rgb(0, 179, 181, 0.10)" : "white",
    color: state.isSelected ? `${THEME_COLOR}` : "black",
    borderBottom: !state.isSelected
      ? "1px solid #efefef"
      : "1px solid rgb(0, 179, 181, 0.25)",
    "&:hover": {
      backgroundColor: !state.isSelected ? "#efefef" : `${THEME_COLOR}`,
      color: state.isSelected && "#fff",
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#4a5568",
  }),
  menu: (provided: any) => ({
    ...provided,
    zIndex: 1000,
  }),
});

const CustomMenu = (props: any) => {
  const { customComponent: CustomComponent } = props.selectProps;
  return (
    <components.Menu {...props}>
      {CustomComponent && (
        <div className="flex items-center justify-center p-2">
          <CustomComponent />
        </div>
      )}
      {props.children}
    </components.Menu>
  );
};

const ReactSelect = ({
  label,
  error,
  name,
  customComponent,
  ...props
}: any) => {
  return (
    <div className="flex flex-col gap-y-2 w-full">
      {label && <Text className="font-medium">{label}</Text>}
      <Select
        components={{ ...animatedComponents, Menu: CustomMenu }}
        isSearchable
        styles={customStyles(error)}
        className="outline-none"
        customComponent={customComponent}
        {...props}
      />
      {error && (
        <span className="-mt-1 text-[13px] font-medium text-red-600">
          {error}
        </span>
      )}
    </div>
  );
};

export default ReactSelect;
