var mongoose = require("mongoose");

let connectDb = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("db is connected succesfully");
};

connectDb();
