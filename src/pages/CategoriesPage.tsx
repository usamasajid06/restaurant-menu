import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../api/api';
import { Category } from '../types';
import { Grid, Card, CardMedia, CardContent, Typography, TextField, Box } from '@mui/material';

function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]); // Filtered list for display
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search input state
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        console.log('Fetched Categories:', data);
        if (Array.isArray(data)) {
          setCategories(data);
          setFilteredCategories(data); // Initially, all categories are shown
        } else {
          setError('API did not return an array of categories');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load categories');
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  // Filter categories based on search query
  useEffect(() => {
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.display_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchQuery, categories]);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  if (loading) return <Typography>Loading categories...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box padding={2}>
      {/* Search Bar */}
      <TextField
        label="Search Categories"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2 }}
        placeholder="e.g., Breakfast"
      />

      {/* Categories Grid */}
      <Grid container spacing={2}>
        {filteredCategories.length > 0 ? (
          filteredCategories.map(category => (
            <Grid item xs={6} key={category.id}>
              <Card onClick={() => navigate(`/items/${category.id}`)}>
                <CardMedia component="img" height="140" image={category.image} alt={category.name} />
                <CardContent>
                  <Typography variant="h6">{category.name}</Typography>
                  {category.opens_at && category.is_closed && (
                    <Typography variant="body2" color="textSecondary">
                      Opens at {category.opens_at}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography>No categories found matching your search</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default CategoriesPage;