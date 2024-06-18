import React from "react";
import Select from "react-select";

const ParagonInput = ({
  paragons,
  handleParagonChange,
  handleAddParagon,
  handleRemoveParagon,
  options,
}) => {
  return (
    <div>
      {paragons.map((paragon, index) => (
        <div key={index} className="paragon-item">
          <div className="select-container">
            <Select
              styles={{
                option: (baseStyles, state) => {
                  return {
                    ...baseStyles,
                    backgroundColor: state.isFocused ? "grey" : "darkgrey",
                  };
                },
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: state.isFocused ? "grey" : "darkgrey",
                }),
              }}
              value={options.find((option) => option.value === paragon.type)}
              onChange={(selectedOption) =>
                handleParagonChange(index, "type", selectedOption.value)
              }
              options={options}
              placeholder="Sélectionner un Paragon à échanger"
            />
          </div>
          <input
            className="quantity-input"
            type="number"
            value={paragon.quantity}
            onChange={(e) =>
              handleParagonChange(index, "quantity", e.target.value)
            }
            placeholder="Quantity"
            min="0"
          />
          <button onClick={() => handleRemoveParagon(index)}>Remove</button>
        </div>
      ))}
      <button className="bigbluebutton" onClick={handleAddParagon}>
        Ajouter un type de Paragon
      </button>
    </div>
  );
};

export default ParagonInput;
