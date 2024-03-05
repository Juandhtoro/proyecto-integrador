import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import PropTypes from "prop-types";

const ShoppingCartContext = createContext();

const ShoppingCartProvider = (props) => {
    const { children } = props;
    const { items, setItem } = useLocalStorage({ shoppingCart: [], products: [] });
    const [ shoppingCart, setShoppingCart ] = useState(items.shoppingCart || []);
    const [ products, setProducts ] = useState(items.products || []);
    const [ purchaseSuccess, setPurchaseSuccess ] = useState(false);

    useEffect(() => {
        setShoppingCart(items.shoppingCart || []);
    }, [items.shoppingCart]);

    useEffect(() => {
        setProducts(items.products || []);
    }, [items.products]);

    const getProductCart = (id) => {
        return shoppingCart.find((item) => item.id === id);
    };

    const addProductCart = (product) => {
        const productQueEstaEnLS = getProductCart(product.id);
        const productEnStock = products.find((item) => item.id === product.id);

        if (productQueEstaEnLS && productEnStock && productEnStock.stock > productQueEstaEnLS.amount) {
            const updatedCart = shoppingCart.map((item) =>
                item.id === product.id ? { ...item, amount: item.amount + 1 } : item,
            );
            setShoppingCart(updatedCart);
            setItem("shoppingCart", updatedCart);
        } else if (!productQueEstaEnLS && productEnStock && productEnStock.stock > 0) {
            product.amount = 1;
            const updatedCart = [ ...shoppingCart, product ];
            setShoppingCart(updatedCart);
            setItem("shoppingCart", updatedCart);
        } else {
            console.log("No hay suficiente stock disponible.");
        }
    };

    const decreaseProductCart = (productId) => {
        const updatedCart = shoppingCart.map((item) =>
            item.id === productId ? { ...item, amount: Math.max(0, item.amount - 1) } : item,
        );
        setShoppingCart(updatedCart);
        setItem("shoppingCart", updatedCart);
    };

    const removeProductFromCart = (productId) => {
        const updatedCart = shoppingCart.filter((item) => item.id !== productId);
        setShoppingCart(updatedCart);
        setItem("shoppingCart", updatedCart);
    };

    const updateProductInCart = (updatedProduct) => {
        const updatedCart = shoppingCart.map((item) =>
            item.id === updatedProduct.id ? { ...item, ...updatedProduct } : item,
        );
        setShoppingCart(updatedCart);
        setItem("shoppingCart", updatedCart);
    };

    const clearCart = () => {
        setShoppingCart([]);
        setItem("shoppingCart", []);
    };

    const processPurchase = () => {
        const updatedProducts = products.map((product) => {
            const cartItem = getProductCart(product.id);
            if (cartItem) {
                return { ...product, stock: product.stock - cartItem.amount };
            }
            return product;
        });
        setProducts(updatedProducts);
        setItem("products", updatedProducts);
        clearCart();
        setPurchaseSuccess(true);
        setTimeout(() => {
            setPurchaseSuccess(false);
            window.location.reload();
        }, 3000);
    };

    return (
        <ShoppingCartContext.Provider
            value={{
                shoppingCart,
                getProductCart,
                addProductCart,
                decreaseProductCart,
                removeProductFromCart,
                updateProductInCart,
                clearCart,
                processPurchase,
                purchaseSuccess,
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