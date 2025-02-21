import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../api/api";
import { Category } from "../types";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Chip,
  TextField,
} from "@mui/material";
import Header from "../components/Header"; // Import the Header component

function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        console.log("Fetched Categories:", data);
        if (Array.isArray(data)) {
          setCategories(data);
          setFilteredCategories(data);
        } else {
          setError("API did not return an array of categories");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter(
      (category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.display_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchQuery, categories]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

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

  return (
    <>
      {/* Header */}
      <Header />

      {/* Scrollable Content */}
      <Box
        sx={{ height: "calc(100vh - 64px)", paddingBottom: { xs: 64, md: 80 } }}
      >
        <Box padding={2}>
          <TextField
            label="Search Categories"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ marginBottom: 2 }}
            placeholder="e.g., Breakfast"
          />
          <Grid
            container
            spacing={2}
            mb={8}
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={4}
                  lg={3}
                  key={category.id}
                  sx={{ flex: "1 1 auto" }}
                >
                  <Card
                    onClick={() => navigate(`/items/${category.id}`)}
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      minHeight: { xs: 180, md: 220 },
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Opening Time Tag in Top Left Corner */}
                    {category.opens_at && category.opens_at !== null && (
                      <Chip
                        label={`Opens at ${category.opens_at}`}
                        sx={{
                          position: "absolute",
                          top: 8,
                          left: 8,
                          backgroundColor: "#ff0000",
                          color: "#ffffff",
                          fontWeight: "bold",
                          zIndex: 2,
                          fontSize: { xs: "0.75rem", md: "0.875rem" },
                        }}
                      />
                    )}
                    <CardMedia
                      component="img"
                      height={140}
                      image={category.image}
                      alt={category.name}
                      sx={{
                        width: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
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
                        {category.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography>
                  No categories found matching your search
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default CategoriesPage;
