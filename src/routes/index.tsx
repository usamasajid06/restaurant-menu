import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  useLocation,
} from "react-router-dom";
import CategoriesPage from "../pages/CategoriesPage";
import ItemsListPage from "../pages/ItemsListPage";
import Footer from "../components/Footer";
import CartSummary from "../components/CartSummary";

const AppLayout = () => {
  const location = useLocation();

  const showCartSummary = location.pathname.startsWith("/items/");
  const showFooter = !location.pathname.startsWith("/items/");

  return (
    <>
      <Outlet />
      {showCartSummary && <CartSummary />}
      {showFooter && <Footer />}
    </>
  );
};

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<CategoriesPage />} />
          <Route path="/items/:categoryId" element={<ItemsListPage />} />
        </Route>
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
