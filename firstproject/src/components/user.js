// PROPS USAGE
// props between component exported for app.js
// you may find 2 usage options below.

import PropTypes from "prop-types";

/* Option 1 -- Usage with props keywords */
/* 
function User(props) {
  return (
    <h2>
      {props.name && props.login ? `Hello ${props.name}` : "Hello Unknown User"}
    </h2>
  );
}
*/

/* Option 2 -- Usage without props*/
function User({ name, login }) {
  if (typeof login !== "boolean") {
    console.error("login should be boolean");
  }

  return <h2>{login ? `Hello ${name}` : "Hello Unknown User"}</h2>;
}

// PROP PROPERTIES (propTypes)
// For wrong proptypes, you may see error on console log screen
// CAUTION : With React ver. 19 and higher, PropTypes usage wont be applicable / depricated for function components

User.propTypes = {
  name: PropTypes.string.isRequired,
  login: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
};

User.defaultProps = {
  name: "Mustafa Can",
};

export default User;
