import React from "react";
import "./CustomAlert.css"; // Include your custom CSS styles

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert">
        <h3 style={{ color: "black" }} className="h3">
          {message}
        </h3>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CustomAlert;
