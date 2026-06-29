import { Router } from "express";
import { orders } from "../data.ts";
import type { OrderRequest, Order } from "../types.ts";

const router = Router();

router.get("/", (req, res) => {
  res.json(orders);
});

router.post("/", (req, res) => {
  const { customerName, customerAddress, customerPhone, paymentMethod, items, totalAmount } = req.body as OrderRequest;

  if (!customerName || !customerAddress || !customerPhone || !paymentMethod || !Array.isArray(items) || !totalAmount) {
    return res.status(400).json({ message: "Informations de commande incomplètes" });
  }

  const newOrder: Order = {
    id: `order-${Date.now()}`,
    customerName,
    customerAddress,
    customerPhone,
    paymentMethod,
    items,
    totalAmount,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  return res.status(201).json(newOrder);
});

export default router;
