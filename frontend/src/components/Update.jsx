import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  let navigate = useNavigate();
  const { shopperNo } = useParams(); // Retrieve shopperNo from URL parameters

  const [suit, setSuit] = useState({
    name: "",
    color: "",
    suitNo: "",
  });

  const [showSuits, setShowSuits] = useState(true);
  const [shopperData, setShopperData] = useState({
    shopperName: "",
    shopperPrice: "",
    suits: [],
  });

  // Fetch the shopper data when the component mounts
  useEffect(() => {
    const fetchShopperData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/products/shopper/${shopperNo}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setShopperData({
          shopperName: data.shopperName || "",
          shopperPrice: data.shopperPrice || "",
          suits: data.suits || [],
        });
      } catch (error) {
        console.error("Failed to fetch shopper data:", error);
      }
    };

    fetchShopperData();
  }, [shopperNo]);

  // Update the suit state when a new suit is added
  const handleSuitChange = (e) => {
    const { id, value } = e.target;
    setSuit((prevSuit) => ({
      ...prevSuit,
      [id]: value,
    }));
  };

  // Add new suit to the shopperData
  const handleAddSuit = () => {
    setShopperData((prevData) => ({
      ...prevData,
      suits: [...prevData.suits, suit],
    }));
    setSuit({ name: "", color: "", suitNo: "" }); // Reset the suit form
  };

  // Handle updates to the shopper data
  const handleShopperChange = (e) => {
    const { id, value } = e.target;
    setShopperData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Function to handle the update operation
  const updateShopper = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/products/update/${shopperNo}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shopperData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Shopper updated:", result);
      navigate("/");
      // Optionally, you might want to notify the user or redirect
    } catch (error) {
      console.error("Failed to update shopper:", error);
    }
  };

  return (
    <div className="update-shopper">
      <div className="container">
        {showSuits ? (
          <div className="shopper-details flex column gap">
            <label htmlFor="shopperName">Update Shopper Name</label>
            <input
              type="text"
              id="shopperName"
              value={shopperData.shopperName}
              onChange={handleShopperChange}
            />
            <label htmlFor="shopperPrice">Update Shopper Price</label>
            <input
              type="number"
              id="shopperPrice"
              value={shopperData.shopperPrice}
              onChange={handleShopperChange}
            />
            <button onClick={() => setShowSuits(false)}>Manage Suits</button>
          </div>
        ) : (
          <div className="suits-detail flex column gap">
            <label htmlFor="name">Suit Name</label>
            <input
              type="text"
              id="name"
              value={suit.name}
              onChange={handleSuitChange}
            />
            <label htmlFor="color">Suit Color</label>
            <input
              type="text"
              id="color"
              value={suit.color}
              onChange={handleSuitChange}
            />
            <label htmlFor="suitNo">Suit Number</label>
            <input
              type="text"
              id="suitNo"
              value={suit.suitNo}
              onChange={handleSuitChange}
            />
            <button onClick={handleAddSuit}>Add Suit</button>
            <button onClick={updateShopper}>Update Shopper</button>
            <button onClick={() => setShowSuits(true)}>
              Back to Shopper Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Update;
