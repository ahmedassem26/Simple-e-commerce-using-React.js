function CartItem(props) {
  return (
    <div className="cart-item bg-purple-200 m-2 flex p-4 justify-between rounded-2xl shadow-fuchsia-500">
      <span className="block ">{props.item.name} </span>
      <span className="block">{props.item.count} </span>
      <button
        className="btn btn-xs bg-purple-700 border-0"
        onClick={() => props.handleIncrement(props.item)}
      >
        +
      </button>
      <button
        className="btn btn-xs bg-purple-700 border-0"
        onClick={() => props.handleDecrement(props.item)}
      >
        -
      </button>
      <button
        onClick={() => props.handleRemoveItem(props.item)}
        className="btn btn-sm btn-primary bg-red-800 border-0"
      >
        Remove
      </button>
    </div>
  );
}

export default CartItem;
