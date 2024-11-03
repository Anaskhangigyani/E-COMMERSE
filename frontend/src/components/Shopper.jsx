import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// Define the placeholder image URL
const PLACEHOLDER_IMAGE_URL =
  "https://ecommercenewsforyou.com/wp-content/uploads/2019/08/Ecommerce-fashion-industry.jpg"; // Example placeholder image

const ShopperDetail = () => {
  const { shopperNo } = useParams(); // Get the shopperNo from the URL parameters
  const [shopper, setShopper] = useState(null);

  useEffect(() => {
    const fetchShopperDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/products/shopper/${shopperNo}`
        );
        if (response.ok) {
          const result = await response.json();
          console.log(result);

          setShopper(result.data || null); // Assuming the result contains shopper details
        } else {
          console.error("Failed to fetch shopper details");
        }
      } catch (error) {
        console.error("Error fetching shopper details:", error);
      }
    };

    fetchShopperDetail();
  }, [shopperNo]);

  // Early return if shopper is null
  if (!shopper) {
    return <div>Loading...</div>;
  }

  return (
    <div className="shopper">
      <div className="container">
        <div className="shopper-detail">
          <div className="shopper-detail-card">
            <img
              src={shopper.imageUrl || PLACEHOLDER_IMAGE_URL}
              alt={shopper.shopperName || "Shopper"}
              className="shopper-detail-image"
            />
            <div className="shopper-detail-body">
              <h1 className="shopper-detail-name">
                Name : {shopper.shopperName || "Unknown Shopper"}
              </h1>
              <h3 className="shopper-detail-no">
                ShopperNo : {shopper.shopperNo || "No Number Available"}
              </h3>
              <h3 className="shopper-detail-price">
                Price: {shopper.shopperPrice || "Not Available"}
              </h3>
              <div className="buttons flex column">
                <Link className="btn" to="/">
                  Back to List
                </Link>
                <Link
                  className="btn"
                  style={{ backgroundColor: "red" }}
                  to={`/delete/${shopper.shopperNo}`}
                >
                  Delete
                </Link>
                <Link
                  className="btn"
                  style={{ backgroundColor: "green" }}
                  to={`/sale/${shopper.shopperNo}`}
                >
                  Sale
                </Link>
                <Link
                  className="btn"
                  style={{ backgroundColor: "brown" }}
                  to={`/update/${shopper.shopperNo}`}
                >
                  Update
                </Link>
              </div>
            </div>
          </div>

          <h2 style={{ textAlign: "center" }}>
            Available Suits in This Shopper
          </h2>
          <div className="suits">
            <div className="suits-list">
              {shopper.suits.map((suit, index) => (
                <div key={index} className="suit-card">
                  <img
                    src={suit.imageUrl || PLACEHOLDER_IMAGE_URL}
                    alt={suit.name || "Suit"}
                    className="suit-image"
                  />
                  <div className="suit-body">
                    <h2 className="suit-name">
                      Name : {suit.name || "Unknown Suit"}
                    </h2>
                    <h3 className="suit-color">
                      Color: {suit.color || "Not Available"}
                    </h3>
                    <h3 className="suit-price">
                      ShopperId: {shopper.shopperNo || "Not Available"}
                    </h3>
                    <h3 className="suit-price">
                      SuitId: {suit.suitNo || "Not Available"}
                    </h3>
                    <Link
                      className="btn"
                      style={{
                        backgroundColor: "red", // Use red color for delete action
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px",
                      }}
                      to={`/delete-suit/${shopper.shopperNo}/${suit.suitNo}`}
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopperDetail;
