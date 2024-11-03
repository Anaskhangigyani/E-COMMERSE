const { Shopper } = require("../models/ShoppersModel");
const { Sold } = require("../models/SoldShoppersModel");
const addShopper = async (req, res) => {
  try {
    const shopperData = req.body;

    const shopperNo = shopperData.shopperNo;

    const existingShopper = await Shopper.findOne({ shopperNo });
    if (existingShopper) {
      return res.status(400).json({
        message: "Shopper with this shopper number already exists.",
        success: false,
      });
    }

    const shopper = new Shopper({
      ...shopperData,
      shopperNo,
    });
    const savedShopper = await shopper.save();

    return res.status(201).json({
      message: "Shopper created successfully.",
      success: true,
      data: savedShopper,
    });
  } catch (err) {
    console.error("Error creating shopper:", err);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

const readAvailableShoppers = async (req, res) => {
  try {
    const shoppers = await Shopper.find({});
    return res.status(200).json({
      shoppers,
      success: true,
    });
  } catch (err) {
    console.error("Error retrieving available shoppers:", err);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

const purchaseShopper = async (req, res) => {
  try {
    const shopperNo = req.params.shopperNo;

    const shopper = await Shopper.findOneAndDelete({ shopperNo });
    if (!shopper) {
      return res.status(404).json({
        message: "Shopper not found.",
        success: false,
      });
    }

    const soldShopper = new Sold({
      shopperName: shopper.shopperName,
      shopperNo: shopper.shopperNo,
      shopperPrice: shopper.shopperPrice, // Ensure this field is included
      suits: shopper.suits,
    });
    await soldShopper.save();

    return res.status(200).json({
      message: "Shopper moved to sold collection and deleted successfully.",
      success: true,
    });
  } catch (err) {
    console.error("Error processing shopper purchase:", err);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

const readSoldShoppers = async (req, res) => {
  try {
    const soldShoppers = await Sold.find({});
    return res.status(200).json({
      shoppers: soldShoppers,
      success: true,
    });
  } catch (err) {
    console.error("Error retrieving sold shoppers:", err);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

const returnShopper = async (req, res) => {
  try {
    const shopperNo = req.params.shopperNo;

    const soldShopper = await Sold.findOneAndDelete({ shopperNo: shopperNo });
    if (!soldShopper) {
      return res.status(404).json({
        message: "Shopper not found in sold history.",
        success: false,
      });
    }

    const shopperToReturn = new Shopper({
      shopperName: soldShopper.shopperName,
      shopperNo: soldShopper.shopperNo,
      shopperPrice: soldShopper.shopperPrice,
      suits: soldShopper.suits,
    });
    await shopperToReturn.save();

    return res.status(200).json({
      message: "Shopper successfully returned to the shopper list.",
      success: true,
    });
  } catch (err) {
    console.error("Error processing shopper return:", err);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

const removeShopper = async (req, res) => {
  try {
    const shopperNo = req.params.shopperNo;

    const removedShopper = await Shopper.findOneAndDelete({
      shopperNo: shopperNo,
    });
    if (!removedShopper) {
      return res.status(404).json({
        message: "Shopper not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Shopper removed successfully.",
      success: true,
    });
  } catch (err) {
    console.error("Error processing shopper removal:", err);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

const updateFullshopper = async (req, res) => {
  try {
    const shopperNo = req.params.shopperNo;
    const updateData = req.body;

    const updatedShopper = await Shopper.findOneAndUpdate(
      { shopperNo: shopperNo },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedShopper) {
      return res.status(404).json({
        message: "Shopper not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Shopper updated successfully.",
      success: true,
      data: updatedShopper,
    });
  } catch (err) {
    console.error("Error updating shopper:", err);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

const updateValuesInShopper = async (req, res) => {
  try {
    const shopperNo = req.params.shopperNo;
    const updateData = req.body;

    // Ensure only provided fields are updated
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "No fields to update.",
        success: false,
      });
    }

    // Find the shopper first
    const shopper = await Shopper.findOne({ shopperNo: shopperNo });

    if (!shopper) {
      return res.status(404).json({
        message: "Shopper not found.",
        success: false,
      });
    }

    // Merge the new suits with the existing ones if `suits` is in the updateData
    if (updateData.suits) {
      updateData.suits = [...shopper.suits, ...updateData.suits]; // Merge existing suits with new ones
    }

    // Update the shopper with new data
    const updatedShopper = await Shopper.findOneAndUpdate(
      { shopperNo: shopperNo },
      { $set: updateData }, // Use $set to update only specified fields
      { new: true, runValidators: true } // Return the updated document and run validation
    );

    return res.status(200).json({
      message: "Shopper updated successfully.",
      success: true,
      data: updatedShopper,
    });
  } catch (err) {
    console.error("Error updating shopper values:", err);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

const readOneAvailableShoppers = async (req, res) => {
  try {
    // Extract the shopperNo from the request parameters
    const { shopperNo } = req.params;

    // Find the shopper by shopperNo
    const shopper = await Shopper.findOne({ shopperNo });

    // If shopper is not found, send a 404 response
    if (!shopper) {
      return res.status(404).json({
        message: "Shopper not found.",
        success: false,
      });
    }

    // Send the found shopper data in the response
    return res.status(200).json({
      message: "Shopper retrieved successfully.",
      success: true,
      data: shopper,
    });
  } catch (err) {
    // Log the error and send a 500 response
    console.error("Error retrieving shopper:", err);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};
const readOneSoldShoppers = async (req, res) => {
  try {
    // Extract the shopperNo from the request parameters
    const { shopperNo } = req.params;

    // Find the shopper by shopperNo
    const shopper = await Sold.findOne({ shopperNo });

    // If shopper is not found, send a 404 response
    if (!shopper) {
      return res.status(404).json({
        message: "Shopper not found.",
        success: false,
      });
    }

    // Send the found shopper data in the response
    return res.status(200).json({
      message: "Shopper retrieved successfully.",
      success: true,
      data: shopper,
    });
  } catch (err) {
    // Log the error and send a 500 response
    console.error("Error retrieving shopper:", err);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

module.exports = {
  addShopper,
  readAvailableShoppers,
  purchaseShopper,
  readSoldShoppers,
  returnShopper,
  removeShopper,
  updateFullshopper,
  updateValuesInShopper,
  readOneAvailableShoppers,
  readOneSoldShoppers,
};
