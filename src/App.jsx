import { useCallback, useEffect, useState, useRef } from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [number, setnumber] = useState(false)
  const [charac, setcharac] = useState(false)
  const [pass, setpass] = useState("")
  const passRef = useRef(null);

  const pswdGen =  useCallback(() => {
      let pss = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if (number) {
        str += "0123456789"
      }
      if (charac) {
        str += "~!@#$%^&*()_+{}|:<>?[]\;',./-="
      }
      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length + 1)
        pss += str.charAt(char)
      }
      setpass(pss)
    }, [length, number, charac, setpass])

  const copyToClipboard= useCallback(()=>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(pass)
  },[pass])
    
  useEffect(()=>{
    pswdGen()},[length,number,charac,pswdGen])
  return (
    <>
      <div className="w-full max-w-md mx-auto rounded-lg px-4  py-3 my-8 bg-gray-700">
        <h1 className='text-white text-center my-3 text-xl underline'>Password Generator</h1>
        <div className='flex  shadow outline-none rounded-lg overflow-hidden mb-4 gap-2'>
          <input type="text" value={pass || ""} className="outline-none w-full py-1 px-3 rounded-lg placeholder:text-gray-500 shadow-inner" placeholder="password" readOnly ref={passRef} />
          <button onClick={copyToClipboard} className='outline-none text-white px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-600 transition duration-300 ease-in-out hover:scale-105 active:scale-95
            hover:shadow-lg'>copy</button>
        </div>

        <div className='flex text-sm gap-x-1'>
          <div className='flex items-center gap-x-1'>
            <input type='range' min={8} max={100}
              className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-pink-500
             [&::-webkit-slider-thumb]:appearance-none
             [&::-webkit-slider-thumb]:h-4
             [&::-webkit-slider-thumb]:w-4
             [&::-webkit-slider-thumb]:bg-blue-500
             [&::-webkit-slider-thumb]:rounded-full
             [&::-webkit-slider-thumb]:border-none"
              value={length}
              onChange={(e) => { setlength(e.target.value) }}></input>
            <label className='text-white'>length:{length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={number} id='numInput' onChange={() => {
              setnumber((prev) => !prev);
            }} className='accent-black' />
            <label className='text-white'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charac} id='numChar' onChange={() => {
              setcharac((prev) => !prev);
            }} className='accent-black' />
            <label className='text-white'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}
export default App
