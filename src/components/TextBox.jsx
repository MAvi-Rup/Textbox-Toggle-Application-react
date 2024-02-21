import React, { useState } from "react";

const TextBox = ({ index, onCheckboxChange, isChecked }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCheckboxChange = () => {
    onCheckboxChange(index, isChecked ? -1 : 1, inputValue);
  };

  return (
    <div className="mt-4 flex items-center">
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        className="border border-gray-400 rounded-md px-2 py-1 mr-2"
      />
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="form-checkbox h-6 w-6 text-blue-500"
      />
    </div>
  );
};

export default TextBox;
