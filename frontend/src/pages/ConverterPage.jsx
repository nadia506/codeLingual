import React, { useState, useEffect } from "react";
import "../styles/ConverterPage.css";
import CodeBox from "../components/CodeBox";
import ConvertedCodeBox from "../components/ConvertedCodeBox";

const ConverterPage = () => {
  const [sourceLanguage, setSourceLanguage] = useState("Python");
  const [targetLanguage, setTargetLanguage] = useState("Java");

  const [convertedCode, setConvertedCode] = useState("");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  async function solveEquation(source, target, content) {
    setIsLoading(true);
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
      setConvertedCode(data.response[0]);
    } catch (error) {
      console.error("Failed to solve equation:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleConvert = async (sourceLanguage, targetLanguage, input) => {
    await solveEquation(sourceLanguage, targetLanguage, input);
  };

  return (
    <div className="menu-background">
      <div className="header">
        <h1 className="title">CodeLingual</h1>
        <div className="sub-title">
          Welcome to <span className="highlight">CodeLingual</span> Code
          Converter!
        </div>
        <p className="description">
          Paste your code snippet below and translate it to your chosen
          language!
        </p>
      </div>
      <div className="language">
        <select
          value={sourceLanguage}
          onChange={(e) => setSourceLanguage(e.target.value)}
        >
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="C">C</option>
          <option value="C++">C++</option>
          <option value="Assembly">Assembly</option>
          <option value="Matlab">Matlab</option>
          <option value="R">R</option>
          <option value="Ruby">Ruby</option>
          <option value="Kotlin">Kotlin</option>
          <option value="Javascript+">Javascript</option>
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
          <option value="Assembly">Assembly</option>
          <option value="Matlab">Matlab</option>
          <option value="R">R</option>
          <option value="Ruby">Ruby</option>
          <option value="Kotlin">Kotlin</option>
          <option value="Javascript+">Javascript</option>
        </select>
      </div>
      {isLoading && (
        <div className="loading-indicator">
          <div className="loader"></div>
        </div>
      )}
      <div className={`code-container ${windowWidth <= 1200 ? "stacked" : ""}`}>
        <CodeBox setInput={setInput} />

        <ConvertedCodeBox convertedCode={convertedCode} />
      </div>
      <button
        className="button-convert"
        onClick={() => handleConvert(sourceLanguage, targetLanguage, input)}
      >
        Convert
      </button>
    </div>
  );
};

export default ConverterPage;
