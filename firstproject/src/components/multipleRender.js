// Multiple render within one component
// used in app.js

// Do not forget the curly brackets before map function
// after map definiton, render is used between parantesis
// CAUTION : Each render should be unique so key attribute should be used.

function MultipleUser() {
  const userArr = ["Hacer", "Selin", "Mert"];
  return (
    <div>
      <h3> Multiple Render Users </h3>
      {userArr.map((user, index) => (
        <p key={index}> {user} </p>
      ))}
    </div>
  );
}

export default MultipleUser;
