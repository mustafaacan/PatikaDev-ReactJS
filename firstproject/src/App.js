import logo from "./logo.svg";
import Header from "./components/header";
import User from "./components/user";
import MultipleUser from "./components/multipleRender";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        {/* JS related keywords should be used between curly brackets*/}
        <User name="Mustafa Can" login={true} />
        <MultipleUser />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
