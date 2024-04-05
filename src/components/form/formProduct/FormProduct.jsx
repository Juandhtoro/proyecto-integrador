import { useState, useEffect } from "react";
import useProducts from "../../../hooks/useProducts.js";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { Box, MenuItem, Select } from "@mui/material";
import "./formProduct.scss";
import axios from "axios";

import InputField from "../inputField/InputField";
import Button from "../../button/Button";
import Switch from "../switch/Switch.jsx";
import Alert from "../../alert/Alert.jsx";

const IMAGE_BASE_URL = "https://mitienda-juan.onrender.com/public/images/";

const FormProduct = (props) => {
    const { initialValues } = props;
    const { createProduct, updateProduct } = useProducts();
    const [ openAlert, setOpenAlert ] = useState(false);
    const [ currentImage, setCurrentImage ] = useState(initialValues.imageFileName);

    useEffect(() => {
        if (initialValues.id) {
            setCurrentImage(initialValues.imageFileName);
            formik.setValues(initialValues);
        }
    }, [initialValues]);

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: async (values) => {
            try {
                console.log("Valores del formulario:", values);
                if (values.id) {
                    await updateProduct(values);
                    console.log("Product updated successfully");
                } else {
                    await createProduct(values);
                    console.log("Product created successfully");
                }
                setOpenAlert(true);

                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            } catch (error) {
                console.error("Error:", error);
            }
        },
    });

    const handleImageChange = async (event) => {
        const imageFile = event.target.files[0];
        const formData = new FormData();
        formData.append("file", imageFile);

        try {
            const response = await axios.post("https://mitienda-juan.onrender.com/api/products/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const filename = response.data.data.filename;
            const imageUrl = `${IMAGE_BASE_URL}/${filename}`;
            setCurrentImage(imageUrl);
            formik.setFieldValue("imageFileName", imageUrl);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

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
            onSubmit={formik.handleSubmit}
        >
            <InputField
                label="Nombre"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                errorMessage={formik.touched.name && formik.errors.name}
                inputProps={{ maxLength: 25 }}
            />

            <Box className="form-product__image">
                <img
                    src={currentImage}
                    alt="Imagen del producto"
                    className="form-product__image--img"
                />
            </Box>

            <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleImageChange}
            />

            <InputField
                label="Precio"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                errorMessage={formik.touched.price && formik.errors.price}
                inputProps={{ maxLength: 12 }}
            />

            <InputField
                label="Stock"
                name="stock"
                value={formik.values.stock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.stock && Boolean(formik.errors.stock)}
                errorMessage={formik.touched.stock && formik.errors.stock}
                inputProps={{ maxLength: 6 }}
            />

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
                inputProps={{ maxLength: 150 }}
            />

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
                            Seleccione una marca
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
                            Seleccione un tipo de producto
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

            <Switch
                label="Está en promoción"
                name="isPromotion"
                value={formik.values.isPromotion}
                onChange={formik.handleChange}
            />

            <Switch
                label="Envío gratuito"
                name="isFreeShip"
                value={formik.values.isFreeShip}
                onChange={formik.handleChange}
            />

            <Button type="submit">Guardar</Button>
            <Button
                component={NavLink}
                to="/"
                type="button"
                color="danger"
            >
                Cancelar
            </Button>
            <Alert
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
                message="El producto se ha procesado correctamente"
            />
        </Box>
    );
};

FormProduct.propTypes = {
    initialValues: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imageFileName: PropTypes.string.isRequired,
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
        imageFileName: "https://mitienda-juan.onrender.com/public/images/default.jpg",
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