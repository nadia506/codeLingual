import React from "react";
import Editor from "@monaco-editor/react";

const ConvertedCodeBox = ({ convertedCode }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <h2>Output</h2>
      <Editor
        height="300px"
        defaultLanguage="java"
        value={convertedCode}
        theme="vs-dark"
        options={{ readOnly: true }}
      />
    </div>
  );
};

export default ConvertedCodeBox;
