import { useContext, useState } from "react";
import { ProductsContext } from "../contexts/ProductsContext";

const Admin = () => {
  const { products, categories, deleteProduct, editProduct, addProduct } =
    useContext(ProductsContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentProductId, setCurrentProductId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    categoryId: 1,
  });

  function getNewProductId() {
    const newId = Math.max(...products.map((p) => p.id), 0) + 1;
    return newId;
  }

  // Find category name by ID
  const getCategoryName = (id) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.name : "Unknown";
  };

  // Open modal for add or edit
  const openModal = (type, product = null) => {
    setModalType(type);
    if (type === "edit" && product) {
      setCurrentProductId(product.id);
      setFormData({
        name: product.name,
        price: product.price,
        categoryId: product.categoryId,
      });
    } else {
      setFormData({
        name: "",
        price: 0,
        categoryId: 1,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (modalType === "add") {
      addProduct({
        id: getNewProductId(),
        name: formData.name,
        price: formData.price,
        categoryId: formData.categoryId,
        count: 0,
        isAddedToCart: false,
      });
    } else {
      editProduct(currentProductId, {
        name: formData.name,
        price: formData.price,
        categoryId: formData.categoryId,
      });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Products Management</h1>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Header */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{getCategoryName(product.categoryId)}</td>
                <td>${product.price}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => openModal("edit", product)}
                    className="btn btn-sm btn-warning"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-sm bg-red-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Button */}
      <div className="mt-6">
        <button onClick={() => openModal("add")} className="btn bg-purple-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Add New Product
        </button>
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {modalType === "add" ? "Add New Product" : "Edit Product"}
            </h3>
            <div className="py-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Product name"
                  className="input input-bordered w-full"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  className="input input-bordered w-full"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  name="categoryId"
                  className="select select-bordered w-full"
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-action">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="btn btn-primary"
                disabled={!formData.name.trim()}
              >
                {modalType === "add" ? "Add" : "Update"} Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
