import ItemList from './ItemList';

const Content = ({ items, handleCheck, handleDelete }) => {


  return (
    <>
      {items.length ? (
        < ItemList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete} />
      ) : (
        <p className="empty">No items in your list</p>
      )}
    </>
  )
}

export default Content