import PointOfSale from "./POSComponents/PointOfSale";
import Home from "./HomeComponents/Home";
import { Routes, Route } from "react-router-dom";
import ManageProducts from "./ProductsComponents/Urunler";
import AddProduct from "./ProductsComponents/AddProduct";
import Orders from "./OrderComponents/Orders"



function App() {


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="POS" element={<PointOfSale/>} />
        <Route path="Urunler" element={<ManageProducts/>} />
        <Route path="Urunler/yeni" element={<AddProduct/>} />
        <Route path="/Satislar" element={<Orders/>} />
      </Routes>
      
    </div>
  );
}

export default App;
