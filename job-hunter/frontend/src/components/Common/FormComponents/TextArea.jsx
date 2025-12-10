import React from "react";

function TextArea({
  label,
  id,
  value,
  onChange,
  placeholder,
  isRequired,
  aiButton,
  description,
}) {
  return (
    <div>
      <label htmlFor={id} className="font-medium flex justify-between">
        <div className="flex items-center">
          {label}
          {isRequired && <span className="text-gray-500 ml-2">*</span>}
        </div>
        {aiButton && (
          <div className="flex justify-end">
            <span className="bg-primary-600 hover:bg-primary-700 w-36 py-1 px-1 text-xs text-white text-center rounded cursor-pointer transition-all duration-300">
              ✨ Generate using AI
            </span>
          </div>
        )}
      </label>
      {description && (
        <span className="text-gray-500 text-sm ml-1.5 ">{description}</span>
      )}
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows="5"
        cols="50"
        className="w-full p-2 rounded border border-gray-400 my-3"
        required={isRequired}
      ></textarea>
    </div>
  );
}

export default TextArea;
