import React, { useState } from "react";
import "../styles/ConverterPage.css";
import CodeBox from "../components/CodeBox";
import ConvertedCodeBox from "../components/ConvertedCodeBox";

const ConverterPage = () => {
  const [sourceLanguage, setSourceLanguage] = useState("Python");
  const [targetLanguage, setTargetLanguage] = useState("Python");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [convertedCode, setConvertedCode] = useState("");
  const [input, setInput] = useState("");

  async function solveEquation(source, target, content) {
    try {
      const response = await fetch("http://127.0.0.1:5001/convert-code", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_code: content,
          source_language: source,
          target_language: target,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      return data.response[0];
    } catch (error) {
      console.error("Failed to solve equation:", error);
    }
  }

  const handleConvert = async (sourceLanguage, targetLanguage, input) => {
    const result = await solveEquation(sourceLanguage, targetLanguage, input);
    setConvertedCode(result); // Assuming result is the converted code you want to display
  };

  return (
    <div className="menu-background">
      <div className="header">
        <h1 className="title">CodeLingual</h1>
        <div className="sub-title">Welcome to CodeLingual Code Converter!</div>
        <p className="description">
          Paste your code snippet below and translate it to your chosen
          language!
        </p>
      </div>
      <div className="language">
        <div className="language">
          <select
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
          >
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="C">C</option>
          </select>
          <span>&#8594;</span>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="C">C</option>
          </select>
        </div>
        <button
          onClick={() => handleConvert(sourceLanguage, targetLanguage, input)}
        >
          convert
        </button>
      </div>
      <div className="code-container">
        <CodeBox setInput={setInput}></CodeBox>
        <div className="arrow-container">
          <div className="arrow">&#8594;</div>
        </div>
        <ConvertedCodeBox convertedCode={convertedCode}></ConvertedCodeBox>
      </div>
    </div>
  );
};

export default ConverterPage;
