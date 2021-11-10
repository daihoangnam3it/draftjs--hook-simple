import React from 'react';

const StyleButton = ({ value, handleStyle, active }) => {
  return (
    <button
      className={`btn ${active && 'active'}`}
      onMouseDown={(e) => handleStyle(e, value.value)}
    >
      {value.label}
    </button>
  );
};

export default StyleButton;
