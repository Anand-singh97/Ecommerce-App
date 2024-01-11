import "./index.css";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { Shop } from "./Pages/Shop";
import { ShopCategory } from "./Pages/ShopCategory";
import { Product } from "./Pages/Product";
import { Cart } from "./Pages/Cart";
import { LoginSignup } from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
function App() {
  return (
    <div className="App font-poppins">
      <Routes>
        <Route path="/" element=<Navbar />>
          <Route index element=<Shop /> />
          <Route path="/men" element=<ShopCategory category="men" /> />
          <Route path="/women" element=<ShopCategory category="women" /> />
          <Route path="/kids" element=<ShopCategory category="kids" /> />
          <Route path="/product" element=<Product />>
            <Route path=":productId" element=<Product /> />
          </Route>
          <Route path="/cart" element=<Cart /> />
          <Route path="/login" element=<LoginSignup /> />
        </Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
