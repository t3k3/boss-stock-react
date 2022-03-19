import PointOfSale from "./POSComponents/PointOfSale";
import Home from "./HomeComponents/Home";
import { Routes, Route } from "react-router-dom";
import ManageProducts from "./ProductsComponents/Urunler";
import AddProduct from "./ProductsComponents/AddProduct";
import Orders from "./OrderComponents/Orders"
import Login from "./AuthComponents/Login";
import Repair from "./RepairComponents/Repair";




function App() {


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="POS" element={<PointOfSale/>} />
        <Route path="Urunler" element={<ManageProducts/>} />
        <Route path="Urunler/yeni" element={<AddProduct/>} />
        <Route path="/Satislar" element={<Orders/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Tamir" element={<Repair/>} />

      </Routes>
      
    </div>
  );
}

export default App;
