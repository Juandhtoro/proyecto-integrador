// import PropTypes from "prop-types";
// import { Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
// import "./productCard.scss";

// import Button from "../button/Button";

// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import useProducts from "../../hooks/useProducts";

// import { NavLink } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
// import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";

// const ProductCard = (props) => {
//     const { product, setProducts, itIsOff } = props;
//     const { products, removeProduct } = useProducts();
//     const {
//         addProductCart,
//         decreaseProductCart,
//         getProductCart,
//         removeProductFromCart,
//         shoppingCart,
//     } = useContext(ShoppingCartContext);
//     const [ quantity, setQuantity ] = useState(0);
//     const [ showLowStockMessage, setShowLowStockMessage ] = useState(false);
//     const [ isMaxStockReached, setIsMaxStockReached ] = useState(false);

//     useEffect(() => {
//         if (products?.length > 0) {
//             setProducts(products);
//         }
//     }, [products]);

//     useEffect(() => {
//         const cartProduct = getProductCart(product.id);
//         if (cartProduct) {
//             setQuantity(cartProduct.amount);
//         } else {
//             setQuantity(0);
//         }
//     }, [ getProductCart, product.id, shoppingCart ]);

//     useEffect(() => {
//         setShowLowStockMessage(product.stock <= 5);
//         setIsMaxStockReached(quantity > product.stock);
//     }, [ product.stock, quantity ]);

//     const handleAddToCart = () => {
//         if (product.stock > 0 && !isMaxStockReached) {
//             addProductCart(product);
//             setQuantity((prevQuantity) => prevQuantity + 1);
//             const updatedProducts = products.map((p) => {
//                 if (p.id === product.id) {
//                     return { ...p, stock: p.stock - 1 };
//                 }
//                 return p;
//             });
//             setProducts(updatedProducts);
//         } else if (isMaxStockReached ) {
//             console.log("No puedes añadir más productos, el stock está agotado.");
//         }
//     };

//     const handleRemoveFromCart = () => {
//         if (quantity > 0) {
//             decreaseProductCart(product.id);
//             setQuantity((prevQuantity) => prevQuantity - 1);
//             const updatedProducts = products.map((p) => {
//                 if (p.id === product.id) {
//                     return { ...p, stock: p.stock + 1 };
//                 }
//                 return p;
//             });
//             setProducts(updatedProducts);
//         }
//     };

//     const handleRemoveProduct = () => {
//         removeProduct(product.id);
//         const cartProduct = getProductCart(product.id);
//         if (cartProduct) {
//             removeProductFromCart(product.id);
//             setQuantity(0);
//         }
//         localStorage.setItem("scrollPosition", window.pageYOffset.toString());
//         window.location.reload();
//     };

//     useEffect(() => {
//         const scrollPosition = localStorage.getItem("scrollPosition");
//         if (scrollPosition) {
//             window.scrollTo(0, parseInt(scrollPosition));
//             localStorage.removeItem("scrollPosition");
//         }
//     }, []);

//     return (
//         <Card className="product-card">
//             <Box className="product-card__floats">
//                 <Box>
//                     <IconButton
//                         component={NavLink}
//                         to={`/product/${product.id}`}
//                         state={{ product }}
//                     >
//                         <EditIcon/>
//                     </IconButton>
//                     <IconButton onClick={handleRemoveProduct}>
//                         <DeleteIcon/>
//                     </IconButton>
//                 </Box>
//             </Box>
//             <CardMedia
//                 component="img"
//                 className="product-card__image"
//                 image={product.image}
//                 alt={`Fotografía de ${product.name}`}
//             />
//             <CardContent className="product-card__content">
//                 <h4>{product.name}</h4>
//                 <p>
//                     <span>Descripción:</span> {product.description}
//                 </p>
//                 <p>
//                     <span>Marca:</span> {product.brand}
//                 </p>
//                 <p>
//                     <span>Tipo:</span> {product.type}
//                 </p>
//                 {!product.isPromotion && (
//                     <p>
//                         <span>Precio: $</span> {product.price}
//                     </p>
//                 )}
//                 {product.isPromotion && (
//                     <p>
//                         <span>Precio promocional: ${product.price - (product.price / 100) * itIsOff} </span>
//                         <span style={{ textDecoration: "line-through" }}> ${product.price}</span>
//                     </p>
//                 )}
//                 {product.isFreeShip && (
//                     <Typography
//                         variant="body2"
//                         color="error">
//                         ¡Envío gratuito!
//                     </Typography>
//                 )}
//                 {product.stock === 0 && (
//                     <Typography
//                         variant="body2"
//                         color="error">
//                         No hay stock disponible
//                     </Typography>
//                 )}
//                 {showLowStockMessage && product.stock > 0 && (
//                     <Typography
//                         variant="body2"
//                         color="error"
//                         className="blinking">
//                         ¡Quedan pocas unidades en stock!
//                     </Typography>
//                 )}
//             </CardContent>
//             {product.stock > 0 && (
//                 <CardActions className="product-card__actions">
//                     <Button
//                         color="danger"
//                         onClick={handleRemoveFromCart}
//                         disabled={quantity === 0}
//                     >
//                         <RemoveIcon/>
//                     </Button>
//                     <span>{quantity}</span>
//                     <Button
//                         onClick={handleAddToCart}
//                         disabled={isMaxStockReached}>
//                         <AddIcon/>
//                     </Button>
//                 </CardActions>
//             )}
//         </Card>
//     );
// };

