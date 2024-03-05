import { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
    Badge,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import "./navbar.scss";

import links from "../../../links/links";

import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { ShoppingCartContext } from "../../../contexts/ShoppingCartContext";

const Navbar = () => {
    const [ openMenuDrawer, setOpenMenuDrawer ] = useState(false);
    const [ openCartDrawer, setOpenCartDrawer ] = useState(false);
    const [ purchaseSuccess, setPurchaseSuccess ] = useState(false);
    const { shoppingCart, removeProductFromCart, clearCart, processPurchase } = useContext(ShoppingCartContext);
    const [ cartItemsCount, setCartItemsCount ] = useState(0);
    const [ totalPrice, setTotalPrice ] = useState(0);

    useEffect(() => {
        const itemCount = shoppingCart.reduce((total, item) => total + item.amount, 0);
        setCartItemsCount(itemCount);

        const totalPrice = shoppingCart.reduce((total, item) => total + (item.amount * item.price), 0);
        setTotalPrice(totalPrice);
    }, [shoppingCart]);

    const handleOnClickOpenMenuDrawer = () => {
        setOpenMenuDrawer(true);
    };

    const handleOnClickCloseMenuDrawer = () => {
        setOpenMenuDrawer(false);
    };

    const handleOnClickOpenCartDrawer = () => {
        setOpenCartDrawer(true);
    };

    const handleOnClickCloseCartDrawer = () => {
        setOpenCartDrawer(false);
    };

    const handleProcessPurchase = () => {
        processPurchase();
        setPurchaseSuccess(true);
    };

    const handleClearCart = () => {
        clearCart();
    };

    return (
        <Box
            component="nav"
            className="navbar">
            <Box className="navbar__drawer-icon">
                <MenuIcon onClick={handleOnClickOpenMenuDrawer}/>
            </Box>

            <Box className="navbar__items">
                {links.map((link, index) => (
                    <Button
                        key={index}
                        component={NavLink}
                        to={link.url}>
                        {link.title}
                    </Button>
                ))}
            </Box>

            <Box className="navbar__shopping-cart">
                <IconButton onClick={handleOnClickOpenCartDrawer}>
                    <Badge
                        className="navbar__shopping-cart__icon-badge"
                        badgeContent={cartItemsCount}
                    >
                        <ShoppingCartOutlinedIcon/>
                    </Badge>
                </IconButton>
            </Box>

            <Drawer
                open={openMenuDrawer}
                anchor="left"
                onClose={handleOnClickCloseMenuDrawer}
            >
                <List>
                    {links.map((link, index) => (
                        <ListItem
                            key={index}
                            component={NavLink}
                            to={link.url}>
                            <ListItemButton onClick={handleOnClickCloseMenuDrawer}>
                                <ListItemIcon>{link.icon}</ListItemIcon>
                                <ListItemText>{link.title}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Drawer
                open={openCartDrawer}
                anchor="right"
                onClose={handleOnClickCloseCartDrawer}
                className="navbar__custom-drawer"
            >
                <List>
                    <ListItem className="navbar__drawer-header">
                        <ListItemText
                            primary="Productos en el carrito"
                            className="navbar__drawer-title"/>
                    </ListItem>
                    {shoppingCart.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={item.name}/>
                            <Typography variant="body2">{`Cantidad: ${item.amount}`}</Typography>
                            <Button onClick={() => removeProductFromCart(item.id)}>Eliminar</Button>
                        </ListItem>
                    ))}
                    <ListItem className="navbar__drawer-content">
                        <ListItemText
                            primary={`Total: $${totalPrice}`}
                            className="navbar__cart-total"/>
                    </ListItem>
                    <ListItem className="navbar__drawer-content">
                        <Button onClick={handleProcessPurchase}>Procesar compra</Button>
                        <Button onClick={handleClearCart}>Limpiar carrito</Button>
                    </ListItem>
                    {purchaseSuccess && (
                        <ListItem className="navbar__drawer-content">
                            {purchaseSuccess && (
                                <div className="purchase-success-message">¡Compra realizada con éxito! Redirigiendo a la página principal</div>
                            )}
                        </ListItem>
                    )}
                </List>
            </Drawer>
        </Box>
    );
};

export default Navbar;