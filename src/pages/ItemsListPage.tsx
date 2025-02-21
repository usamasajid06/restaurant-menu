import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchItemsByCategory } from '../api/api';
import { MenuItem } from '../types';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import ItemDetailPopup from '../components/ItemDetailPopup';

function ItemsListPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    const loadItems = async () => {
      if (!categoryId) {
        setError('No category ID provided');
        setLoading(false);
        return;
      }
      try {
        const data = await fetchItemsByCategory(Number(categoryId));
        console.log('Fetched Items:', data);
        if (Array.isArray(data)) {
          setItems(data);
          if (data.length === 0) {
            setError('Items not found for this category');
          }
        } else {
          setError('API did not return an array of items');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load items');
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, [categoryId]);

  if (loading) return <Typography>Loading items...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <Grid container spacing={2} padding={2}>
        {items.map(item => (
          <Grid item xs={12} key={item.id}>
            <Card onClick={() => setSelectedItem(item)}>
              {item.image && <CardMedia component="img" height="100" image={item.image} alt={item.name} />}
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.description}
                </Typography>
                <Typography variant="body1">AED {item.price}</Typography>
                <Button variant="contained" onClick={() => setSelectedItem(item)}>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedItem && (
        <ItemDetailPopup item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
}

export default ItemsListPage;