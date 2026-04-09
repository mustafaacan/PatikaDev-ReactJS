export default function Footer({
  menuItems,
  selectedItem,
  setMenuItems,
  listItems,
  clearCompleted,
}) {
  const remainingItemCount = listItems.filter((item) => !item.completed).length;
  const hasCompletedItems = listItems.some((item) => item.completed);

  return (
    <div>
      <footer className="footer">
        <span className="todo-count">
          <strong>{remainingItemCount}</strong> item
          {remainingItemCount <= 1 ? "" : "s"} left
        </span>
        <ul className="filters">
          {menuItems.map((item) => (
            <li key={item}>
              <a
                href="/#"
                className={selectedItem === item ? "selected" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuItems(item);
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <button
          hidden={!hasCompletedItems}
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      </footer>
    </div>
  );
}
