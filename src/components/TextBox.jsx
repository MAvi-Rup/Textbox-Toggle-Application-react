import React from "react";

const Textbox = ({
  index,
  value,
  isChecked,
  onInputChange,
  onCheckboxChange,
}) => {
  return (
    <div className="mt-4 flex items-center">
      <input
        type="number"
        value={value}
        onChange={(e) => onInputChange(index, e.target.value)}
        className="border border-gray-400 rounded-md px-2 py-1 mr-2"
      />
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onCheckboxChange(index, isChecked ? -1 : 1)}
        className="form-checkbox h-6 w-6 text-blue-500"
      />
    </div>
  );
};

export default Textbox;
