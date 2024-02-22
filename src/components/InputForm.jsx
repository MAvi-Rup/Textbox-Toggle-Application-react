import React, { useState } from "react";
import TextBox from "./TextBox";

const InputForm = () => {
  const [numTextboxes, setNumTextboxes] = useState(0);
  const [selectedCount, setSelectedCount] = useState(0);
  const [positionsSelected, setPositionsSelected] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [checkBoxesChecked, setCheckBoxesChecked] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTextbox = () => {
    setNumTextboxes(parseInt(inputValue));
    setInputValue("");
    setCheckBoxesChecked((prevState) => {
      const newCheckBoxesChecked = [...prevState];
      for (let i = newCheckBoxesChecked.length; i < numTextboxes; i++) {
        newCheckBoxesChecked.push(false);
      }
      return newCheckBoxesChecked;
    });
  };

  const handleCheckboxChange = (index, change, value) => {
    setSelectedCount(selectedCount + change);

    if (change === 1) {
      setPositionsSelected([...positionsSelected, index]);
      setTotalValue(totalValue + parseInt(value));
    } else {
      setPositionsSelected(
        positionsSelected.filter((position) => position !== index)
      );
      setTotalValue(totalValue - parseInt(value));
    }

    setCheckBoxesChecked((prevState) => {
      const newState = [...prevState];
      newState[index] = !prevState[index];
      return newState;
    });
  };

  const handleSelectAll = () => {
    const allChecked = !checkBoxesChecked.every((checked) => checked);
    const newCheckBoxesChecked = Array(numTextboxes).fill(allChecked);
    setCheckBoxesChecked(newCheckBoxesChecked);

    setSelectedCount(allChecked ? numTextboxes : 0);

    const selectedIndexes = allChecked
      ? Array.from({ length: numTextboxes }, (_, i) => i)
      : [];
    setPositionsSelected(selectedIndexes);

    selectedIndexes.forEach((index) => {
      handleCheckboxChange(
        index,
        allChecked ? 1 : -1,
        document.getElementById(`textbox-${index}`).value
      );
    });
  };

  const handleReset = () => {
    setNumTextboxes(0);
    setSelectedCount(0);
    setPositionsSelected([]);
    setTotalValue(0);
    setCheckBoxesChecked([]);
  };

  return (
    <div>
      <div className="flex mb-4">
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Number of textboxes"
          className="border border-gray-400 rounded-md px-2 py-1 mr-2"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddTextbox}
        >
          Add Textbox
        </button>
      </div>
      {[...Array(numTextboxes)].map((_, index) => (
        <TextBox
          key={index}
          index={index}
          onCheckboxChange={handleCheckboxChange}
          isChecked={checkBoxesChecked[index] || false}
        />
      ))}
      <div>
        <p>
          Selected {selectedCount} items, their position is{" "}
          {positionsSelected.join(", ")} and Total Number is {totalValue}
        </p>
      </div>
      <div className="flex">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={handleSelectAll}
        >
          Select All
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default InputForm;
