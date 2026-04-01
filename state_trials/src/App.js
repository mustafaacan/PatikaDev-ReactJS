import "./App.css";
import FirstState from "./components/firstState";
import ArrayState from "./components/arrayState";
import ObjectState from "./components/objectState";
import CounterState from "./components/counter";
import InputState from "./components/stateForInputTag";

function App() {
  return (
    <div className="App">
      <FirstState />
      <hr />
      <ArrayState />
      <hr />
      <ObjectState />
      <hr />
      <CounterState />
      <hr />
      <InputState />
    </div>
  );
}

export default App;
