import React, { useState } from "react";
import Textbox from "./TextBox";

const InputForm = () => {
  const [numTextboxes, setNumTextboxes] = useState("");
  const [selectedCount, setSelectedCount] = useState(0);
  const [positionsSelected, setPositionsSelected] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [inputValues, setInputValues] = useState([]);
  const [checkBoxesChecked, setCheckBoxesChecked] = useState([]);
  const [number, setNumber] = useState("");

  const handleInputChange = (index, value) => {
    setInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  const handleCheckboxChange = (index, change) => {
    setSelectedCount((prevCount) => prevCount + change);

    if (change === 1) {
      setPositionsSelected((prevPositions) => [...prevPositions, index]);
      setTotalValue(
        (prevTotal) => prevTotal + parseInt(inputValues[index]) || 0
      );
    } else {
      setPositionsSelected((prevPositions) =>
        prevPositions.filter((pos) => pos !== index)
      );
      setTotalValue(
        (prevTotal) => prevTotal - parseInt(inputValues[index]) || 0
      );
    }

    setCheckBoxesChecked((prevState) => {
      const newState = [...prevState];
      newState[index] = !prevState[index];
      return newState;
    });
  };

  const handleAddTextbox = () => {
    setNumTextboxes(number);
    setNumber("");
    if (numTextboxes !== "") {
      setNumTextboxes("");
      setNumTextboxes((prevCount) => prevCount + 1);
      setCheckBoxesChecked((prevState) => [...prevState, false]);
      setInputValues((prevValues) => [...prevValues, ""]);
    }
  };

  const handleSelectAll = () => {
    const allChecked = !checkBoxesChecked.every((checked) => checked);
    setCheckBoxesChecked(Array(numTextboxes).fill(allChecked));

    const selectedIndexes = [];
    let newValue = 0;
    for (let i = 0; i < numTextboxes; i++) {
      handleCheckboxChange(i, allChecked ? 1 : -1);
      if (!allChecked) {
        newValue += parseInt(inputValues[i]) || 0;
        selectedIndexes.push(i);
      }
    }

    setSelectedCount(selectedIndexes.length);
    setTotalValue(newValue);
    setPositionsSelected(allChecked ? [] : selectedIndexes);
  };

  const handleReset = () => {
    setNumTextboxes("");
    setSelectedCount(0);
    setPositionsSelected([]);
    setTotalValue(0);
    setInputValues([]);
    setCheckBoxesChecked([]);
  };

  return (
    <div>
      <div className="flex mb-4">
        <label htmlFor="numberOfTextboxes" className="mr-2">
          No of Textboxes:
        </label>
        <input
          type="number"
          id="numberOfTextboxes"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
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

      {numTextboxes > 0 &&
        [...Array(parseInt(numTextboxes))].map((_, index) => (
          <Textbox
            key={index}
            index={index}
            value={inputValues[index] || ""}
            isChecked={checkBoxesChecked[index] || false}
            onInputChange={handleInputChange}
            onCheckboxChange={handleCheckboxChange}
          />
        ))}

      <div>
        {selectedCount === 0 ? (
          <p></p>
        ) : (
          <p>
            Output is: Selected {selectedCount} items, their position is{" "}
            {positionsSelected.join(", ")} and Total Number is {totalValue}
          </p>
        )}
      </div>
      <div className="flex">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 mt-2"
          onClick={handleSelectAll}
        >
          Select All
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default InputForm;
