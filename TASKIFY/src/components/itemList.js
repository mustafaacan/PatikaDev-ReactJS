export default function ItemList({ list, adjustList }) {
  function updateItem(itemId) {
    adjustList((prevList) =>
      prevList.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item,
      ),
    );
  }

  function removeItem(itemId) {
    adjustList((prevList) =>
      prevList.filter((item) => item.id !== itemId),
    );
  }

  return (
    <div>
      <ul className="todo-list">
        {list.map((item) => {
          return (
            <li
              key={item.id}
              className={item.completed ? "completed" : undefined}
            >
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => updateItem(item.id)}
                />
                <label>{item.label}</label>
                <button
                  className="destroy"
                  onClick={() => removeItem(item.id)}
                ></button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
