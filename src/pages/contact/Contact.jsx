// import { useState } from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { Box } from "@mui/material";
// import "./contact.scss";

// import {
//     MESSAGE_REQUIRED,
//     MESSAGE_TELEPHONE_INVALID,
//     MESSAGE_EMAIL_INVALID,
//     REGEX_TELEPHONE,
//     REGEX_EMAIL,
// } from "../../constanst/regexPattern.js";

// import InputField from "../../components/form/inputField/InputField";
// import Button from "../../components/button/Button";

// import PlaceIcon from "@mui/icons-material/Place";
// import PhoneIcon from "@mui/icons-material/Phone";
// import MailIcon from "@mui/icons-material/Mail";
// import Alert from "../../components/alert/Alert.jsx";

// const Contact = () => {
//     const [ openAlert, setOpenAlert ] = useState(false);

//     const validationSchema = yup.object({
//         fullname: yup
//             .string("Ingresa tu nombre y apellido")
//             .min(7, "Ingresa un nombre y apellido que tenga mas de 7 carateres")
//             .required(MESSAGE_REQUIRED),
//         telephone: yup
//             .string("Ingresa tu teléfono")
//             .matches(REGEX_TELEPHONE, MESSAGE_TELEPHONE_INVALID)
//             .required(MESSAGE_REQUIRED),
//         email: yup
//             .string("Ingresa tu email")
//             .matches(REGEX_EMAIL, MESSAGE_EMAIL_INVALID)
//             .required(MESSAGE_REQUIRED),
//         consult: yup
//             .string("Ingresa tu consulta")
//             .min(11, "Ingresa una consulta que tenga entre 15 y 150 carateres")
//             .required(MESSAGE_REQUIRED),
//     });

//     const formik = useFormik({
//         initialValues: {
//             fullname: "",
//             telephone: "",
//             email: "",
//             consult: "",
//         },
//         validationSchema: validationSchema,
//         onSubmit: (values, { resetForm }) => {
//             console.log(values);
//             setOpenAlert(true);
//             resetForm();
//         },
//     });

//     return (
//         <Box className="contact">
//             <Box
//                 component="section"
//                 className="contact__section">
//                 <h3>Haz tu consulta</h3>

//                 <Box
//                     component="form"
//                     className="contact__section__form"
//                     noValidate
//                     autoComplete="off"
//                     onSubmit={formik.handleSubmit}>
//                     <InputField
//                         label="Nombre y apellido"
//                         name="fullname"
//                         value={formik.values.fullname}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.touched.fullname && Boolean(formik.errors.fullname)}
//                         errorMessage={formik.touched.fullname && formik.errors.fullname}
//                         inputProps={{ maxLength: 25 }}>
//                     </InputField>

//                     <InputField
//                         label="Teléfono"
//                         name="telephone"
//                         value={formik.values.telephone}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.touched.telephone && Boolean(formik.errors.telephone)}
//                         errorMessage={formik.touched.telephone && formik.errors.telephone}
//                         inputProps={{ maxLength: 15 }}>
//                     </InputField>

//                     <InputField
//                         label="E-mail"
//                         name="email"
//                         value={formik.values.email}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.touched.email && Boolean(formik.errors.email)}
//                         errorMessage={formik.touched.email && formik.errors.email}
//                         inputProps={{ maxLength: 50 }}>
//                     </InputField>

//                     <InputField
//                         label="Consulta"
//                         name="consult"
//                         multiline
//                         rows={5}
//                         value={formik.values.consult}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.touched.consult && Boolean(formik.errors.consult)}
//                         errorMessage={formik.touched.consult && formik.errors.consult}
//                         inputProps={{ maxLength: 150 }}>
//                     </InputField>

//                     <Button type="submit">Envíar consulta</Button>
//                     <Alert
//                         openAlert={openAlert}
//                         setOpenAlert={setOpenAlert}
//                         message="Tu consulta se ha enviado correctamente"/>
//                 </Box>

//             </Box>

//             <Box
//                 component="section"
//                 className="contact__section">
//                 <h3>Datos de contacto</h3>
//                 <Box className="contact__section__data">
//                     <Box>
//                         <PlaceIcon/>
//                         <span>Calle 30, Cra. 43A, Medellín, Antioquia</span>
//                     </Box>
//                     <Box>
//                         <PhoneIcon/>
//                         <span>+571545845154</span>
//                     </Box>
//                     <Box>
//                         <MailIcon/>
//                         <span>info@powerfulmountain.com</span>
//                     </Box>
//                 </Box>
//                 <Box className="contact__section__map">
//                     <iframe
//                         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2634919577263!2d-75.57344422424714!3d6.228951326514577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e44284a4848199d%3A0xd97a19d5c3273e8a!2sCentro%20Comercial%20Premium%20Plaza!5e0!3m2!1ses-419!2sco!4v1709604399958!5m2!1ses-419!2sco"
//                         loading="lazy">
//                     </iframe>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default Contact;

