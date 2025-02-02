const express = require("express");
const { getFaqs, createFaq } = require("../controllers/faqController");
const { body, validationResult } = require("express-validator");

const router = express.Router();
router.get("/", getFaqs);
router.post(
  "/",
  [
    body("question").notEmpty().withMessage("Question is required"),
    body("answer").notEmpty().withMessage("Answer is required"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      await createFaq(req, res);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
