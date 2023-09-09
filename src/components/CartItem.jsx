import React from "react";

const CartItem = ({ item, onBook, onRemove }) => {
  return (
    <tr>
      <td>{item.busId.name}</td>
      <td>{item.busId.from}</td>
      <td>{item.busId.to}</td>
      <td>{item.busId.price}</td>
      <td>{item.seatNo}</td>
      <td>
        <div className="action">
          <button className="book" onClick={onBook}>
            Book
          </button>
          <button className="cancel" onClick={onRemove}>
            Remove
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CartItem;
