import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Button,
} from "@mui/material";
import { ArrowBackIos, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const PRIMARY_COLOR = "#00618d";

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

  const handleBack: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "#dddddd", boxShadow: "none", padding: "10px 5px" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Button
          variant="text"
          onClick={handleBack}
          aria-label="back"
          sx={{
            color: PRIMARY_COLOR,
            textTransform: "capitalize",
            border: `2px solid ${PRIMARY_COLOR}`,
            borderRadius: 2,
            backgroundColor: "transparent",
            padding: "4px 12px",
            display: "flex",
            alignItems: "center",
            gap: 0.2,
          }}
        >
          <ArrowBackIos sx={{ color: PRIMARY_COLOR, fontSize: "1rem" }} />
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              fontSize: "0.875rem",
              color: PRIMARY_COLOR,
            }}
          >
            Back
          </Typography>
        </Button>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            color: PRIMARY_COLOR,
            fontWeight: "700",
            fontSize: {
              xs: "1rem",
              sm: "1.25rem",
              md: "1.4rem",
              lg: "1.5rem",
            },
          }}
        >
          {title}
        </Typography>
        <IconButton edge="end" sx={{ color: PRIMARY_COLOR }} aria-label="cart">
          <Badge badgeContent={cartItemsCount} color="error">
            <ShoppingCart sx={{ fontSize: "2.2rem" }} />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
