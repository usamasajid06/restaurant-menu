import { useNavigate } from "react-router-dom";
import { Card, CardMedia, Box, Typography, Chip, Grid } from "@mui/material";
import { Category } from "../types";

interface CategoriesCardProps {
  category: Category;
}

export const CategoriesCard = ({ category }: CategoriesCardProps) => {
  const navigate = useNavigate();

  return (
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
  );
};
