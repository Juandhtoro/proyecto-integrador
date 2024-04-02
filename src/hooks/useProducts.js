// import useLocalStorage from "./useLocalStorage.js";
// import { useContext } from "react";
// import { ShoppingCartContext } from "../contexts/ShoppingCartContext";

// import { pizzas } from "../data/data.js";

// const useProducts = () => {
//     const { items, setItem } = useLocalStorage({ products: pizzas });
//     const { removeProductFromCart } = useContext(ShoppingCartContext);

//     const normalizeValue = (value = "") => {
//         return value
//             .toLowerCase()
//             .trim()
//             .replace("á", "a")
//             .replace("é", "e")
//             .replace("í", "i")
//             .replace("ó", "o")
//             .replace("ú", "u");
//     };

//     const searchProducts = (text) => {
//         const preparedText = normalizeValue(text);

//         return items.products.filter((pizza) => {
//             const preparedPizza = normalizeValue(pizza.name);

//             if (preparedText.length === 0 || preparedPizza.includes(preparedText)) {
//                 return pizza;
//             }
//         });
//     };

//     const generateId = () => {
//         let maxId = 0;

//         items.products.forEach((item) => {
//             if (item.id > maxId) {
//                 maxId = item.id;
//             }
//         });

//         return maxId + 1;
//     };

//     const createSchema = (values) => {
//         return {
//             id: values.id ?? generateId(),
//             name: values.name ?? "",
//             description: values.description ?? "",
//             image: values.image ?? "/images/home/products/img0001.jpg",
//             stock: Number(values.stock) ?? 0,
//             price: Number(values.price) ?? 0,
//             isPromotion: values.isPromotion ?? false,
//             isFreeShip: values.isFreeShip ?? false,
//             category: values.category ?? "",
//             brand: values.brand ?? "",
//             type: values.type ?? "",
//         };
//     };

//     const createProduct = (values) => {
//         setItem("products", [ ...items.products, createSchema(values) ]);
//     };

//     const updateProduct = (values) => {
//         const index = items.products.findIndex((item) => item.id === values.id);
//         const products = [...items.products];
//         products[index] = createSchema(values);
//         setItem("products", products);
//     };

//     const removeProduct = (id) => {
//         const productsWithoutThisProduct = items.products.filter((item) => item.id !== id);
//         setItem("products", productsWithoutThisProduct);
//         removeProductFromCart(id);
//     };

//     return {
//         products: items.products,
//         searchProducts,
//         createProduct,
//         updateProduct,
//         removeProduct,
//     };
// };

// export default useProducts;

import { useState, useEffect } from "react";
import axios from "axios";

const useProducts = () => {
    const [ products, setProducts ] = useState([]);
    // const [ response, setResponse ] = useState(null);
    const [ error, setError ] = useState(null); // Agregué el estado de error para manejar errores

    const backendUrl = "https://mitienda-juan.onrender.com/api/products/";

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(backendUrl);
                setProducts(response.data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError(error); // Setear el estado de error si ocurre un error al obtener los productos
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
            throw error; // Relanzar el error para que el componente que llama a esta función pueda manejarlo
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

    // const updateProduct = async (values) => {
    //     try {
    //         console.log("Values to update:", values); // Agregar este console.log
    //         const updatedValues = { ...values }; // Copiar todos los valores de 'values' a 'updatedValues'
    //         delete updatedValues._id; // Eliminar el campo _id de 'updatedValues'
    //         const response = await axios.put(`https://mitienda-juan.onrender.com/api/products/${values.id}`, updatedValues);
    //         setProducts(products.map((product) => (product.id === values ? response.data.data : product)));
    //     } catch (error) {
    //         console.error("Error updating product:", error);
    //     }
    // };

    const updateProduct = async (values) => {
        try {
            // Desestructurar id y _id sin asignarlos a ninguna variable
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
        // response,
        error,
        searchProducts,
        createProduct,
        updateProduct,
        removeProduct,
    };
};

export default useProducts;