import React from "react";

const ConvertedCodeBox = ({ convertedCode }) => {
  return (
    <div className="converted-code">
      <h2>Converted Code</h2>
      <textarea
        readOnly
        value={convertedCode}
        placeholder="Converted code will appear here..."
        rows={25}
        cols={60}
      />
    </div>
  );
};

export default ConvertedCodeBox;
