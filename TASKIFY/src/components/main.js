import { useEffect, useRef, useState } from "react";
import ItemList from "./itemList";
import Footer from "./footer";

const FILTER_OPTIONS = ["All", "Active", "Completed"];

export default function Main() {
  const nextItemId = useRef(3);
  const [title, setTitle] = useState("");
  const [listItems, setListItems] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  function obtainItem(e) {
    setTitle(e.target.value);
  }

  function addNewItem(e) {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    setListItems([
      ...listItems,
      {
        id: nextItemId.current,
        label: title.trim(),
        completed: false,
      },
    ]);
    nextItemId.current += 1;
    setTitle("");
  }

  useEffect(() => {
    setSelectedFilter("All");
  }, [listItems]);

  function selectAll() {
    const areAllCompleted = listItems.every((item) => item.completed);

    // prevList is not a unique keyword !!! for the State usage, old value / list can be given as referance for new ops
    // so while defining the function, old value / list can be inserted with a keyword such oldList, prevList, oldValue
    // this usage an example to callback functions

    setListItems((prevList) =>
      prevList.map((item) => ({
        ...item,
        completed: !areAllCompleted,
      })),
    );
  }

  function clearCompleted() {
    setListItems((prevList) => prevList.filter((item) => !item.completed));
  }

  const filteredItems = listItems.filter((item) => {
    if (selectedFilter === "Active") {
      return !item.completed;
    }

    if (selectedFilter === "Completed") {
      return item.completed;
    }

    return true;
  });

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>Taskify</h1>
          <form onSubmit={addNewItem}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              value={title}
              onChange={obtainItem}
              maxLength={50}
            />
          </form>
        </header>

        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={
              listItems.length > 0 && listItems.every((item) => item.completed)
            }
            onChange={selectAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </section>
      </section>
      <ItemList list={filteredItems} adjustList={setListItems} />
      <Footer
        menuItems={FILTER_OPTIONS}
        selectedItem={selectedFilter}
        setMenuItems={setSelectedFilter}
        listItems={listItems}
        clearCompleted={clearCompleted}
      />
    </div>
  );
}
