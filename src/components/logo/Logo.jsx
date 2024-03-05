import { Box } from "@mui/material";
import "./logo.scss";

const Logo = () => {
    return (
        <Box className="logo">
            <img
                src="/images/images/logo.png"
                alt="Logo de la pizzería"/>
        </Box>
    );
};

export default Logo;