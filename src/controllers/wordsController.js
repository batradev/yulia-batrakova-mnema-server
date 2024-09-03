const OpenAI = require("openai");
const db = require("../db");

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

  const combinedPrompt = `
    I'll provide a few words in ${nativeLanguageName}, please provide a short one-two word translation to ${targetLanguageName} for each word and generate a short mnemonic description for each translated word in ${nativeLanguageName}.
    The mnemonic is going to be used to create a vivid visual image that enhances memory retention. 
    Please provide only a valid plain compact JSON object in the response as in the following example for words "play" and "wolf":
    [
      {"word": "play", translation: "jouer", mnemonic_desc: "The word "jouer" from French sounds like "jaguar." Here's a jaguar playing soccer on a field, skillfully dribbling the ball, surrounded by a stadium filled with cheering fans." },
      {"word": "wolf", translation: "loup", mnemonic_desc: "The word "loup" from French sounds like "loop." Picture a wolf running in a continuous loop, chasing its tail in an endless circle." }
    ]
    Don't add any comments or formatting to the response. The response should be pasable by any JSON parser right away.
    The mnemonic should be personalized based on one of the person's interests (${interests}) or professions (${professions}), 
    as this will evoke stronger emotional engagement and make the word easier to remember. 

    These examples are only for illustrating what the mnemonic_desc content should be like and are based on a native English speaker learning French. Do not include the text in parentheses in your response.
    Please adapt your response to the specific languages provided (${nativeLanguageName} and ${targetLanguageName}), and ensure that the total character count for each mnemonic description does not exceed 234 characters:

    1. The word "jouer" from French sounds like "jaguar." Here's a jaguar playing soccer on a field, skillfully dribbling the ball, surrounded by a stadium filled with cheering fans. (For someone interested in sports)
    2. The word "rêve" from French sounds like "raven." Imagine a raven flying through a dream, gliding silently over a surreal landscape. (For someone interested in poetry or gothic literature)
    3. The word "loup" from French sounds like "loop." Picture a wolf running in a continuous loop, chasing its tail in an endless circle. (For someone interested in filmmaking or video game design)
    4. The word "verre" from French sounds like "bear." Visualize a bear made entirely of glass, standing in a modern art gallery. (For someone interested in visual arts or museum curation)
    5. The word "livre" from French sounds like "liver." Imagine a book shaped like a liver, sitting on a shelf in a medical library. (For someone in the medical field or studying anatomy)
    Make the associations creative, relevant, and memorable.
    The words: ${words.toString()}
  `;
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

module.exports = {
  addWords,
  getResults,
};
