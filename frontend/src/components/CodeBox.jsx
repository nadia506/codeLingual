import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeBox = ({ setInput }) => {
  const [code, setCode] = useState("");

  const handleEditorChange = (value) => {
    setCode(value);
    setInput(value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <h2>Source Code</h2>
      <Editor
        height="300px"
        defaultLanguage="python"
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
      />
    </div>
  );
};

export default CodeBox;
