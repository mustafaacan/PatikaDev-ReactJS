// Component without props

function Header() {
  const fullName = "Mustafa Can"; // For component with variable
  const isLoggedIn = true; // Conditional Usage
  return (
    <div>
      <h1>HEADER COMPONENT</h1>
      <h2> {isLoggedIn ? `Welcome ${fullName}` : "Welcome User"} </h2>
    </div>
  );
}

export default Header;
