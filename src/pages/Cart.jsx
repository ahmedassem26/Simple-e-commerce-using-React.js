import { useContext } from "react";
import CartItem from "../components/CartItem";
import { ProductsContext } from "../contexts/ProductsContext";
import { Link } from "react-router";

function Cart() {
  const { products, handleReset } = useContext(ProductsContext);

  const diplayedItems = products.filter((p) => p.isAddedToCart === true);
  return (
    <div className="flex flex-col justify-center bg-purple-950 p-4 rounded-2xl">
      {diplayedItems.map((item) => (
        <CartItem item={item} key={item.id} />
      ))}
      {diplayedItems.length > 0 && (
        <button
          className=" btn m-auto bg-purple-800 mt-2"
          onClick={handleReset}
        >
          Reset
        </button>
      )}
      {diplayedItems.length === 0 && (
        <>
          <h1 className="flex justify-center text-2xl">
            Cart is empty. Go shopping to add items!
          </h1>
          <Link to="/menu" className="btn m-auto bg-purple-800 mt-4">
            Go to Menu
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
