import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 26);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";

    if (charAllowed) str += "!@#$%^&*-_+={}[]~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGen();
  }, [length, numAllowed, charAllowed, passwordGen]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-white bg-gray-700">
        <h1 className="text-white text-center my-3 font-bold">
          Password Generetor
        </h1>
        <div className="flex shadow border-transparent outline-none rounded-full overflow-hidden mb-4 bg-slate-400">
          <input
            className="outline-none w-full py-1 px-3 border-none bg-transparent font-mono"
            type="text"
            value={password}
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
        </div>
        <div className="flex text-sm gap-x-7">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={8}
              max={25}
              value={length}
              className="cursor-pointer h-0.5"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-red-500">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label className="text-red-500">Number</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label className="text-red-500">Character</label>
          </div>
        </div>
        <div className="flex gap-2 justify-center mt-5 mb-1">
          <button
            onClick={copyToClipboard}
            className="text-white bg-red-500 py-1 px-3 outline-none border-none rounded-full shrink-0 hover:bg-red-800"
          >
            Copy
          </button>
          <button
            onClick={passwordGen}
            className="text-white bg-red-500 py-1 px-3 outline-none border-none rounded-full shrink-0 hover:bg-red-800"
          >
            Regenerate
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
