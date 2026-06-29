import express from "express";
import cors from "cors";
import morgan from "morgan";
import productsRouter from "./routes/products.ts";
import vendorsRouter from "./routes/vendors.ts";
import reviewsRouter from "./routes/reviews.ts";
import ordersRouter from "./routes/orders.ts";

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/products", productsRouter);
app.use("/api/vendors", vendorsRouter);
app.use("/api/products", reviewsRouter);
app.use("/api/orders", ordersRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Backend API running at http://localhost:${port}`);
});