import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box } from "@mui/material";
import axios from "axios"; // Importa axios para hacer la solicitud al backend
import "./contact.scss";

import {
    MESSAGE_REQUIRED,
    MESSAGE_TELEPHONE_INVALID,
    MESSAGE_EMAIL_INVALID,
    REGEX_TELEPHONE,
    REGEX_EMAIL,
} from "../../constanst/regexPattern.js";

import InputField from "../../components/form/inputField/InputField";
import Button from "../../components/button/Button";
import Alert from "../../components/alert/Alert.jsx";

import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";

const Contact = () => {
    const [ openAlert, setOpenAlert ] = useState(false);

    const validationSchema = yup.object({
        fullname: yup
            .string("Ingresa tu nombre y apellido")
            .min(7, "Ingresa un nombre y apellido que tenga más de 7 caracteres")
            .required(MESSAGE_REQUIRED),
        telephone: yup
            .string("Ingresa tu teléfono")
            .matches(REGEX_TELEPHONE, MESSAGE_TELEPHONE_INVALID)
            .required(MESSAGE_REQUIRED),
        email: yup
            .string("Ingresa tu email")
            .matches(REGEX_EMAIL, MESSAGE_EMAIL_INVALID)
            .required(MESSAGE_REQUIRED),
        consult: yup
            .string("Ingresa tu consulta")
            .min(15, "Ingresa una consulta que tenga entre 15 y 150 caracteres")
            .max(150, "Ingresa una consulta que tenga entre 15 y 150 caracteres")
            .required(MESSAGE_REQUIRED),
    });

    const formik = useFormik({
        initialValues: {
            fullname: "",
            telephone: "",
            email: "",
            consult: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await axios.post("https://mitienda-juan.onrender.com/api/contact/", values); // Envia la consulta al backend
                setOpenAlert(true);
                resetForm();
            } catch (error) {
                console.error("Error al enviar la consulta:", error);
            }
        },

    });

    return (
        <Box className="contact">
            <Box
                component="section"
                className="contact__section">
                <h3>Haz tu consulta</h3>

                <Box
                    component="form"
                    className="contact__section__form"
                    noValidate
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}>
                    <InputField
                        label="Nombre y apellido"
                        name="fullname"
                        value={formik.values.fullname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                        errorMessage={formik.touched.fullname && formik.errors.fullname}
                        inputProps={{ maxLength: 25 }}
                    />

                    <InputField
                        label="Teléfono"
                        name="telephone"
                        value={formik.values.telephone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.telephone && Boolean(formik.errors.telephone)}
                        errorMessage={formik.touched.telephone && formik.errors.telephone}
                        inputProps={{ maxLength: 15 }}
                    />

                    <InputField
                        label="E-mail"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        errorMessage={formik.touched.email && formik.errors.email}
                        inputProps={{ maxLength: 50 }}
                    />

                    <InputField
                        label="Consulta"
                        name="consult"
                        multiline
                        rows={5}
                        value={formik.values.consult}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.consult && Boolean(formik.errors.consult)}
                        errorMessage={formik.touched.consult && formik.errors.consult}
                        inputProps={{ maxLength: 150 }}
                    />

                    <Button type="submit">Enviar consulta</Button>
                    <Alert
                        openAlert={openAlert}
                        setOpenAlert={setOpenAlert}
                        message="Tu consulta se ha enviado correctamente"/>
                </Box>
            </Box>

            <Box
                component="section"
                className="contact__section">
                <h3>Datos de contacto</h3>
                <Box className="contact__section__data">
                    <Box>
                        <PlaceIcon/>
                        <span>Calle 30, Cra. 43A, Medellín, Antioquia</span>
                    </Box>
                    <Box>
                        <PhoneIcon/>
                        <span>+571545845154</span>
                    </Box>
                    <Box>
                        <MailIcon/>
                        <span>info@powerfulmountain.com</span>
                    </Box>
                </Box>
                <Box className="contact__section__map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2634919577263!2d-75.57344422424714!3d6.228951326514577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e44284a4848199d%3A0xd97a19d5c3273e8a!2sCentro%20Comercial%20Premium%20Plaza!5e0!3m2!1ses-419!2sco!4v1709604399958!5m2!1ses-419!2sco"
                        loading="lazy"></iframe>
                </Box>
            </Box>
        </Box>
    );
};

export default Contact;