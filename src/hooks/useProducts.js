import { useState, useEffect } from "react";
import axios from "axios";

const useProducts = () => {
    const [ products, setProducts ] = useState([]);
    const [ error, setError ] = useState(null);

    const backendUrl = "https://mitienda-juan.onrender.com/api/products/";

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(backendUrl);
                setProducts(response.data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError(error);
            }
        };

        fetchProducts();
    }, []);

    const searchProducts = async (text = "") => {
        try {
            const response = await axios.get(`${backendUrl}?search=${text}`);
            return response.data.data;
        } catch (error) {
            console.error("Error searching products:", error);
            throw error;
        }
    };

    const createProduct = async (values) => {
        try {
            console.log("Values to update:", values);
            const response = await axios.post(backendUrl, values);
            setProducts([ ...products, response.data.data ]);
        } catch (error) {
            console.error("Error creating product:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            }
        }
    };

    const updateProduct = async (values) => {
        try {
            const { _id, id, ...updatedValues } = values;

            const response = await axios.put(`${backendUrl}/${values.id}`, updatedValues);
            setProducts(products.map((product) => (product.id === values.id ? response.data.data : product)));
            return response.data;
        } catch (error) {
            console.error("Error updating product:", error);
            throw error;
        }
    };

    const removeProduct = async (productId) => {
        try {
            await axios.delete(`${backendUrl}/${productId}`);
            console.log(`${backendUrl}/${productId}`);
            setProducts((prevProducts) => {
                const updatedProducts = prevProducts.filter((product) => product.id !== productId);
                return updatedProducts;
            });
        } catch (error) {
            console.error("Error removing product:", error);
            throw error;
        }
    };

    return {
        products,
        error,
        searchProducts,
        createProduct,
        updateProduct,
        removeProduct,
    };
};

export default useProducts;