// import { createContext, useEffect, useState } from "react";
// import useLocalStorage from "../hooks/useLocalStorage";
// import PropTypes from "prop-types";

// const ShoppingCartContext = createContext();

// const ShoppingCartProvider = (props) => {
//     const { children } = props;
//     const { items, setItem } = useLocalStorage({ shoppingCart: [], products: [] });
//     const [ shoppingCart, setShoppingCart ] = useState(items.shoppingCart || []);
//     const [ products, setProducts ] = useState(items.products || []);
//     const [ purchaseSuccess, setPurchaseSuccess ] = useState(false);

//     useEffect(() => {
//         setShoppingCart(items.shoppingCart || []);
//     }, [items.shoppingCart]);

//     useEffect(() => {
//         setProducts(items.products || []);
//     }, [items.products]);

//     const getProductCart = (id) => {
//         return shoppingCart.find((item) => item.id === id);
//     };

//     const addProductCart = (product) => {
//         setShoppingCart((prevCart) => {
//             const productQueEstaEnLS = getProductCart(product.id);
//             const productEnStock = products.find((item) => item.id === product.id);

//             if (productQueEstaEnLS && productEnStock && productEnStock.stock > productQueEstaEnLS.amount) {
//                 const updatedCart = prevCart.map((item) =>
//                     item.id === product.id ? { ...item, amount: item.amount + 1 } : item,
//                 );
//                 setItem("shoppingCart", updatedCart);
//                 return updatedCart;
//             } else if (!productQueEstaEnLS && productEnStock && productEnStock.stock > 0) {
//                 const updatedCart = [ ...prevCart, { ...product, amount: 1 }];
//                 setItem("shoppingCart", updatedCart);
//                 return updatedCart;
//             } else {
//                 console.log("No hay suficiente stock disponible.");
//                 return prevCart;
//             }
//         });
//     };

//     const decreaseProductCart = (productId) => {
//         setShoppingCart((prevCart) =>
//             prevCart.map((item) =>
//                 item.id === productId ? { ...item, amount: Math.max(0, item.amount - 1) } : item,
//             ),
//         );
//     };

//     const removeProductFromCart = (productId) => {
//         setShoppingCart((prevCart) => prevCart.filter((item) => item.id !== productId));
//     };

//     const updateProductInCart = (updatedProduct) => {
//         setShoppingCart((prevCart) =>
//             prevCart.map((item) => (item.id === updatedProduct.id ? { ...item, ...updatedProduct } : item)),
//         );
//     };

//     const clearCart = () => {
//         setShoppingCart([]);
//     };

//     const processPurchase = () => {
//         const updatedProducts = products.map((product) => {
//             const cartItem = getProductCart(product.id);
//             if (cartItem) {
//                 return { ...product, stock: product.stock - cartItem.amount };
//             }
//             return product;
//         });
//         setProducts(updatedProducts);
//         setItem("products", updatedProducts);
//         clearCart();
//         setPurchaseSuccess(true);
//         setTimeout(() => {
//             setPurchaseSuccess(false);
//             window.location.reload();
//         }, 3000);
//     };

//     return (
//         <ShoppingCartContext.Provider
//             value={{
//                 shoppingCart,
//                 getProductCart,
//                 addProductCart,
//                 decreaseProductCart,
//                 removeProductFromCart,
//                 updateProductInCart,
//                 clearCart,
//                 processPurchase,
//                 purchaseSuccess,
//             }}
//         >
//             {children}
//         </ShoppingCartContext.Provider>
//     );
// };

// ShoppingCartProvider.propTypes = {
//     children: PropTypes.node.isRequired,
// };

// export { ShoppingCartContext, ShoppingCartProvider };

import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const ShoppingCartContext = createContext();

const ShoppingCartProvider = (props) => {
    const { children } = props;
    const [ shoppingCart, setShoppingCart ] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
        setShoppingCart(storedCart);
    }, []);

    useEffect(() => {
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    }, [shoppingCart]);

    const getProductCart = (id) => {
        return shoppingCart.find((item) => item.id === id);
    };

    const addProductCart = (product) => {
        setShoppingCart((prevCart) => {
            const existingProduct = getProductCart(product.id);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, amount: item.amount + 1 } : item,
                );
            } else {
                return [ ...prevCart, { ...product, amount: 1 }];
            }
        });
    };

    const decreaseProductCart = (productId) => {
        setShoppingCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, amount: Math.max(0, item.amount - 1) } : item,
            ),
        );
    };

    const removeProductFromCart = (productId) => {
        setShoppingCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const clearCart = () => {
        setShoppingCart([]);
    };

    const processPurchase = async () => {
        try {
            await Promise.all(
                shoppingCart.map(async (cartItem) => {
                    const productResponse = await axios.get(
                        `https://mitienda-juan.onrender.com/api/products/${cartItem.id}`,
                    );
                    const product = productResponse.data; // Obtener los datos del producto desde la respuesta

                    // Verificar si product.stock es un número válido y cartItem.amount es un número válido
                    if (!isNaN(product.stock) && !isNaN(cartItem.amount)) {
                        const updatedStock = product.stock - cartItem.amount;
                        await axios.put(
                            `https://mitienda-juan.onrender.com/api/products/${cartItem.id}`,
                            { stock: updatedStock },
                        );
                    } else {
                        console.error(
                            "El valor de stock o cantidad no es un número válido:",
                            product.stock,
                            cartItem.amount,
                        );
                        // Manejar el error aquí si es necesario
                    }
                }),
            );
            setShoppingCart([]);
            // Aquí podrías establecer un estado para indicar que la compra fue exitosa si es necesario
            // También podrías redirigir al usuario a una página de confirmación de compra
        } catch (error) {
            console.error("Error processing purchase:", error);
            // Manejar el error aquí si es necesario
        }
    };

    return (
        <ShoppingCartContext.Provider
            value={{
                shoppingCart,
                getProductCart,
                addProductCart,
                decreaseProductCart,
                removeProductFromCart,
                processPurchase,
                clearCart, // Incluido clearCart en el contexto
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
};

ShoppingCartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { ShoppingCartContext, ShoppingCartProvider };