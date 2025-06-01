import { useContext } from "react";
import { ProductsContext } from "../contexts/ProductsContext";

function CartItem({ item }) {
  const { handleDecrement, handleIncrement, handleRemoveItem } =
    useContext(ProductsContext);
  return (
    <div className="cart-item bg-purple-200 m-2 flex p-4 justify-between rounded-2xl shadow-fuchsia-500">
      <span className="block ">{item.name} </span>
      <span className="block">{item.count} </span>
      <button
        className="btn btn-xs bg-purple-700 border-0"
        onClick={() => handleIncrement(item)}
      >
        +
      </button>
      <button
        className="btn btn-xs bg-purple-700 border-0"
        onClick={() => handleDecrement(item)}
      >
        -
      </button>
      <button
        onClick={() => handleRemoveItem(item)}
        className="btn btn-sm btn-primary bg-red-800 border-0"
      >
        Remove
      </button>
    </div>
  );
}

export default CartItem;
