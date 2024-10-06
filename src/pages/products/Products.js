import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AddProduct from '../../components/addProduct/AddProduct';

export default function Products() {
    const location = useLocation(); // Get the passed state (productToEdit)
    const productToEdit = location.state?.productToEdit; // Retrieve productToEdit from the state

    return (
        <div>
            <Link to={"/"}>Home</Link>
            {/* Pass isEditing and productToEdit to AddProduct */}
            <AddProduct isEditing={!!productToEdit} productToEdit={productToEdit} />
        </div>
    );
}
