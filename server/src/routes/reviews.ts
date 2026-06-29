import { Router } from "express";
import { reviews } from "../data.ts";

const router = Router();

router.get("/:id/reviews", (req, res) => {
  const productReviews = reviews.filter((review) => review.productId === req.params.id);
  res.json(productReviews);
});

router.post("/:id/reviews", (req, res) => {
  const { rating, comment, author, vendorId } = req.body;
  if (!rating || !comment || !author || !vendorId) {
    return res.status(400).json({ message: "Données manquantes pour l'avis" });
  }

  const newReview = {
    id: `review-${Date.now()}`,
    productId: req.params.id,
    vendorId,
    rating,
    comment,
    author,
    date: new Date().toISOString().split("T")[0],
  };
  reviews.push(newReview);
  res.status(201).json(newReview);
});

export default router;
