import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, Typography, Button, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addToCart } from '../redux/cartSlice';
import { MenuItem, SelectedExtra, CartItem } from '../types';
import { addItemToOrder } from '../api/api';

interface Props {
  item: MenuItem;
  onClose: () => void;
}

function ItemDetailPopup({ item, onClose }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<SelectedExtra[]>([]);
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    const cartItem: CartItem = { ...item, quantity, selectedExtras };
    try {
      await addItemToOrder(cartItem);
      dispatch(addToCart(cartItem));
      onClose();
    } catch (err) {
      console.error('Failed to add item to order:', err);
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{item.name}</DialogTitle>
      <DialogContent>
        {item.image && <img src={item.image} alt={item.name} style={{ width: '100%' }} />}
        <Typography>{item.description}</Typography>
        <Typography>AED {item.price}</Typography>

        <Box display="flex" alignItems="center" my={2}>
          <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))}>
            <RemoveIcon />
          </IconButton>
          <Typography>{quantity}</Typography>
          <IconButton onClick={() => setQuantity(quantity + 1)}>
            <AddIcon />
          </IconButton>
        </Box>

        {item.extrasWithOptions && item.extrasWithOptions.length > 0 && (
          <Box>
            <Typography variant="h6">Customize</Typography>
            {item.extrasWithOptions.map(extra => (
              <Box key={extra.extra_id}>
                <Typography>{extra.name}</Typography>
                {extra.option.map(opt => (
                  <Button
                    key={opt.id}
                    onClick={() =>
                      setSelectedExtras(prev => [
                        ...prev,
                        { extra_id: extra.extra_id, option_id: opt.id },
                      ])
                    }
                  >
                    {opt.name} {opt.price > 0 ? `(AED ${opt.price})` : ''}
                  </Button>
                ))}
              </Box>
            ))}
          </Box>
        )}

        <Typography>Total: AED {item.price * quantity}</Typography>
        <Button variant="contained" onClick={handleAddToCart} fullWidth>
          Add to Cart
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default ItemDetailPopup;