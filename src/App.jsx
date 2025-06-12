import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const countOtp = 6;
  const [inputBox, setInputBox] = useState(new Array(countOtp).fill(""));
  const [generatedOtp, setGeneratedOtp] = useState("");
  const refArr = useRef([]);

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handleOnchange = function (value, index) {
    if (isNaN(value)) return;
    const newVal = value.trim();
    const newArr = [...inputBox];
    newArr[index] = newVal.slice(-1);
    setInputBox(newArr);
    newVal && refArr.current[index + 1]?.focus();
  };

  const handleKeyDown = function (e, index) {
    if (!e.target.value && e.key === 'Backspace') {
      refArr.current[index - 1]?.focus();
    }
  };

  // Generate Random OTP (but don't autofill)
  const generateOtp = () => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    setInputBox(new Array(countOtp).fill(""));  // clear input boxes
    refArr.current[0]?.focus();
  };

  // Validate OTP
  const validateOtp = () => {
    const userOtp = inputBox.join("");
    const alertBox = document.createElement('div');
    if (userOtp === generatedOtp) {
      alertBox.innerText = 'Your OTP is Correct!';
      alertBox.className = 'custom-alert success';
    } else {
      alertBox.innerText = 'Your OTP is Incorrect!';
      alertBox.className = 'custom-alert error';
    }
    document.body.appendChild(alertBox);
    setTimeout(() => {
      document.body.removeChild(alertBox);
    }, 2000);
  };

  return (
    <>
      <h1>Validate OTP</h1>

      {generatedOtp && (
        <div className="generated-otp">
          <h3>Generated OTP: {generatedOtp}</h3>
          <p>(Please enter this OTP manually)</p>
        </div>
      )}

      <div className="otp-boxes">
        {inputBox.map((input, index) => (
          <input
            type="text"
            className="otp-box"
            key={index}
            value={inputBox[index]}
            ref={(input) => (refArr.current[index] = input)}
            onChange={(e) => handleOnchange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      <div className="otp-buttons">
        <button className="generate-btn" onClick={generateOtp}>
          Generate OTP
        </button>
        <button className="validate-btn" onClick={validateOtp}>
          Validate OTP
        </button>
      </div>
    </>
  );
}

export default App;
