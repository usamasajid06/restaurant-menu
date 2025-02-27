import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Box,
  IconButton,
  Checkbox,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addToCart } from "../redux/cartSlice";
import { MenuItem, CartItem, OptionalExtra } from "../types";
import { addItemToOrder } from "../services/orderService";

interface Props {
  item: MenuItem;
  onClose: () => void;
}

function ItemDetailPopup({ item, onClose }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptionalExtras, setSelectedOptionalExtras] = useState<
    OptionalExtra[]
  >([]);
  const [selectedRequiredExtras, setSelectedRequiredExtras] = useState<{
    [key: string]: string;
  }>({});
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    if (item.requiredExtras) {
      const missingRequired = item.requiredExtras.some(
        (extra) => !selectedRequiredExtras[extra.name]
      );
      if (missingRequired) {
        alert("Please select all required options before adding to cart.");
        return;
      }
    }

    const cartItem: CartItem = {
      ...item,
      quantity,
      selectedExtras: [],
      selectedOptionalExtras,
      selectedRequiredExtras,
    };
    try {
      await addItemToOrder(cartItem);
      dispatch(addToCart(cartItem));
      onClose();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Item added to cart successfully.",
        confirmButtonText: "OK",
        timer: 2000,
      });
    } catch (err) {}
  };

  const handleOptionalExtraToggle = (extra: OptionalExtra) => {
    setSelectedOptionalExtras((prev) =>
      prev.some((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const handleRequiredExtraChange = (extraName: string, value: string) => {
    setSelectedRequiredExtras((prev) => ({
      ...prev,
      [extraName]: value,
    }));
  };

  const totalPrice =
    item.price * quantity +
    selectedOptionalExtras.reduce((sum, extra) => sum + extra.price, 0);

  return (
    <Dialog open onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{item.name}</DialogTitle>
      <DialogContent>
        {item.image && (
          <img src={item.image} alt={item.name} style={{ width: "100%" }} />
        )}
        <Typography>{item.description}</Typography>

        <Box
          display="flex"
          alignItems="center"
          my={2}
          width="100%"
          justifyContent="space-between"
        >
          <Box>
            <Typography>AED {totalPrice.toFixed(2)}</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              <RemoveIcon />
            </IconButton>
            <Typography>{quantity}</Typography>
            <IconButton onClick={() => setQuantity(quantity + 1)}>
              <AddIcon />
            </IconButton>
          </Box>
        </Box>

        {item.optionalExtras && item.optionalExtras.length > 0 && (
          <Box sx={{ marginY: 2 }}>
            <Typography
              variant="h6"
              sx={{ backgroundColor: "#f5f5f5", padding: "3px 15px" }}
            >
              Optional Extras
            </Typography>
            {item.optionalExtras.map((extra) => (
              <Box
                key={extra.id}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedOptionalExtras.some(
                        (e) => e.id === extra.id
                      )}
                      onChange={() => handleOptionalExtraToggle(extra)}
                    />
                  }
                  label={extra.name}
                  sx={{ marginRight: 0 }}
                />
                <Typography sx={{ marginLeft: 2, color: "text.secondary" }}>
                  {extra.price > 0 ? `+ AED ${extra.price}` : "Free"}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {item.requiredExtras &&
          item.requiredExtras.length > 0 &&
          item.requiredExtras.map((extra) => (
            <Box key={extra.id} sx={{ width: "100%", marginY: 2 }}>
              <FormControl component="fieldset" sx={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: "#f5f5f5",
                    paddingY: "10px",
                  }}
                >
                  <Box pl={2}>
                    <FormLabel component="legend" sx={{ color: "black" }}>
                      {extra.name}{" "}
                      <span style={{ color: "red" }}>(Required)</span>
                    </FormLabel>
                  </Box>
                </Box>
                <RadioGroup
                  value={selectedRequiredExtras[extra.name] || ""}
                  onChange={(e) =>
                    handleRequiredExtraChange(extra.name, e.target.value)
                  }
                  sx={{ width: "100%" }}
                >
                  {extra.options.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={option}
                      sx={{ width: "100%" }}
                    />
                  ))}
                </RadioGroup>
                {!selectedRequiredExtras[extra.name] && (
                  <Typography color="error">Please select an option</Typography>
                )}
              </FormControl>
            </Box>
          ))}

        <Typography>Total: AED {totalPrice.toFixed(2)}</Typography>
        <Button
          variant="contained"
          onClick={handleAddToCart}
          fullWidth
          sx={{
            marginTop: 2,
            backgroundColor: "#00618d",
            "&:hover": { backgroundColor: "#004d7f" },
          }}
        >
          Add to Cart (AED {totalPrice.toFixed(2)})
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default ItemDetailPopup;
