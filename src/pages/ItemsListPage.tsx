import { useEffect, useCallback, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { fetchItemsByCategory } from "../services/itemService";
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
  TextField,
} from "@mui/material";
import ItemDetailPopup from "../components/ItemDetailPopup";
import {
  fetchItemsStart,
  fetchItemsSuccess,
  fetchItemsFailure,
  setSelectedItem,
  clearSelectedItem,
} from "../redux/itemSlice";
import { RootState } from "../redux/store";

const ItemsListPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const items = useAppSelector((state: RootState) => state.item.items);
  const error = useAppSelector((state: RootState) => state.item.error);
  const loading = useAppSelector((state: RootState) => state.item.loading);
  const selectedItem = useAppSelector(
    (state: RootState) => state.item.selectedItem
  );
  const lastFetched = useAppSelector(
    (state: RootState) =>
      state.item.lastFetchedByCategory[Number(categoryId) || 0]
  );
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    []
  );

  const filteredItems = useMemo(
    () =>
      items.filter(
        (item: MenuItem) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.description &&
            item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    [searchQuery, items]
  );

  useEffect(() => {
    if (!categoryId) {
      dispatch(fetchItemsFailure("No category ID provided"));
      return;
    }
    const categoryIdNum = Number(categoryId);
    const CACHE_DURATION = 5 * 60 * 1000;
    if (
      items.length === 0 ||
      !lastFetched ||
      Date.now() - lastFetched > CACHE_DURATION
    ) {
      const loadItems = async () => {
        dispatch(fetchItemsStart());
        try {
          const data = await fetchItemsByCategory(categoryIdNum);
          if (!Array.isArray(data)) {
            dispatch(fetchItemsFailure("API did not return an array of items"));
          } else {
            dispatch(fetchItemsSuccess(data));
          }
        } catch (err: any) {
          dispatch(fetchItemsFailure(err.message || "Failed to load items"));
        }
      };
      loadItems();
    }
  }, [categoryId, dispatch, items.length, lastFetched]);

  return loading ? (
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
  ) : error ? (
    <Typography color="error">{error}</Typography>
  ) : filteredItems.length === 0 ? (
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
              "& .MuiInputLabel-outlined.Mui-focused, & .MuiInputLabel-outlined.Mui-shrink":
                {
                  color: `${"#00618d"} !important`,
                },
              "& .MuiInputBase-input": {
                color: "#000000",
              },
            }}
          />
          <Grid
            container
            spacing={2}
            padding={2}
            mb={15}
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            <Grid item xs={12}>
              <Typography>No items found matching your search</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  ) : (
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
              "& .MuiInputBase-input": {
                color: "#000000",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#00618d",
                opacity: 1,
              },
            }}
          />
          <Grid container spacing={2} padding={1} mb={12} sx={{ flexGrow: 1 }}>
            {filteredItems.map((item: MenuItem) => (
              <Grid item xs={12} md={6} key={item.id} sx={{ flex: "1 1 auto" }}>
                <Card
                  sx={{
                    Width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    borderRadius: 4,
                    boxShadow: 2,
                    overflow: "hidden",
                  }}
                >
                  {item.image && (
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{
                        width: { xs: 130, md: 180 },
                        objectFit: "cover",
                        objectPosition: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => dispatch(setSelectedItem(item))}
                    />
                  )}
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      p: 2,
                      pl: 4,
                      bgcolor: "#ffffff",
                      "@media (max-width: 380px)": {
                        pl: 2,
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: "1rem", md: "1.25rem" },
                        fontWeight: "bold",
                        mb: 0.3,
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        fontSize: { xs: "0.875rem", md: "1rem" },
                        mb: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        "@media (max-width: 380px)": {
                          flexDirection: "column",
                          justifyContent: "start",
                          alignItems: "start",
                          gap: "5px",
                        },
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: { xs: "0.875rem", md: "1rem" },
                          fontWeight: "600",
                          color: "#00618d",
                        }}
                      >
                        AED {item.price}
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(setSelectedItem(item));
                        }}
                        sx={{
                          fontSize: { xs: "0.6rem", md: "0.8rem" },
                          textTransform: "capitalize",
                          bgcolor: "#00618d",
                          "&:hover": {
                            bgcolor: "#004d7f",
                          },
                          "@media (max-width: 380px)": {
                            fontSize: "0.5rem",
                            padding: "4px 0px",
                          },
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
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
