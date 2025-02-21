import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Box, Typography, Button } from "@mui/material";

function CartSummary() {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);

  const itemCount = items.length;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        bgcolor: "#1976d2",
        pt: 1,
        borderRadius: "25px 25px 0 0",
        boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "visible",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: "1rem",
            ml: 4,
          }}
        >
          {itemCount}
        </Typography>
        <Button
          variant="text"
          sx={{
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: "1rem",
            textTransform: "none",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
          }}
        >
          View cart {itemCount}
        </Button>
        <Typography
          variant="h6"
          sx={{
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: "1rem",
            mr: 4,
          }}
        >
          AED {totalPrice.toFixed(2)}
        </Typography>
      </Box>

      <Typography
        sx={{
          color: "#333333",
          fontSize: "0.75rem",
          textAlign: "center",
          width: "100%",
          px: 2,
          py: 1,
          backgroundColor: "#f5f5f5",
        }}
      >
        Prices are in AED and are inclusive of 10% service charges, 5% VAT & 7%
        Municipality fee.
      </Typography>
    </Box>
  );
}

export default CartSummary;
