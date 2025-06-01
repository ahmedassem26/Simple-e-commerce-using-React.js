import { useState } from "react";
import numToArray from "../utils/numToArray";

function Menu({ categories, products, handleToggleAddToCart }) {
  const newCategories = [{ id: 0, name: "All" }, ...categories];

  //////////////States
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  ///////////Handlers
  function handleSelectCategory(id) {
    setSelectedCategoryId(id);
    setCurrentPage(1);
  }

  function handleSearch(e) {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  }

  function handleSelectPage(num) {
    setCurrentPage(num);
  }

  let filteredProducts = products.filter((p) => {
    const categoryFilter =
      selectedCategoryId === 0 || p.categoryId === selectedCategoryId;
    const searchFilter = p.name
      .toLocaleLowerCase()
      .includes(searchValue.toLocaleLowerCase());
    return categoryFilter && searchFilter;
  });

  //Pagination
  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentProducts = filteredProducts.slice(start, end);
  const pagesArr = numToArray(totalPages);

  return (
    <div id="menu" className="grid grid-cols-4 gap-2 mt-4">
      <div id="categories" className="col-span-1 ">
        <div className="flex flex-col rounded-xl overflow-clip">
          {newCategories.map((cat) => (
            <span
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className={`p-2 cursor-pointer mb-1 rounded-xl ${
                selectedCategoryId === cat.id
                  ? "bg-purple-700"
                  : "bg-purple-950"
              }`}
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>
      <div className="col-span-3 gap-2">
        <div
          id="search"
          className="bg-purple-950 mb-2 rounded-2xl p-4 flex gap-2  justify-around"
        >
          <input
            type="text"
            value={searchValue}
            onChange={handleSearch}
            placeholder="Search"
            className="input rounded-2xl w-full  hover:focus:outline-purple-600 hover:focus:border-purple-600 "
          />
        </div>
        <div
          id="menuItems"
          className=" flex flex-col justify-between p-4 bg-purple-950 rounded-2xl"
        >
          {currentProducts.length === 0 && (
            <h1>No items matched. try changing your search</h1>
          )}
          {currentProducts.map((prod) => (
            <div
              key={prod.id}
              className=" bg-purple-200 m-2 flex p-4 justify-between rounded-2xl text-purple-700"
            >
              <span className="font-bold">{prod.name} </span>
              <span className="font-bold">{prod.price} </span>
              <button
                onClick={() => handleToggleAddToCart(prod)}
                className={`btn btn-sm border-none ${
                  prod.isAddedToCart ? "bg-purple-900" : "bg-purple-700"
                }`}
              >
                {prod.isAddedToCart ? "Remove" : "Add to cart"}
              </button>
            </div>
          ))}
        </div>
        <div className="join flex justify-center mt-2 ">
          {pagesArr.map((num) => (
            <button
              onClick={() => handleSelectPage(num)}
              key={num}
              className={`join-item btn ${
                currentPage === num ? "btn-active bg-purple-700" : ""
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
