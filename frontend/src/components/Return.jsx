import { useNavigate, useParams } from "react-router-dom";

const Return = () => {
  const navigate = useNavigate();
  const { shopperNo } = useParams();

  const handleReturn = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/products/return/${shopperNo}`,
        {
          method: "POST", // Ensure method is uppercase
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Redirect only after successful return
        navigate("/");
      } else {
        console.error("Failed to return shopper:", response.statusText);
      }
    } catch (error) {
      console.error("Error returning shopper:", error);
    }
  };

  return (
    <div className="container text-center">
      <h1>Are you sure you want to return this shopper?</h1>
      <button
        style={{
          backgroundColor: "blue", // Color changed to blue to signify return action
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
        onClick={handleReturn}
      >
        Yes, Return it
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

export default Return;
