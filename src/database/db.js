import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("Trying to connect to the database...");
  mongoose
    .connect(
      "mongodb+srv://root:root@cluster0.bvgk3l3.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then((response) => {
      console.log("Mongodb Atlas successfully connected!");
    })
    .catch((error) => {
      console.log(
        `An error occurred while trying to connect to the database... [${error.message}]`
      );
    });
};

export default connectDatabase;
