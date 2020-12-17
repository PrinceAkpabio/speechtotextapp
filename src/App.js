import React, { useState, useEffect, useRef} from 'react';
import useSound from 'use-sound';
import Chime from './Assets/chime.wav';
import './Assets/styles/speechMain.css'


const App = () => {
  const [currentText, setCurrentText] = useState('');
  const [copy, setCopySuccess] = useState('Copy');
  
  // AUTOSAVE FEATURE W/ SESSION STORAGE
  const textRef = useRef(null);
  const textField = textRef.current;
  console.log(textField);

  useEffect(() => {
    if (sessionStorage.getItem('First')) {
      textField.value = sessionStorage.getItem('First');
    }
    // textField.addEventListener('change', () => {
    //   sessionStorage.setItem('First', textField.value)
    // })
  }, [textField])

  // CHANGE COPY SPAN TEXT
  useEffect(() => {
    const copyTimer = setTimeout(() => {
      if (copy === 'Copied') {
          setCopySuccess('Copy')
        }
    }, 2000)
    return () => clearTimeout(copyTimer)
  }, [copy])

  // Session Storage
  useEffect(() => {
    sessionStorage.setItem('First', currentText)
    // setCurrentText(sessionStorage.getItem('First'))
    
    // return () => sessionStorage.clear();
    
  }, [currentText])
  // HANDLE SPEECH CONVERSION
  const HandleSpeech = () => {
    fetch('/request', {
      method: 'POST',
      body: {
        content: true
      },
      headers: {
        "Content-type": "application/json"
      }
    }).then(res => res.json()).then(data => {
      const output = data
      setCurrentText(output.text)
    })
  }

  // SOUND FOR MICROPHONE
const [play] = useSound(Chime);
  console.log(currentText);
// MAKE TEXT FEILD EDITABLE
  const handleChange = (e) => {
    e.preventDefault()
    setCurrentText(e.target.value)
  }

// COPY AND PASTE FEATURE
  const handleCopy = (e) => {
    const selection = currentText;
    const Copied = navigator.clipboard.writeText(selection)

    if (Copied) {
      setCopySuccess('Copied')
    }
  }
  return (
    <div className="App">
      
      <h2 className='title'>Click the microphone and wait half a second before speaking: </h2>
      
      <span className='copy-container'
      >
      <i
        onClick={handleCopy}
        id='copy'
        className="far fa-copy" 
        >
          <span className='tooltip'>{copy}</span>
        </i>
      </span>
      <div className='speech-wrapper'>
        
        <textarea
          ref={textRef}
          type="text"
          onChange={handleChange} className='text'
          value={currentText}
        />
        <i
          id="mic"
          onClick={play}
          onMouseDown={HandleSpeech} className="fas fa-microphone-alt"
        ></i>

      </div>

    </div>
  );
}

export default App;
