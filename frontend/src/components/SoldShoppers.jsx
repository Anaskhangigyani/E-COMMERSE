import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Define the placeholder image URL
const PLACEHOLDER_IMAGE_URL =
  "https://ecommercenewsforyou.com/wp-content/uploads/2019/08/Ecommerce-fashion-industry.jpg"; // Example placeholder image

const SoldShoppers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/products/sold");
        if (!response.ok) {
        }
        const result = await response.json();
        setData(result.shoppers || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card-container">
      {data && data.length > 0 ? (
        <>
          {data.map((item) => (
            <div key={item.shopperNo} className="card">
              <img
                src={item.imageUrl || PLACEHOLDER_IMAGE_URL}
                alt={item.shopperName}
                className="card-image"
              />
              <div className="card-body">
                <h2 className="card-shopper-no">No: {item.shopperNo}</h2>
                <h3 className="card-shopper-name">Name: {item.shopperName}</h3>
                <h3>SuitsCount : {item.suits.length}</h3>
                <p className="card-price">
                  Price: {item.shopperPrice || "Not Available"}
                </p>
                <Link className="btn" to={`/return/${item.shopperNo}`}>
                  Return
                </Link>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div
            className="container"
            style={{ fontSize: "18px", textAlign: "center", color: "white" }}
          >
            Loading
          </div>
        </>
      )}
    </div>
  );
};

export default SoldShoppers;
