import './config/instrument.js'
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "mongoose";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from './controller/webhooks.js';
dotenv.config();

const app = express();
// connect to databse
await connectDB()
//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//routes
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post("/webhooks",clerkWebhooks)

const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);
//Routes


//listingnig tot he port
app.listen(PORT, () => {        
  console.log(`Server is running on port ${PORT}`);
});