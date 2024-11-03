import React from "react";
import "./index.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Shoppers from "./components/Shoppers";
import Shopper from "./components/Shopper";
import Sale from "./components/Sale";
import Delete from "./components/Delete";
import SoldShoppers from "./components/SoldShoppers";
import Return from "./components/Return";
import Header from "./components/Header";
import Update from "./components/Update";
import Add from "./components/Add";
import DeleteSuit from "./components/DeleteSuit";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Shoppers />} />
        <Route path="/sold" element={<SoldShoppers />} />
        <Route path="/shopper/:shopperNo" element={<Shopper />} />
        <Route path="/sale/:shopperNo" element={<Sale />} />
        <Route path="/return/:shopperNo" element={<Return />} />
        <Route path="/delete/:shopperNo" element={<Delete />} />
        <Route
          path="/delete-suit/:shopperNo/:suitNo"
          element={<DeleteSuit />}
        />
        <Route path="/update/:shopperNo" element={<Update />} />
        <Route path="/update/:shopperNo" element={<Update />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </>
  );
};

export default App;
