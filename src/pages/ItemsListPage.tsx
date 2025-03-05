import { useEffect, useCallback, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { fetchItemsByCategory } from "../services/itemService";
import { MenuItem } from "../types";
import {
  Grid,
  Typography,
  Box,
  CircularProgress,
  TextField,
} from "@mui/material";
import ItemDetailPopup from "../components/ItemDetailPopup";
import {
  fetchItemsStart,
  fetchItemsSuccess,
  fetchItemsFailure,
  clearSelectedItem,
  updateLastFetched,
} from "../redux/itemSlice";
import { RootState } from "../redux/store";
import { ItemsCard } from "../components/ItemsCard";

const ItemsListPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const dispatch = useAppDispatch();

  const items = useAppSelector((state: RootState) => state.item.items);
  const error = useAppSelector((state: RootState) => state.item.error);
  const loading = useAppSelector((state: RootState) => state.item.loading);
  const selectedItem = useAppSelector(
    (state: RootState) => state.item.selectedItem
  );

  const lastFetched = useAppSelector((state: RootState) => {
    const categoryIdNum = Number(categoryId || 0);
    return state.item.lastFetchedByCategory[categoryIdNum] || 0;
  });

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    []
  );

  const filteredItems = useMemo(() => {
    return items.filter(
      (item: MenuItem) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description &&
          item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, items]);

  useEffect(() => {
    if (!categoryId) {
      dispatch(fetchItemsFailure("No category ID provided"));
      return;
    }

    const categoryIdNum = Number(categoryId);

    const CACHE_DURATION = 15 * 60 * 1000;
    const currentTime = Date.now();
    const timeSinceLastFetch = currentTime - (lastFetched || 0);

    const shouldFetchItems =
      items.length === 0 || timeSinceLastFetch > CACHE_DURATION;

    if (shouldFetchItems) {
      const loadItems = async () => {
        dispatch(fetchItemsStart());
        try {
          const data = await fetchItemsByCategory(categoryIdNum);

          if (!Array.isArray(data)) {
            dispatch(fetchItemsFailure("API did not return an array of items"));
            return;
          }

          dispatch(fetchItemsSuccess(data));

          dispatch(updateLastFetched(categoryIdNum));
        } catch (err: any) {
          dispatch(fetchItemsFailure(err.message || "Failed to load items"));
        }
      };

      loadItems();
    }
  }, [categoryId, dispatch, items.length, lastFetched]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
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
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (filteredItems.length === 0) {
    return (
      <Box
        sx={{ height: "calc(100vh - 64px)", paddingBottom: { xs: 64, md: 80 } }}
      >
        <Box padding={2}>
          <TextField
            label="Search for Items"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="e.g., Prime Beef"
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                borderColor: "#00618d",
              },
            }}
          />
          <Typography>No items found matching your search</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{ height: "calc(100vh - 64px)", paddingBottom: { xs: 64, md: 80 } }}
      >
        <Box padding={2}>
          <TextField
            label="Search for Items"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="e.g., Prime Beef"
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                borderColor: "#00618d",
              },
            }}
          />
          <Grid container spacing={2} padding={1} mb={12} sx={{ flexGrow: 1 }}>
            {filteredItems.map((item: MenuItem) => (
              <ItemsCard key={item.id} item={item} />
            ))}
          </Grid>
        </Box>
      </Box>
      {selectedItem && (
        <ItemDetailPopup
          item={selectedItem}
          onClose={() => dispatch(clearSelectedItem())}
        />
      )}
    </>
  );
};

export default ItemsListPage;
