import React from "react";

function SubmissionButton({ color, label, onClick, type, className }) {
  const buttonStyle = `p-2 px-4 font-medium text-sm rounded-md transition-all duration-300 ${
    color === "white"
      ? "bg-white text-primary-700 border-2 border-primary-500 hover:bg-primary-50"
      : "bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg"
  }`;

  return (
    <button type={type} onClick={onClick} className={buttonStyle}>
      {label}
    </button>
  );
}

export default SubmissionButton;
