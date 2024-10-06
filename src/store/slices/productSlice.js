import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async () => {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        console.log("data in fetchProducts action", data);
        
        return data;
    }
);
//how to add update delete from API
// export const deleteProductApiAction = createAsyncThunk(
//     "product/deleteProduct",
//     async (id) => {
//         const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
//             method: "DELETE",
//         });
//         const data = await response.json();
//         console.log("data in deleteProduct action", data);
//         return data;
//     });

// export const addProduct = createAsyncThunk(
//     "product/addProduct",
//     async (product) => {
//         const response = await fetch("https://fakestoreapi.com/products", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(product),
//         });
//         const data = await response.json();
//         console.log("data in addProduct action", data);
//         return data;
//     });

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
    },
    reducers: {
        deleteProduct: (state, action) => {
            let id = action.payload;
            console.log("id in deleteProduct", id);
            let filteredProducts = state.products.filter(product => product.id !== id);
            state.products = filteredProducts;
        },

        addProduct: (state, action) => {
            console.log("action in addProduct", action.payload);
            state.products = [action.payload,...state.products];
        },
        updatedProduct: (state, action) => {
            const updatedProduct = action.payload; // The updated product details
            console.log("Updated product in updateProduct", updatedProduct);
        
            // Filter out the product with the same id
            const filteredProducts = state.products.filter(product => product.id !== updatedProduct.id);
        
            // Add the updated product to the filtered list
            state.products = [updatedProduct, ...filteredProducts]; // This will place the updated product at the start
        },
        
       
    },
    extraReducers: builder => {
           
            builder.addCase(fetchProducts.fulfilled, (state, action) => {
                console.log("fetch products in reducer", action.payload);
                
                state.products = action.payload;
            },)
            // how to update add or delete from API
            // builder.addCase(deleteProductApiAction.fulfilled, (state, action) => {
            //     console.log("delete product in reducer", action.payload);
            //     let id = action.payload.id;
            //     let filteredProducts = state.products.filter(product => product.id !== id);
            //     state.products = filteredProducts;
            // },)

            // builder.addCase(addProduct.fulfilled, (state, action) => {
            //     console.log("add product in reducer", action.payload);
            //     state.products = [action.payload, ...state.products];
            // },)
            
          }
        
});


export const { deleteProduct, addProduct, updatedProduct } = productSlice.actions;
export default productSlice.reducer;