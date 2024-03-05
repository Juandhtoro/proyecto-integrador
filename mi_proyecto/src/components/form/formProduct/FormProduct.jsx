import { useState, useContext } from "react";
import useProducts from "../../../hooks/useProducts.js";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { Box, MenuItem, Select } from "@mui/material";
import "./formProduct.scss";

import validationSchema from "./formProduct.validate.js";

import InputField from "../inputField/InputField";
import Button from "../../button/Button";
import Switch from "../switch/Switch.jsx";
import Alert from "../../alert/Alert.jsx";
import { ShoppingCartContext } from "../../../contexts/ShoppingCartContext";

const FormProduct = (props) => {
    const { initialValues } = props;
    const { createProduct, updateProduct } = useProducts();
    const { updateProductInCart } = useContext(ShoppingCartContext);
    const [ openAlert, setOpenAlert ] = useState(false);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (values.id) {
                updateProduct(values);
                updateProductInCart(values);
            } else {
                await createProduct(values);
                updateProductInCart(values);
            }
            setOpenAlert(true);

            setTimeout(() => {
                window.location.href = "/";
            }, 3000);
        },
    });

    const categoryOptions = [
        { value: "Ropa", label: "Ropa" },
        { value: "Accesorios", label: "Accesorios" },
        { value: "Tours", label: "Tours" },
    ];

    const typeOptions = [
        { value: "Importado", label: "Importado" },
        { value: "Nacional", label: "Nacional" },
    ];

    const brandOptions = [
        { value: "The North Face", label: "The North Face" },
        { value: "Columbia", label: "Columbia" },
        { value: "Decathlon", label: "Decathlon" },
        { value: "Merrell", label: "Merrell" },
    ];

    return (
        <Box
            component="form"
            className="form-product"
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}>

            <InputField
                label="Nombre"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                errorMessage={formik.touched.name && formik.errors.name}
                inputProps={{ maxLength: 25 }}>
            </InputField>

            <InputField
                label="Precio"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                errorMessage={formik.touched.price && formik.errors.price}
                inputProps={{ maxLength: 12 }}>
            </InputField>

            <InputField
                label="Stock"
                name="stock"
                value={formik.values.stock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.stock && Boolean(formik.errors.stock)}
                errorMessage={formik.touched.stock && formik.errors.stock}
                inputProps={{ maxLength: 6 }}>
            </InputField>

            <InputField
                label="Descripción"
                name="description"
                multiline
                rows={5}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                errorMessage={formik.touched.description && formik.errors.description}
                inputProps={{ maxLength: 150 }}/>

            <fieldset className="category-fieldset">
                <legend className="category-legend">Categoría:</legend>
                <Box className="category-field">
                    <Select
                        id="category"
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.category && Boolean(formik.errors.category)}
                        displayEmpty
                        className="category-select"
                    >
                        <MenuItem
                            value=""
                            disabled>
                Seleccione una categoría
                        </MenuItem>
                        {categoryOptions.map((option) => (
                            <MenuItem
                                key={option.value}
                                value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            </fieldset>

            <fieldset className="category-fieldset">
                <legend className="category-legend">Marca:</legend>
                <Box className="category-field">
                    <Select
                        id="brand"
                        name="brand"
                        value={formik.values.brand}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.brand && Boolean(formik.errors.brand)}
                        displayEmpty
                        className="category-select"
                    >
                        <MenuItem
                            value=""
                            disabled>
                Seleccione una categoría
                        </MenuItem>
                        {brandOptions.map((option) => (
                            <MenuItem
                                key={option.value}
                                value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            </fieldset>

            <fieldset className="category-fieldset">
                <legend className="category-legend">Tipo de producto:</legend>
                <Box className="category-field">
                    <Select
                        id="type"
                        name="type"
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.type && Boolean(formik.errors.type)}
                        displayEmpty
                        className="category-select"
                    >
                        <MenuItem
                            value=""
                            disabled>
                Seleccione una categoría
                        </MenuItem>
                        {typeOptions.map((option) => (
                            <MenuItem
                                key={option.value}
                                value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            </fieldset>

            <InputField
                label="Ruta de la imagen"
                name="image"
                value={formik.values.image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.image && Boolean(formik.errors.image)}
                errorMessage={formik.touched.image && formik.errors.image}
                inputProps={{ maxLength: 50 }}/>

            <Box
                className="form-product__image"
                component="img"
                src={formik.values.image}
                alt="Fotografía del producto"/>

            <Switch
                label="Está en promoción"
                name="isPromotion"
                value={formik.values.isPromotion}
                onChange={formik.handleChange}/>

            <Switch
                label="Envío gratuito"
                name="isFreeShip"
                value={formik.values.isFreeShip}
                onChange={formik.handleChange}/>

            <Button type="submit">Guardar</Button>
            <Button
                component={NavLink}
                to="/"
                type="button"
                color="danger">
                        Cancelar
            </Button>
            <Alert
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
                message="El producto se ha procesado correctamente"/>
        </Box>
    );
};

FormProduct.propTypes = {
    initialValues: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        stock: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        isPromotion: PropTypes.bool.isRequired,
        isFreeShip: PropTypes.bool.isRequired,
        category: PropTypes.string.isRequired,
        brand: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    }),
};

FormProduct.defaultProps = {
    initialValues: {
        name: "",
        description: "",
        image: "/images/home/products/default.jpg",
        stock: 0,
        price: 0,
        isPromotion: false,
        isFreeShip: false,
        category: "",
        brand: "",
        type: "",
    },
};

export default FormProduct;