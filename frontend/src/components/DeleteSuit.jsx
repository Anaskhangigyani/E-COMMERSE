import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DeleteSuit = () => {
  const { shopperNo, suitNo } = useParams(); // Get shopperNo and suitNo from route params
  const [shopper, setShopper] = useState(null); // Initialize as null for better conditional checks

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchShopper = async () => {
      try {
        const response = await fetch(
          ` http://localhost:8000/products/shopper/${shopperNo}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        let suitData = data.data;
        console.log("Fetched shopper data:", suitData); // Debugging line
        if (suitData && Array.isArray(suitData.suits)) {
          setShopper(suitData);
        } else {
          console.error("Invalid shopper data format:", data);
        }
      } catch (error) {
        console.error("Error fetching shopper data:", error);
      }
    };

    fetchShopper();
  }, [shopperNo]);

  const handleDeleteSuit = async () => {
    if (!shopper) {
      console.error("Shopper data is not available");
      return;
    }

    // Check if suits is defined and is an array
    if (!Array.isArray(shopper.suits)) {
      console.error(
        "Suits array is not available or not an array",
        shopper.suits
      );
      return;
    }

    // Filter out the suit to be removed
    const updatedSuits = shopper.suits.filter((suit) => suit.suitNo !== suitNo);
    console.log(suitNo);

    try {
      // Send PUT request to update the shopper
      const response = await fetch(
        `http://localhost:8000/products/update/${shopperNo}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...shopper,
            suits: updatedSuits,
          }),
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      navigate("/");
    } catch (error) {
      console.error("Error updating shopper data:", error);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
    // Alternatively, you can use a specific route:
    // navigate('/some-specific-route');
  };

  return (
    <div className="container flex justify-center text-center">
      {shopper ? (
        <div>
          <h2>Are you sure you want to delete this suit?</h2>
          <button
            onClick={handleDeleteSuit}
            style={{
              backgroundColor: "red", // Use red color for delete action
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Delete Suit
          </button>
          <button
            onClick={handleCancel}
            style={{
              marginLeft: "10px",
              padding: "10px 20px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <p>Loading shopper data...</p>
      )}
    </div>
  );
};

export default DeleteSuit;
