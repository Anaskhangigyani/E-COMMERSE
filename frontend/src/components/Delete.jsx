import { useNavigate, useParams } from "react-router-dom";

const Delete = () => {
  const navigate = useNavigate();
  const { shopperNo } = useParams();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        ` http://localhost:8000/products/delete/${shopperNo}`,
        {
          method: "DELETE", // Use DELETE method for deletion
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Redirect only after successful deletion
        navigate("/");
      } else {
        console.error("Failed to delete shopper:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting shopper:", error);
    }
  };

  return (
    <div className="container text-center">
      <h1>Are you sure you want to delete this shopper?</h1>
      <button
        style={{
          backgroundColor: "red", // Use red color for delete action
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
        onClick={handleDelete}
      >
        Yes, delete it
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

export default Delete;
