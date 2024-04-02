// import { useEffect } from "react";
// import { Box } from "@mui/material";
// import PropTypes from "prop-types";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import "./productSearch.scss";

// import InputField from "../form/inputField/InputField.jsx";
// import Button from "../button/Button.jsx";

// import SearchIcon from "@mui/icons-material/Search";
// import ClearIcon from "@mui/icons-material/Clear";
// import useProducts from "../../hooks/useProducts.js";

// const ProductSearch = (props) => {
//     const { setProducts } = props;
//     const { products, searchProducts } = useProducts();

//     useEffect(() => {
//         setProducts(products);
//     }, [products]);

//     const validationSchema = yup.object({
//         text: yup
//             .string("Ingresa un texto")
//             .min(3, "Ingresa 3 o más caracteres"),
//     });

//     const formik = useFormik({
//         initialValues: {
//             text: "",
//         },
//         validationSchema: validationSchema,
//         onSubmit: (values) => {
//             const productsFound = searchProducts(values.text);
//             setProducts(productsFound);
//         },
//     });

//     const handleOnChange = (event) => {
//         formik.handleChange(event);

//         if (event.target.value.trim().length === 0) {
//             const productsFound = searchProducts(event.target.value);
//             setProducts(productsFound);
//         }
//     };

//     const handleClearSearch = () => {
//         formik.validateForm().then(() => {
//             formik.setFieldValue("text", "");
//             setProducts(products);
//         });
//     };

//     return (
//         <Box
//             component="form"
//             className="product-search"
//             noValidate
//             autoComplete="off"
//             onSubmit={formik.handleSubmit}>

//             <InputField
//                 name="text"
//                 value={formik.values.text}
//                 onChange={(event) => handleOnChange(event)}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.text && Boolean(formik.errors.text)}
//                 errorMessage={formik.touched.text && formik.errors.text}
//                 inputProps={{ maxLength: 10 }}
//             />

//             {formik.values.text && (
//                 <Button onClick={handleClearSearch}>
//                     <ClearIcon/>
//                 </Button>
//             )}

//             <Button type="submit"><SearchIcon/></Button>
//         </Box>
//     );
// };

// ProductSearch.propTypes = {
//     setProducts: PropTypes.func.isRequired,
// };

// export default ProductSearch;

import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";
import "./productSearch.scss";

import InputField from "../form/inputField/InputField.jsx";
import Button from "../button/Button.jsx";
import { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import useProducts from "../../hooks/useProducts.js";

const ProductSearch = (props) => {
    const { setProducts } = props;
    const { searchProducts } = useProducts();

    const validationSchema = yup.object({
        text: yup
            .string("Ingresa un texto")
            .min(3, "Ingresa 3 o más caracteres"),
    });

    const formik = useFormik({
        initialValues: {
            text: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSearch(values.text);
        },
    });

    const handleSearch = async (text) => {
        const productsFound = await searchProducts(text);
        setProducts(productsFound);
    };

    const handleClearSearch = async () => {
        formik.setFieldValue("text", "");
        const allProducts = await searchProducts(""); // Busca todos los productos
        setProducts(allProducts);
    };

    // Cargar todos los productos al inicio
    useEffect(() => {
        const fetchAllProducts = async () => {
            const allProducts = await searchProducts("");
            setProducts(allProducts);
        };

        fetchAllProducts();
    }, []);

    return (
        <Box
            component="form"
            className="product-search"
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}>

            <InputField
                name="text"
                value={formik.values.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.text && Boolean(formik.errors.text)}
                errorMessage={formik.touched.text && formik.errors.text}
                inputProps={{ maxLength: 10 }}
            />

            {formik.values.text && (
                <Button onClick={handleClearSearch}>
                    <ClearIcon/>
                </Button>
            )}

            <Button type="submit"><SearchIcon/></Button>
        </Box>
    );
};

ProductSearch.propTypes = {
    setProducts: PropTypes.func.isRequired,
};

export default ProductSearch;