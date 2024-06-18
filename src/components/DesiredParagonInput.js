import React from "react";
import Select from "react-select";

const DesiredParagonInput = ({
  desiredParagon,
  handleDesiredParagonChange,
  options,
}) => {
  return (
    <div className="select-container">
      <Select
        styles={{
          option: (baseStyles, state) => {
            return {
              ...baseStyles,
              backgroundColor: state.isFocused ? "grey" : "darkgrey",
            };
          },
          control: (baseStyles, state) => {
            return {
              ...baseStyles,
              backgroundColor: state.isFocused ? "grey" : "darkgrey",
            };
          },
        }}
        value={options.find((option) => option.value === desiredParagon.type)}
        onChange={(selectedOption) =>
          handleDesiredParagonChange("type", selectedOption.value)
        }
        options={options}
        placeholder="Sélectionnez un paragon souhaité"
      />
    </div>
  );
};

export default DesiredParagonInput;
