import { useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const countOtp = 6;
  const [inputBox, setInputBox] = useState(new Array(countOtp).fill(""))
  const refArr = useRef([])
  useEffect(() => {
    refArr.current[0]?.focus()
  }, [])
  const handleOnchange = function (value, index) {
    if (isNaN(value)) return;
    console.log(value)
    const newVal = value.trim();
    const newArr = [...inputBox];
    newArr[index] = newVal.slice(-1);
    setInputBox(newArr)
    newVal && refArr.current[index + 1]?.focus()


  }
  const handleKeyDown = function (e, index) {
    console.log(e.key);
    if (!e.target.value && e.key === 'Backspace') {
      // console.log('back')
      refArr.current[index - 1]?.focus()

    }
  }

  return (
    <>
      <h1>Validate OTP</h1>
      {inputBox.map((input, index) => {
        return <input type="text" className='otp-box' key={index} value={inputBox[index]}
          ref={(input) => refArr.current[index] = input}
          onChange={(e) => handleOnchange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      })}

    </>
  )
}

export default App
