import { useState } from "react";
import { useDispatch } from "react-redux";
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
import { MenuItem, SelectedExtra, CartItem, OptionalExtra } from "../types";
import { addItemToOrder } from "../services/orderService";

interface Props {
  item: MenuItem;
  onClose: () => void;
}

function ItemDetailPopup({ item, onClose }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<SelectedExtra[]>([]);
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
      selectedExtras,
      selectedOptionalExtras,
      selectedRequiredExtras,
    };
    try {
      await addItemToOrder(cartItem);
      dispatch(addToCart(cartItem));
      onClose();
    } catch (err) {
      console.error("Failed to add item to order:", err);
    }
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

        {item.optionalExtras && (
          <>
            <Typography
              variant="h6"
              sx={{
                backgroundColor: "#f5f5f5",
                padding: "3px 15px",
                marginBottom: "7px",
              }}
            >
              Add Side
            </Typography>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: 1, width: "100%" }}
            >
              {item.optionalExtras.slice(0, 7).map((extra) => (
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
                    sx={{
                      marginRight: 0,
                    }}
                  />
                  <Typography
                    sx={{
                      marginLeft: 2,
                      color: "text.secondary",
                    }}
                  >
                    + AED {extra.price}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Typography
              variant="h6"
              sx={{
                backgroundColor: "#f5f5f5",
                padding: "3px 15px",
                marginY: "7px",
              }}
            >
              Add Sauce
            </Typography>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: 1, width: "100%" }}
            >
              {item.optionalExtras.slice(7, 13).map((extra) => (
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
                    + AED {extra.price}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Typography
              variant="h6"
              sx={{
                backgroundColor: "#f5f5f5",
                padding: "3px 15px",
                marginY: "7px",
              }}
            >
              Add a Glass
            </Typography>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: 1, width: "100%" }}
            >
              {item.optionalExtras.slice(13).map((extra) => (
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
                    + AED {extra.price}
                  </Typography>
                </Box>
              ))}
            </Box>
          </>
        )}

        {item.requiredExtras &&
          item.requiredExtras.map((extra) => (
            <Box key={extra.id} sx={{ width: "100%" }}>
              <FormControl
                component="fieldset"
                sx={{ marginY: 2, width: "100%" }}
              >
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
                    <FormLabel
                      component="legend"
                      required
                      sx={{
                        color: "black",
                        "&.Mui-focused": {
                          color: "black",
                        },
                        "&.MuiFormLabel-filled": {
                          color: "black",
                        },
                        "&.Mui-error": {
                          color: "black",
                        },
                      }}
                    >
                      {extra.name}
                    </FormLabel>
                  </Box>
                  <Box pr={2}>
                    <Typography sx={{ color: "error.main" }}>
                      Required
                    </Typography>
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
                  <Typography color="error">Required</Typography>
                )}
              </FormControl>
            </Box>
          ))}

        {item.extrasWithOptions && item.extrasWithOptions.length > 0 && (
          <Box>
            <Typography variant="h6">Customize</Typography>
            {item.extrasWithOptions.map((extra) => (
              <Box key={extra.extra_id}>
                <Typography>{extra.name}</Typography>
                {extra.option.map((opt) => (
                  <Button
                    key={opt.id}
                    onClick={() =>
                      setSelectedExtras((prev) => [
                        ...prev,
                        { extra_id: extra.extra_id, option_id: opt.id },
                      ])
                    }
                    sx={{ width: "100%", marginBottom: 1 }}
                  >
                    {opt.name} {opt.price > 0 ? `(AED ${opt.price})` : ""}
                  </Button>
                ))}
              </Box>
            ))}
          </Box>
        )}

        <Typography>Total: AED {totalPrice.toFixed(2)}</Typography>
        <Button
          variant="contained"
          onClick={handleAddToCart}
          fullWidth
          sx={{
            marginTop: 2,
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#1565c0" },
          }}
        >
          Add to Cart (AED {totalPrice.toFixed(2)})
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default ItemDetailPopup;
