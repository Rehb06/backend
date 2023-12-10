import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { AuthOrder } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage"
import ProductsPage from "./pages/ProductsPage"
import ProductsFormPage from "./pages/ProductsFormPage";
import ProtectedRoute from "./ProtectedRoute";
import { ProductsProvider } from "./context/ProductsContext";
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
// Importa el nuevo contexto de pedidos
import { OrdersProvider } from "./context/OrdersContext"; 
import OrdersPage from "./pages/OrdersPage";
import OrdersFormPage from "./pages/OrdersFormPage";

function App() {
  return (
    <AuthOrder>
      <ProductsProvider>
        <OrdersProvider> {/* Agrega el OrderProvider */}
          
            <BrowserRouter>
              <main className="container mx-auto px-10" >
                <Navbar></Navbar>
                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/register' element={<RegisterPage />} />

                  <Route element={<ProtectedRoute />}>
                    <Route path='/profile' element={<ProfilePage />} />
                    <Route path='/products' element={<ProductsPage />} />
                    <Route path='/add-product' element={<ProductsFormPage />} />
                    <Route path='/product/:id' element={<ProductsFormPage />} />
                    {/* Nuevas rutas para pedidos */}
                    <Route path='/orders' element={<OrdersPage />} />
                    <Route path='/add-order' element={<OrdersFormPage />} />
                    <Route path='/order/:id' element={<OrdersFormPage />} />

                  </Route>
                  <Route path="*" element={<NotFound/>}/>
                </Routes>
              </main>
            </BrowserRouter>
        </OrdersProvider>
      </ProductsProvider>
    </AuthOrder>
  );
}

export default App;
