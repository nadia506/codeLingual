import React, { useRef, useEffect } from "react";

const ConvertedCodeBox = ({ convertedCode }) => {
  return (
    <div
      className="converted-code"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2>Converted Code</h2>
      <textarea
        readOnly
        value={convertedCode}
        placeholder="Converted code will appear here..."
        rows={25}
        cols={55}
        style={{
          fontFamily:
            "'Fira Code', 'Monaco', 'Menlo', 'Consolas', 'Courier New', monospace",
          fontSize: "14px",
          backgroundColor: "#282c34", // Dark background color
          color: "#abb2bf", // Light text color
          lineHeight: "1.5",
          padding: "12px",
          width: "calc(100% - 24px)", // Adjust based on padding
          height: "auto", // Adjust based on content
          minHeight: "350px", // Minimum height
          boxSizing: "border-box",
          border: "1px solid #ccc",
          borderRadius: "4px",
          resize: "vertical",
          outline: "none", // Removes the default focus outline
          overflow: "auto", // Ensures scrollbar management
        }}
      />
    </div>
  );
};

export default ConvertedCodeBox;
