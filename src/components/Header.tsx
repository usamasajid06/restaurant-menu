import { AppBar, Toolbar, IconButton, Badge, Typography } from "@mui/material";
import { ArrowBack, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface HeaderProps {
  title?: string;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title = "In Room Dining",
  onBack,
}) => {
  const navigate = useNavigate();
  const cartItemsCount = useSelector(
    (state: RootState) => state.cart.items.length
  );

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  //   const handleCartClick = () => {
  //     navigate("/cart");
  //   };

  return (
    <AppBar position="static" sx={{ bgcolor: "#e0e0e0", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          edge="start"
          color="primary"
          onClick={handleBack}
          aria-label="back"
        >
          <ArrowBack />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: "center", color: "#333333" }}
        >
          {title}
        </Typography>
        <IconButton
          edge="end"
          color="primary"
          aria-label="cart"
          //   onClick={handleCartClick}
        >
          <Badge badgeContent={cartItemsCount} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
