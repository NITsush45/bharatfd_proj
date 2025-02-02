const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const faqRoutes = require("./src/routes/faqRoutes");
const errorHandler = require("./src/middleware/errorHandler");

dotenv.config();
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing in .env file");
  process.exit(1);
}
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully:", conn.connection.host);
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/faqs", faqRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
process.on("SIGINT", () => {
  console.log("Gracefully shutting down...");
  server.close(() => {
    console.log("Closed all connections");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("Gracefully shutting down...");
  server.close(() => {
    console.log("Closed all connections");
    process.exit(0);
  });
});
