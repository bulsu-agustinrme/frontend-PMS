import React from 'react';
import 'assets/customizedparking.css';

const CustomizedParking = () => {
  return (
    <div className="customized-container">
      {/* Top Header Section */}
      <div className="customized-header">
        <input
          className="parking-name-input"
          placeholder="ENTER PARKING NAME"
        />
      </div>

      {/* Editor Section */}
      <div className="parking-editor">
        <div className="slot-column">
          <div className="slot-label">A1</div>
          <div className="slot-label">A2</div>
          <div className="slot-label">A3</div>
          <button className="add-label-btn">ADD LABEL</button>
          <button className="add-slot-btn">ADD SLOT</button>
        </div>

        <div className="entry-exit-section">
          <div className="entry">
            <span className="circle" />
            <span className="entry-label">Entry</span>
          </div>

          <div className="exit">
            <span className="circle" />
            <span className="entry-label">Exit</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <button className="tool-btn">⭘</button>
        <button className="tool-btn">🗔</button>
        <button className="tool-btn">⟍</button>
        <button className="tool-btn">✔</button>
        <button className="tool-btn">⬤</button>
        <button className="tool-btn">T</button>
      </div>

      {/* Save Button */}
      <button className="save-btn">SAVE PARKING SPACE</button>
    </div>
  );
};

export default CustomizedParking;
