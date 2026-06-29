import { Router } from "express";
import { vendors, products } from "../data.ts";

const router = Router();

router.get("/", (req, res) => {
  res.json(vendors);
});

router.get("/:id", (req, res) => {
  const vendor = vendors.find((item) => item.id === req.params.id);
  if (!vendor) {
    return res.status(404).json({ message: "Vendeur introuvable" });
  }
  res.json(vendor);
});

router.get("/:id/products", (req, res) => {
  const vendorProducts = products.filter(
    (product) => product.vendor.id === req.params.id
  );
  res.json(vendorProducts);
});

export default router;
