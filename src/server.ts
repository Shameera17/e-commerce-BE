import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/connectDB";
import { errorHandler, notFound } from "./middleware/error.middleware";
import productRoutes from "./routes/product.routes";
import userRoutes from "./routes/user.routes";
import session = require("express-session");
dotenv.config();
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
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to 'true' in production with HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// config route middleware
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

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
