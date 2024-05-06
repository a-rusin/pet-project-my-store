const ListItems = ({ items, onClickEdit, onClickDelete, onClickOpen, btnDisabled }) => {
  const name = (params) => {};

  return (
    <ul className="list-items">
      {items.map((item, index) => (
        <li className="list-item" key={item._id}>
          <div className="list-item-main-info">
            <div className="list-item-number">{index + 1}</div>
            <div className="list-item-name">{item.name}</div>
          </div>
          <div className="list-item-btns">
            {onClickEdit && <button className="list-item-btn list-item-btn-edit" onClick={() => onClickEdit(item._id)} disabled={btnDisabled}></button>}
            {onClickOpen && <button className="list-item-btn list-item-btn-open" onClick={() => onClickOpen(item._id)} disabled={btnDisabled}></button>}
            {onClickDelete && <button className="list-item-btn list-item-btn-delete" onClick={() => onClickDelete(item._id)} disabled={btnDisabled}></button>}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListItems;
