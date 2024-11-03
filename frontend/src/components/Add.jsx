import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Add = () => {
  let navigate = useNavigate();
  const [suit, setSuit] = useState({
    suitNo: "",
    name: "",
    color: "",
  });
  const [showSuits, setShowSuits] = useState(true);
  const [shopperData, setShopperData] = useState({
    shopperName: "",
    shopperNo: "",
    shopperPrice: "",
    suits: [],
  });

  const handleShopperChange = (e) => {
    const { id, value } = e.target;
    setShopperData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSuitChange = (e) => {
    const { id, value } = e.target;
    setSuit((prevSuit) => ({
      ...prevSuit,
      [id]: value,
    }));
  };

  const handleAddSuit = () => {
    setShopperData((prevData) => ({
      ...prevData,
      suits: [...prevData.suits, suit],
    }));
    setSuit({ suitNo: "", name: "", color: "" }); // Reset the suit form
  };

  const addShopper = async () => {
    try {
      console.log("Sending shopperData:", shopperData); // Log the data being sent

      const response = await fetch("http://localhost:8000/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopperData),
      });

      if (!response.ok) {
        const errorDetails = await response.text(); // Get detailed error message
      }

      const result = await response.json();
      console.log("Shopper added:", result);
      navigate("/");
      // Optionally reset form or redirect here
    } catch (error) {
      console.error("Failed to add shopper:", error);
    }
  };

  return (
    <div className="add-shopper">
      <div className="container">
        {showSuits ? (
          <div className="shopper-details flex column gap">
            <label htmlFor="shopperNo">ShopperNo</label>
            <input
              type="text"
              id="shopperNo"
              value={shopperData.shopperNo}
              onChange={handleShopperChange}
              required
            />
            <label htmlFor="shopperName">ShopperName</label>
            <input
              type="text"
              id="shopperName"
              value={shopperData.shopperName}
              onChange={handleShopperChange}
            />
            <label htmlFor="shopperPrice">ShopperPrice</label>
            <input
              type="number"
              id="shopperPrice"
              value={shopperData.shopperPrice}
              onChange={handleShopperChange}
            />
            <button onClick={() => setShowSuits(false)}>Add Suits</button>
          </div>
        ) : (
          <div className="suits-detail flex column gap">
            <label htmlFor="suitNo">SuitNo</label>
            <input
              type="text"
              id="suitNo"
              value={suit.suitNo}
              onChange={handleSuitChange}
            />
            <label htmlFor="name">SuitName</label>
            <input
              type="text"
              id="name"
              value={suit.name}
              onChange={handleSuitChange}
            />
            <label htmlFor="color">SuitColor</label>
            <input
              type="text"
              id="color"
              value={suit.color}
              onChange={handleSuitChange}
            />
            <button onClick={handleAddSuit}>Add Suit</button>
            <button onClick={addShopper}>Add Shopper</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Add;
