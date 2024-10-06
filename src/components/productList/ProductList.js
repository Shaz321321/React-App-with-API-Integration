import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct } from "../../store/slices/productSlice";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export default function ProductList() {
    const products = useSelector(store => store.productSlice.products);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    const onClickDeleteProduct = (id) => {
        console.log("delete product id", id);
        dispatch(deleteProduct(id));
    };

    const onClickEditProduct = (product) => {
        // Navigate to /products and pass product details via state
        navigate("/products", { state: { productToEdit: product } });
    };

    return (
        <div>
            {products?.map(product => (
                <div key={product.id} style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ padding: 10 }}>
                        <img style={{ width: 100 }} src={product.image} alt={product.title} />
                    </div>
                    <div>
                        <h1>{product.title}</h1>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <button onClick={() => onClickDeleteProduct(product.id)}>Delete</button>
                        <button onClick={() => onClickEditProduct(product)}>Update</button> {/* Navigate to update */}
                        <hr />
                    </div>
                </div>
            ))}
        </div>
    );
}
