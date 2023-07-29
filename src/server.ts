import cors from "cors";
import dotenv from "dotenv";
import express from "express";
dotenv.config();
import { notFound, errorHandler } from "./middleware/error.middleware";
import connectDB from "./config/connectDB";
import userRoutes from "./routes/user.rotes";
connectDB();

// init express app
const app = express();

// config middleware

app.use(express.json());
/** parses incoming JSON payload of the request and makes it available on the req.body property of the request object.  */
app.use(express.urlencoded({ extended: true }));
/** parsing of complex objects nested within the form data */
app.use(cors());
/** enables Cross-Origin requests, allowing your server to respond to requests coming from a different domain or origin. */

// config route middleware
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "HI" });
});

// handle not found routes
app.use(notFound);
// handle errors in routes
app.use(errorHandler);

// server set up
const PORT = process.env.PORT;
app.listen(PORT, () => {
  if (!PORT) {
    console.log("server is not running");
  } else {
    console.log(`server is running @ http://localhost:${PORT}`);
  }
});
