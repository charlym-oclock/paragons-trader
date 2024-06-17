import React from 'react';
import Select from 'react-select';

const ParagonList = ({ paragons, handleParagonChange, handleAddParagon, handleRemoveParagon, options }) => {
  return (
    <div>
      {paragons.map((paragon, index) => (
        <div key={index} className="paragon-item">
          <Select
            value={options.find(option => option.value === paragon.type)}
            onChange={(selectedOption) => handleParagonChange(index, 'type', selectedOption.value)}
            options={options}
            placeholder="Select Paragon"
          />
          <input
            type="number"
            value={paragon.quantity}
            onChange={(e) => handleParagonChange(index, 'quantity', e.target.value)}
            placeholder="Quantity"
            min="0"
          />
          <button onClick={() => handleRemoveParagon(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddParagon}>Add Paragon</button>
    </div>
  );
};

export default ParagonList;
