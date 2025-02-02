const mongoose = require("mongoose");

const FaqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    translations: {
      hi: {
        question: { type: String, trim: true },
        answer: { type: String, trim: true },
      },
      bn: {
        question: { type: String, trim: true },
        answer: { type: String, trim: true },
      },
    },
  },
  { timestamps: true }
);
FaqSchema.index({ question: "text" });

module.exports = mongoose.model("Faq", FaqSchema);
