import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, updatedProduct } from '../../store/slices/productSlice';

export default function AddProduct({ isEditing, productToEdit }) {
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg");

    useEffect(() => {
        if (isEditing && productToEdit) {
            setTitle(productToEdit.title);
            setPrice(productToEdit.price);
            setDescription(productToEdit.description);
            setCategory(productToEdit.category);
            setImage(productToEdit.image);
        }
    }, [isEditing, productToEdit]);

    const handleSubmit = () => {
        let product = { title, price, description, image, category };

        if (isEditing) {
            dispatch(updatedProduct({ ...product, id: productToEdit.id }));
        } else {
            dispatch(addProduct(product));
        }

        // Clear input fields after submission
        setTitle("");
        setPrice("");
        setDescription("");
        setCategory("");
        setImage("https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg");
    };

    return (
      <div className="form-container">
      <h1>{isEditing ? "Update a Product" : "Add a Product"}</h1>
      <input
          className="form-input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
      />
      <input
          className="form-input"
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
      />
      <input
          className="form-input"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
      />
      <input
          className="form-input"
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
      />
      <div className="form-button">
          <button onClick={handleSubmit}>
              {isEditing ? "Update Product" : "Add Product"}
          </button>
      </div>
  </div>
  
    );
}
