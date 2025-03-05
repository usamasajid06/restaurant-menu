import { useEffect, useState, useCallback, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { fetchCategories } from "../services/categoryService";
import { Category } from "../types";
import {
  Grid,
  Typography,
  Box,
  CircularProgress,
  TextField,
} from "@mui/material";
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "../redux/categorySlice";
import { RootState } from "../redux/store";
import { CategoriesCard } from "../components/CategoriesCard";

const CategoriesPage = () => {
  const categories = useAppSelector(
    (state: RootState) => state.category.categories
  );
  const error = useAppSelector((state: RootState) => state.category.error);
  const loading = useAppSelector((state: RootState) => state.category.loading);
  const lastFetched = useAppSelector(
    (state: RootState) => state.category.lastFetched
  );
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    []
  );

  const memoizedFilteredCategories = useMemo(
    () =>
      categories.filter(
        (category: Category) =>
          category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.display_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      ),
    [searchQuery, categories]
  );

  useEffect(() => {
    const CACHE_DURATION = 5 * 60 * 1000;
    if (categories.length === 0 || Date.now() - lastFetched > CACHE_DURATION) {
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
    }
  }, [dispatch, categories.length, lastFetched]);

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
            {memoizedFilteredCategories.length > 0 ? (
              memoizedFilteredCategories.map((category: Category) => (
                <CategoriesCard key={category.id} category={category} />
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
