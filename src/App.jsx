import { useEffect, useRef } from 'react';
import './App.css'
import { useCallback, useState } from "react";

function App() {
  const [numAllowed, setNumAllowed] = useState(false)
  const [length, setLength] = useState(8)
  const [charsAllowed, setCharsAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef()

  const passwordGenerator = useCallback(()=> {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) {
      str += '0123456789'
    }
  
    if(charsAllowed) {
      str+= '@#$%&?'
    }
  
    for(let i =1; i<= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1 )
    
      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length,numAllowed,charsAllowed,])

  const copyToClipboard = useCallback(()=> {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,40)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=> {
    passwordGenerator()
  },[charsAllowed, numAllowed, passwordGenerator, length])

  

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={password}
          placeholder='password'
          readOnly
          ref={passwordRef}
          className='outline-none w-full py-1 px-3' />
          <button 
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-500'
          onClick={copyToClipboard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={40}
            className='cursor-pointer'
            onChange={(e)=> {setLength(e.target.value)}}
            value={length} />
            <label>
              Length : {length}
            </label>
          </div>
          <div className='flex items-center gap-x-1 hover:text-orange-300'>
            <input 
            type="checkbox"
            defaultChecked={numAllowed}
            id='numInput'
            onChange={()=>{setNumAllowed((prev)=> !prev)}} />
            <label htmlFor="numInput">
              Numbers
            </label>
          </div>
          <div className='flex items-center gap-x-1 hover:text-orange-300'>
            <input 
            type="checkbox"
            defaultChecked={charsAllowed}
            id='charInput'
            onChange={()=>{setCharsAllowed((prev)=> !prev)}} />
            <label htmlFor="charInput">
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
