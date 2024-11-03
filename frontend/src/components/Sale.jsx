import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Sale = () => {
  const navigate = useNavigate();
  const { shopperNo } = useParams();

  const handleSale = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/products/sale/${shopperNo}`,
        {
          method: "POST", // Ensure method is uppercase
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (response.ok) {
        // Redirect only after successful deletion
        navigate("/");
      } else {
        console.error("Failed to sale shopper:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting shopper:", error);
    }
  };

  return (
    <div className="container text-center">
      <h1>Are you sure you want to sale this shopper?</h1>
      <button
        style={{
          backgroundColor: "green", // Use red color for delete action
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
        onClick={handleSale}
      >
        Yes, Sale it
      </button>
      <button
        style={{
          backgroundColor: "gray",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          marginLeft: "10px",
        }}
        onClick={() => navigate("/")}
      >
        Cancel
      </button>
    </div>
  );
};

export default Sale;
