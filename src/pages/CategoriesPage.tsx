import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { fetchCategories } from "../services/categoryService";
import { Category } from "../types";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
  Chip,
  TextField,
} from "@mui/material";
import Header from "../components/Header";
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "../redux/categorySlice";
import { RootState } from "../redux/store";

const CategoriesPage = () => {
  const categories = useAppSelector(
    (state: RootState) => state.category.categories
  );
  const error = useAppSelector((state: RootState) => state.category.error);
  const loading = useAppSelector((state: RootState) => state.category.loading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      dispatch(fetchCategoriesStart());
      try {
        const data = await fetchCategories();
        dispatch(fetchCategoriesSuccess(data));
      } catch (err: any) {
        dispatch(
          fetchCategoriesFailure(err.message || "Failed to load categories")
        );
      }
    };
    loadCategories();
  }, [dispatch]);

  useEffect(() => {
    setFilteredCategories(
      categories.filter(
        (category: Category) =>
          category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.display_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, categories]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(event.target.value);

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
      <Header />
      <Box
        sx={{ height: "calc(100vh - 64px)", paddingBottom: { xs: 64, md: 80 } }}
      >
        <Box padding={2}>
          <TextField
            label="Search for Categories"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="e.g., Breakfast"
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                borderColor: "#00618d",
                ".MuiOutlinedInput-notchedOutline": {
                  border: "2px solid #00618d",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00618d",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00618d",
                },
              },
              "& .MuiInputLabel-outlined": {
                color: "#00618d",
              },
              "& .MuiInputLabel-outlined.Mui-focused": {
                color: "#00618d",
              },
              "& .MuiInputLabel-outlined.Mui-shrink": {
                color: "#00618d",
              },
              "& .MuiInputBase-input": {
                color: "#000000",
              },
            }}
          />
          <Grid
            container
            spacing={2}
            mb={8}
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category: Category) => (
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
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: 4,
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0, 0, 0, 0.3)",
                        zIndex: 1,
                      },
                    }}
                  >
                    {category.opens_at && category.opens_at !== null && (
                      <Chip
                        label={`Opens at ${category.opens_at}`}
                        sx={{
                          position: "absolute",
                          top: 6,
                          left: 6,
                          backgroundColor: "#ff0000",
                          color: "#ffffff",
                          fontWeight: "500",
                          zIndex: 3,
                          fontSize: { xs: "0.5rem", md: "0.7rem" },
                          padding: "0px",
                        }}
                      />
                    )}
                    <CardMedia
                      component="img"
                      image={category.image}
                      alt={category.name}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "end",
                        color: "#ffffff",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: {
                            xs: "0.7rem",
                            sm: "1rem",
                            md: "1.3rem",
                          },
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                          marginBottom: "5px",
                        }}
                      >
                        {category.display_name}
                      </Typography>
                    </Box>
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
};

export default CategoriesPage;
