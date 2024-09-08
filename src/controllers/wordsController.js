const OpenAI = require("openai");
const db = require("../db");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { generatePrompt } = require("../prompts/promptTemplate");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const addWords = async (req, res) => {
  const { words, deck_id } = req.body;
  const user_id = req.user.id;

  const deck = await db("decks").where({ id: deck_id }).first();
  const { native_language_id, target_language_id } = deck;

  const nativeLanguage = await db("languages")
    .where({ id: native_language_id })
    .first();
  const targetLanguage = await db("languages")
    .where({ id: target_language_id })
    .first();

  const nativeLanguageName = nativeLanguage.name;
  const targetLanguageName = targetLanguage.name;

  const interestsRows = await db("users_interests")
    .join("interests", "users_interests.interest_id", "=", "interests.id")
    .where("users_interests.user_id", user_id)
    .select("interests.name");

  const interests = interestsRows.map((row) => row.name).join(", ");

  const professionsRows = await db("users_professions")
    .join(
      "professions",
      "users_professions.profession_id",
      "=",
      "professions.id"
    )
    .where("users_professions.user_id", user_id)
    .select("professions.name");

  const professions = professionsRows.map((row) => row.name).join(", ");

  const combinedPrompt = generatePrompt(nativeLanguageName, targetLanguageName, interests, professions, words);

  const completionResponse = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
    messages: [
      {
        role: "system",
        content:
          "You are an assistant that always provides responses in valid JSON format.",
      },
      {
        role: "user",
        content: combinedPrompt,
      },
    ],
  });
  console.log(
    "Chat response: ",
    completionResponse.choices[0]?.message?.content
  );

  words_data = JSON.parse(completionResponse.choices[0]?.message?.content);
  words_data.map(async (record) => {
    await db("words").insert({ ...record, deck_id });
  });

  res.status(200).json({ message: "Words processed successfully" });
};

const getResults = async (req, res) => {
  try {
    const { deck_id } = req.query;

    if (!deck_id) {
      return res.status(400).json({ error: "Deck ID is required" });
    }

    const words = await db("words")
      .where({ deck_id })
      .select("word", "translation", "mnemonic_desc");

    res.status(200).json(words);
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ error: "Failed to fetch results" });
  }
};

const generateImages = async (req, res) => {
  try {
    const { words } = req.body;

    if (!words || words.length === 0) {
      return res
        .status(400)
        .json({ error: "No words provided for image generation" });
    }

    const assetsDir = path.join(__dirname, "../server_assets");

    const dallEResponses = await Promise.all(
      words.map(async (word) => {
        const promptText = `Generate a detailed visual image based on this mnemonic description: ${word.mnemonic_desc}`;

        const imageResponse = await axios.post(
          "https://api.openai.com/v1/images/generations",
          {
            model: "dall-e-3",
            prompt: promptText,
            n: 1,
            size: "1024x1024",
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const imageUrl = imageResponse.data.data[0].url;

        const imagePath = path.join(assetsDir, `${word.word}.png`);
        await downloadImage(imageUrl, imagePath);

        const imageUrlPath = `https://localhost:8080/server_assets/${word.word}.png`;

        await db("words")
          .where({ word: word.word })
          .update({ image_path: imageUrlPath });

        return { word: word.word, imagePath: imageUrlPath };
      })
    );

    res
      .status(200)
      .json({ message: "Images generated successfully", data: dallEResponses });
      console.log (dallEResponses);
  } catch (error) {
    console.error("Error generating images:", error);
    res.status(500).json({ error: "Failed to generate images" });
  }
};

const downloadImage = async (url, filepath) => {
  const response = await axios({
    url,
    responseType: "stream",
  });

  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
};

const getVisuals = async (req, res) => {
  try {
    const { deck_id } = req.query;

    if (!deck_id) {
      return res.status(400).json({ error: "Deck ID is required" });
    }

    const visuals = await db("words")
      .where({ deck_id })
      .select("word", "translation", "mnemonic_desc", "image_path");

    res.status(200).json(visuals);
  } catch (error) {
    console.error("Error fetching visuals:", error);
    res.status(500).json({ error: "Failed to fetch visuals" });
  }
};

module.exports = {
  addWords,
  getResults,
  generateImages,
  getVisuals,
};