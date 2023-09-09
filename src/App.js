import React, { useState } from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

function App() {
  const [items, setItems] = useState([
    {
      id: 1,
      checked: false,
      item: 'Coco covered Almonds'
    },
    {
      id: 2,
      checked: true,
      item: 'Peanut Butter'
    },
    {
      id: 3,
      checked: false,
      item: 'Bananas'
    }
  ]);

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item);

    setItems(listItems)
    localStorage.setItem('shoppinglist', JSON.stringify(listItems))
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems)
    localStorage.setItem('shoppinglist', JSON.stringify(listItems))
  }


  return (
    <div className="App">
      <Header title={"Grocery List"} />
      <Content
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
         />
      <Footer length={items.length}/>
    </div>
  );
}

export default App;
