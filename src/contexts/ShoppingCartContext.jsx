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
                    const product = productResponse.data;
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
                    }
                }),
            );
            setShoppingCart([]);
        } catch (error) {
            console.error("Error processing purchase:", error);
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
                clearCart,
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