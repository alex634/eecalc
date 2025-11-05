import Container from './components/Container.jsx';
import MathInput from './components/MathInput.jsx';
import Output from './components/Output.jsx';
import {useState, useEffect} from 'react';
import {parse} from './parser/parser.js';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [statusValue, setStatusValue] = useState("good");

  useEffect(() => {
    if (inputValue === "") {
      setOutputValue("");
      return;
    }

    try {
      setOutputValue(parse(inputValue));
      setStatusValue("good");
    } catch (err) {
      setStatusValue("bad");
    }

  }, [inputValue]);

  return (
    <div className="fixed h-screen w-screen m-0">
      <Container className="flex flex-col bg-slate-700 mx-auto max-w-6xl h-full">
          <MathInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          className="mt-[17vh] bg-slate-400 mx-20 text-2xl text-slate-900 rounded-2xl"/> 
          <Container className="flex justify-center items-center flex-1 h-full">
            
          <Output
            outputValue={(typeof outputValue === "number") ? outputValue.toPrecision(8).replace(/\.[0]*$/, "").replace(/(\d\.\d*[1-9])[0]*$/, "$1"): outputValue}
            className={`flex-col bg-slate-700 ${statusValue === "good" ? "text-slate-900" : "text-rose-500"} text-center text-7xl m-0`}/>
          </Container>
      </Container>
    </div>
  )
}

export default App
