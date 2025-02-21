import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Box, Typography } from '@mui/material';

function CartSummary() {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);

  return (
    <Box position="fixed" bottom={0} width="100%" bgcolor="lightgray" p={2}>
      <Typography>
        {items.length} Items | Total: AED {totalPrice}
      </Typography>
    </Box>
  );
}

export default CartSummary;