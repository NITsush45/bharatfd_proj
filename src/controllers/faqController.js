const Faq = require("../models/faq");
const redis = require("../config/cache");
const translateText = require("../services/translationServices");

exports.getFaqs = async (req, res) => {
  const lang = req.query.lang || "en";
  const cacheKey = `faqs_${lang}`;

  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) return res.json(JSON.parse(cachedData));

    let faqs = await Faq.find();

    if (lang !== "en") {
      faqs = await Promise.all(
        faqs.map(async (faq) => {
          const translatedQuestion = faq.translations[lang]?.question || await translateText(faq.question, lang);
          const translatedAnswer = faq.translations[lang]?.answer || await translateText(faq.answer, lang);

          return {
            question: translatedQuestion,
            answer: translatedAnswer,
          };
        })
      );
    }
    await redis.setex(cacheKey, 3600, JSON.stringify(faqs));

    res.json(faqs);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const translations = {
      hi: {
        question: await translateText(question, "hi"),
        answer: await translateText(answer, "hi"),
      },
      bn: {
        question: await translateText(question, "bn"),
        answer: await translateText(answer, "bn"),
      },
    };

    const faq = new Faq({ question, answer, translations });

    await faq.save();

    redis.del("faqs_en");
    redis.del("faqs_hi");
    redis.del("faqs_bn");

    res.status(201).json(faq);
  } catch (error) {
    console.error("Error creating FAQ:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
