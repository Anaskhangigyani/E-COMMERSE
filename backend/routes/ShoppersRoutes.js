const express = require("express");
const { shopperValidation } = require("../middlewares/ShopperValidation");
const {
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
} = require("../controllers/shoppersController");
const { Suit } = require("../models/ShoppersModel");

const router = express.Router();

// create
router.post("/add", shopperValidation, addShopper);
// Read
router.get("/Shoppers", readAvailableShoppers);
router.get("/shopper/:shopperNo", readOneAvailableShoppers);

router.get("/sold", readSoldShoppers);
router.get("/sold/:shopperNo", readOneSoldShoppers);
// update
router.put("/update/:shopperNo", updateFullshopper);
router.patch("/update/:shopperNo", updateValuesInShopper);

// Delete
router.delete("/delete/:shopperNo", removeShopper);
// Delete and add
router.post("/sale/:shopperNo", purchaseShopper);
router.post("/return/:shopperNo", returnShopper);

module.exports = router;
