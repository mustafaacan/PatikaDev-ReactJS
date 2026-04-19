import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import User from "./components/user";
import Users from "./components/users";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";

// USED GUIDE LINK --> https://v5.reactrouter.com/web/guides/quick-start
// React Router v6+ uses <Routes> instead of <Switch>.

//CAUTION: Link is used instead of a tag. Because a tag refreshes the whole page once used, Link could change only necessary
// components without refreshing the page.

// Both Navlink and Link usage could be accepted. But Navlink provides more ability for styling

const url = "https://jsonplaceholder.typicode.com/users";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Error() {
  return <h2> This Page is not Found </h2>;
}

function App() {
  const location = useLocation();

  // We can also use external CSS by using activeClassName instead of style directly
  // isActive will be provided by Navlink
  // CAUTION: once selecting any user, style will be disappear since URL is change. To fix it
  // 1) we may use useLocation() hook and check the URL includes user or users
  // 2) we may use a nested url strategy so parent URL can be stay as /users

  const styling = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
    color: isActive ? "red" : "inherit",
  });

  const usersStyling = ({ isActive }) => ({
    fontWeight:
      isActive || location.pathname.startsWith("/user/") ? "bold" : "normal",
    color:
      isActive || location.pathname.startsWith("/user/") ? "red" : "inherit",
  });

  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" end style={styling}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" style={styling}>
              About
            </NavLink>
          </li>

          <li>
            <NavLink to="/users" style={usersStyling}>
              Users
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users URL={url} />} />
        <Route path="/user/:id" element={<User URL={url} />} />
        {/*For each URL except our defined ones, should be classified under 404 page so to catch them, use “*” */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}
