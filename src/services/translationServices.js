const translate = require("google-translate-api-x");
const redis = require("../config/cache");

const translateText = async (text, lang) => {
  try {
    const cacheKey = `translation_${lang}_${text}`;
    const cachedTranslation = await redis.get(cacheKey);
    
    if (cachedTranslation) {
      return cachedTranslation;
    }

    const res = await translate(text, { to: lang });
    const translatedText = res.text;
    await redis.setex(cacheKey, 3600, translatedText);

    return translatedText;
  } catch (error) {
    console.error("Translation Error:", error.message);
    return text;
  }
};

module.exports = translateText;
