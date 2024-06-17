import React from 'react';
import Select from 'react-select';

const DesiredParagonInput = ({ desiredParagons, handleDesiredParagonChange, handleAddDesiredParagon, handleRemoveDesiredParagon, options }) => {
  return (
    <div>
      {desiredParagons.map((paragon, index) => (
        <div key={index} className="paragon-item">
          <div className="select-container">
            <Select
              value={options.find(option => option.value === paragon.type)}
              onChange={(selectedOption) => handleDesiredParagonChange(index, 'type', selectedOption.value)}
              options={options}
              placeholder="Select Desired Paragon"
            />
          </div>
          <button onClick={() => handleRemoveDesiredParagon(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddDesiredParagon}>Add Desired Paragon</button>
    </div>
  );
};

export default DesiredParagonInput;
