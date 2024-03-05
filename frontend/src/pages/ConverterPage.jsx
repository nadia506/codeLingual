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
  const [isLoading, setIsLoading] = useState(false);

  async function solveEquation(source, target, content) {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch(
        "https://codelingual-a447e65d1dbb.herokuapp.com/convert-code",
        {
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
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setConvertedCode(data.response[0]); // Assuming data.response[0] is the converted code
    } catch (error) {
      console.error("Failed to solve equation:", error);
      // Optionally, handle the error (e.g., set an error message in state)
    } finally {
      setIsLoading(false); // End loading regardless of outcome
    }
  }

  const handleConvert = async (sourceLanguage, targetLanguage, input) => {
    await solveEquation(sourceLanguage, targetLanguage, input);
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
            <option value="C++">C++</option>
          </select>
          <span>&#8594;</span>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="C">C</option>
            <option value="C++">C++</option>
          </select>
        </div>
        <button
          onClick={() => handleConvert(sourceLanguage, targetLanguage, input)}
        >
          Convert
        </button>
        {isLoading && (
          <div className="loading-indicator">
            <div className="loader"></div>
          </div>
        )}
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
