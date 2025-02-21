import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoriesPage from './pages/CategoriesPage';
import ItemsListPage from './pages/ItemsListPage';
import CartSummary from './components/CartSummary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CategoriesPage />} />
        <Route path="/items/:categoryId" element={<ItemsListPage />} />
      </Routes>
      <CartSummary />
    </Router>
  );
}

export default App;