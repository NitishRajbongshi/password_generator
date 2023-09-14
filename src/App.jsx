import { useCallback, useEffect, useRef, useState } from "react";
function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState('');

  // use of useRef() hook
  // It is used when need to reference an element
  const passwordRef = useRef(null);

  // use the useCallback hook to generate the password
  const generatePassword = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (characterAllowed) str += '@#$%&!/*';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [numberAllowed, characterAllowed, length, setPassword]);


  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 41);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // calling the password generator when the dependencies change
  useEffect( () => {
    generatePassword()
  }, [numberAllowed, characterAllowed, length, generatePassword])
  return (
    <>
      <div className="container mx-auto w-full max-w-md bg-white rounded-md shadow-sm mt-2">
        <p className="p-2 text-xl font-bold bg-yellow-50 text-slate-600 text-center rounded-md">
          Password Generator
        </p>
        <div className="flex m-2 rounded-sm py-2">
          <input
            type="text"
            className="w-full border-2 outline-none px-2 py-1 rounded-s-md"
            value={password}
            placeholder="password" 
            readOnly 
            ref={passwordRef} />
          <button 
          onClick={copyToClipboard}
          className="bg-blue-100 text-blue-600 px-3 py-1 rounded-e-md font-bold">
            Copy
          </button>
        </div>

        <div className="flex gap-x-2 m-2 py-2">
          <div className="flex items-center justify-between">
            <input 
            type="range"
            value={length}
            className="cursor-pointer"
            min={8}
            max={40}
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label htmlFor="" className="text-slate-700 ps-1"> Length {length}</label>
          </div>
          <div className="flex items-center">
            <input 
            type="checkbox"
            defaultChecked={characterAllowed}
            className=""
            onChange={() => {setCharacterAllowed((prev) => !prev)}}
            />
            <label htmlFor="" className="text-slate-700 ps-1"> Character</label>
          </div>
          <div className="flex items-center">
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            className=""
            onChange={() => {setNumberAllowed((prev) => !prev)}}
            />
            <label htmlFor="" className="text-slate-700 ps-1"> Number</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
