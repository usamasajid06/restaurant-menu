import { Box } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";

const Footer = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        bgcolor: "#1976d2",
        py: 1.5,
        borderRadius: "10px",
        boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        background: "#00618d",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          color: "#FFFFFF",
        }}
      >
        <MenuIcon sx={{ fontSize: "2rem" }} />
        <HomeIcon sx={{ fontSize: "2rem" }} />
        <SearchIcon sx={{ fontSize: "2rem" }} />
        <WhatsAppIcon sx={{ fontSize: "2rem" }} />
      </Box>
    </Box>
  );
};

export default Footer;
