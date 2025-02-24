import { useDispatch } from "react-redux";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { MenuItem } from "../types";
import { setSelectedItem } from "../redux/itemSlice";

interface ItemsCardProps {
  item: MenuItem;
}

export const ItemsCard = ({ item }: ItemsCardProps) => {
  const dispatch = useDispatch();

  return (
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
  );
};