// ProductCard.propTypes = {
//     product: PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         name: PropTypes.string.isRequired,
//         description: PropTypes.string.isRequired,
//         image: PropTypes.string.isRequired,
//         stock: PropTypes.number.isRequired,
//         price: PropTypes.number.isRequired,
//         isPromotion: PropTypes.bool.isRequired,
//         isFreeShip: PropTypes.bool.isRequired,
//         brand: PropTypes.string.isRequired,
//         type: PropTypes.string.isRequired,
//     }),
//     setProducts: PropTypes.func.isRequired,
//     itIsOff: PropTypes.number,
// };

// ProductCard.defaultProps = {
//     itIsOff: 0.0,
// };

// export default ProductCard;

import PropTypes from "prop-types";
import { Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import "./productCard.scss";

import Button from "../button/Button";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import useProducts from "../../hooks/useProducts";

const IMAGE_BASE_URL = "https://mitienda-juan.onrender.com/public/images/";

const ProductCard = (props) => {
    const { product, itIsOff } = props;
    const { addProductCart, decreaseProductCart, getProductCart, removeProductFromCart } = useContext(ShoppingCartContext);
    const [ quantity, setQuantity ] = useState(0);
    const [ showLowStockMessage, setShowLowStockMessage ] = useState(false);
    const [ isMaxStockReached, setIsMaxStockReached ] = useState(false);
    const { removeProduct } = useProducts();

    useEffect(() => {
        const cartProduct = getProductCart(product.id);
        if (cartProduct) {
            setQuantity(cartProduct.amount);
        } else {
            setQuantity(0);
        }
    }, [ getProductCart, product.id ]);

    useEffect(() => {
        setShowLowStockMessage(product.stock <= 5);
        setIsMaxStockReached(quantity >= product.stock);
    }, [ product.stock, quantity ]);

    const handleAddToCart = () => {
        if (product.stock > 0 && !isMaxStockReached) {
            addProductCart(product);
            setQuantity((prevQuantity) => prevQuantity + 1);
        } else if (isMaxStockReached) {
            console.log("No puedes añadir más productos, el stock está agotado.");
        }
    };

    const handleRemoveFromCart = () => {
        if (quantity > 0) {
            decreaseProductCart(product.id);
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const handleRemoveProduct = async () => {
        try {
            // Eliminar el producto primero
            await removeProduct(product.id);

            // Luego, actualizar el carrito
            removeProductFromCart(product.id);
            window.location.reload();
        } catch (error) {
            console.error("Error removing product:", error);
        }
    };

    // const handleRemoveProduct = () => {
    //     removeProductFromCart(product.id);
    //     removeProduct(product.id);
    //     console.log("Testing");
    // };

    return (
        <Card className="product-card">
            <Box className="product-card__floats">
                <Box>
                    <IconButton
                        component={NavLink}
                        to={`/product/${product.id}`}
                        state={{ product }}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton onClick={handleRemoveProduct}>
                        <DeleteIcon/>
                    </IconButton>
                </Box>
            </Box>
            <CardMedia
                component="img"
                className="product-card__image"
                image={`${IMAGE_BASE_URL}${product.imageFileName}`}
                alt={`Fotografía de ${product.name}`}
            />
            <CardContent className="product-card__content">
                <h4>{product.name}</h4>
                <p>
                    <span>Descripción:</span> {product.description}
                </p>
                <p>
                    <span>Marca:</span> {product.brand}
                </p>
                <p>
                    <span>Tipo:</span> {product.type}
                </p>
                {!product.isPromotion && (
                    <p>
                        <span>Precio: $</span> {product.price}
                    </p>
                )}
                {product.isPromotion && (
                    <p>
                        <span>Precio promocional: ${product.price - (product.price / 100) * itIsOff}</span>
                        <span style={{ textDecoration: "line-through" }}> ${product.price}</span>
                    </p>
                )}
                {product.isFreeShip && (
                    <Typography
                        variant="body2"
                        color="error">
                        ¡Envío gratuito!
                    </Typography>
                )}
                {product.stock === 0 && (
                    <Typography
                        variant="body2"
                        color="error">
                        No hay stock disponible
                    </Typography>
                )}
                {showLowStockMessage && product.stock > 0 && (
                    <Typography
                        variant="body2"
                        color="error"
                        className="blinking">
                        ¡Quedan pocas unidades en stock!
                    </Typography>
                )}
            </CardContent>
            {product.stock > 0 && (
                <CardActions className="product-card__actions">
                    <Button
                        color="danger"
                        onClick={handleRemoveFromCart}
                        disabled={quantity === 0}>
                        <RemoveIcon/>
                    </Button>
                    <span>{quantity}</span>
                    <Button
                        onClick={handleAddToCart}
                        disabled={isMaxStockReached}>
                        <AddIcon/>
                    </Button>
                </CardActions>
            )}
        </Card>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imageFileName: PropTypes.string.isRequired,
        stock: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        isPromotion: PropTypes.bool.isRequired,
        isFreeShip: PropTypes.bool.isRequired,
        brand: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    }),
    itIsOff: PropTypes.number,
};

ProductCard.defaultProps = {
    itIsOff: 0.0,
};

export default ProductCard;