import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchItemsByCategory } from "../api/api";
import { MenuItem } from "../types";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import ItemDetailPopup from "../components/ItemDetailPopup";
import Header from "../components/Header";

function ItemsListPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    const loadItems = async () => {
      if (!categoryId) {
        setError("No category ID provided");
        setLoading(false);
        return;
      }
      try {
        const data = await fetchItemsByCategory(Number(categoryId));
        console.log("Fetched Items:", data);
        if (!Array.isArray(data)) {
          setError("API did not return an array of items");
        } else {
          setItems(data);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load items");
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, [categoryId]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (error) return <Typography color="error">{error}</Typography>;
  if (items.length === 0)
    return <Typography>Items not found for this category</Typography>;

  return (
    <>
      <Header />

      <Grid
        container
        spacing={2}
        padding={2}
        mb={12}
        sx={{ flexGrow: 1, cursor: "pointer" }}
      >
        {items.map((item) => (
          <Grid
            item
            xs={6}
            sm={6}
            md={4}
            lg={3}
            key={item.id}
            sx={{ flex: "1 1 auto" }}
          >
            <Card
              onClick={() => setSelectedItem(item)}
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                minHeight: { xs: 200, md: 250 },
              }}
            >
              {item.image && (
                <CardMedia
                  component="img"
                  height={100}
                  image={item.image}
                  alt={item.name}
                  sx={{
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              )}
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item.description}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                >
                  AED {item.price}
                </Typography>
                <Button
                  variant="contained"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(item);
                  }}
                  sx={{
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    width: "100%",
                  }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedItem && (
        <ItemDetailPopup
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}

export default ItemsListPage;
