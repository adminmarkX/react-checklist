import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

function App() {
  const [items, setItems] = useState([]);

  // Add new item to the state this is an example of Lifting the state
  // from Form to the parent (App) components and then share it to
  // both other components
  function haddleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function haddleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={haddleAddItems} />
      <PackingList items={items} onDeleteItem={haddleDeleteItems} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Far away</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [num, setNum] = useState(1);

  // REMEBER THE iTEMS ARE ARRAY --UPDATE we uplifted the useState to the parent
  // const [items, setItems] = useState([]);
  // Add new item to the state

  // event Handler
  // the html passed the object called event and we block it from reloading
  function handleSubmit(event) {
    // we dont want the form to be reloaded
    event.preventDefault();

    if (!description) return;

    const newItem = { description, num, packed: false, id: Date.now() };

    // this is the props from the App components this updates
    // and gives the newItem to the parent one
    onAddItems(newItem);

    setDescription("");
    setNum(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip</h3>
      <select
        value={num}
        onChange={(e) => {
          setNum(e.target.value);
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num}>{num}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul style={{ overflow: "hidden" }}>
        {items.map((item) => (
          <Item item={item} onItemDelete={onDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onItemDelete }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.num} {item.description}
      </span>
      <button onClick={() => onItemDelete(item.id)}>"❌"</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on the list(X%)</em>
    </footer>
  );
}

export default App;
