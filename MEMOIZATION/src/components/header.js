/*Assume that we are using sub components within a main component and within the main component, using states structure. 
In each changes, sub components also will be re-rendered. To avoid, we can use React.memo
However, if we need to use any props or similar structure, re-render issue also can be seen.
shortly, by using React.memo and if there is no any change on sub component, re-render can be ignored */

import React from "react";

function Header({ num }) {
  console.log("Rendered"); // check for render
  // Until 5, we wont see any re-render
  return (
    <div>
      <h1>HEADER - {num}</h1>
    </div>
  );
}

export default React.memo(Header);
