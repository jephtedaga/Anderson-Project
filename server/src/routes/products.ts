import { Router } from "express";
import { products } from "../data.ts";

const router = Router();

const filterProducts = (query: any) => {
  return products.filter((product) => {
    const { category, q } = query;

    if (category && product.category !== category) {
      return false;
    }

    if (q && typeof q === "string") {
      const normalized = q.toLowerCase();
      return (
        product.name.toLowerCase().includes(normalized) ||
        product.description.toLowerCase().includes(normalized) ||
        product.tags.some((tag) => tag.toLowerCase().includes(normalized))
      );
    }

    return true;
  });
};

router.get("/", (req, res) => {
  const filtered = filterProducts(req.query);
  res.json(filtered);
});

router.get("/search", (req, res) => {
  const filtered = filterProducts(req.query);
  res.json(filtered);
});

router.get("/:id", (req, res) => {
  const product = products.find((item) => item.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Produit non trouvé" });
  }
  res.json(product);
});

export default router;
