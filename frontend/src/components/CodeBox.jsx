import React, { useState } from "react";

const CodeBox = ({ setInput }) => {
  const onChangeCode = (value) => {
    setInput(value);
  };

  return (
    <div
      className="code-box"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2>Paste Your Code</h2>
      <textarea
        onChange={(e) => onChangeCode(e.target.value)}
        placeholder="Paste your code here..."
        rows={25}
        cols={60}
      />
    </div>
  );
};

export default CodeBox;
