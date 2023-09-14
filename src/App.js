import React, { useState, useEffect } from 'react';
import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import apiRequest from './apiRequest';

function App() {
  const API_URL = 'http://localhost:3500/items';

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [newItem, setNewItem] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const fetchItems = async () => {
      try{
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Did not receive expected response')
        const listItems = await res.json();
        setItems(listItems);
        setFetchError(null);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }  
    }
    
      fetchItems();
    
  }, [])

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems)

    const postOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions);
    if (result) {
      setFetchError(result);
      setItems(items.filter((item) => item.id !== id));
    }
  }

  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems)

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checked: myItem[0].checked })
    }
    const result = await apiRequest(`${API_URL}/${id}`, updateOptions);
    if (result) setFetchError(result);

  }

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems)

    const deleteOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
    const result = await apiRequest(`${API_URL}/${id}`, deleteOptions);
    if (result) setFetchError(result);

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('')
  }

  return (
    <div className="App">
      <Header title={"Grocery List"} />
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
        />
      <SearchItem 
        search={search} 
        setSearch={setSearch}
        />
        <main>
        {isLoading && <p>Loading...</p>}
        {fetchError && <p style={{ color: 'red' }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content
        items={items.filter( item => item.item.toLowerCase().includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
         />}
        </main>
      <Footer length={items.length}/>
    </div>
  );
}

export default App;
