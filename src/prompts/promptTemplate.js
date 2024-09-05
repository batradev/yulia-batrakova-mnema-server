module.exports.generatePrompt = function (nativeLanguageName, targetLanguageName, interests, professions, words) {
  return `I'll provide a few words in ${nativeLanguageName}, please provide a short one-two word translation to ${targetLanguageName} for each word and generate a short mnemonic description for each translated word in ${nativeLanguageName}.
    The mnemonic is going to be used to create a vivid visual image that enhances memory retention. 
    Please provide only a valid plain compact JSON object in the response as in the following example for words "play" and "wolf":
    [
      {"word": "play", translation: "jouer", mnemonic_desc: "The word "jouer" from French sounds like "jaguar." Here's a jaguar playing soccer on a field, skillfully dribbling the ball, surrounded by a stadium filled with cheering fans." },
      {"word": "wolf", translation: "loup", mnemonic_desc: "The word "loup" from French sounds like "loop." Picture a wolf running in a continuous loop, chasing its tail in an endless circle." }
    ]
    where "word" is requested word in ${nativeLanguageName}, "translation" is a translation to ${targetLanguageName}, "mnemonic_desc" is generated mnemonic.
    Don't add any comments or formatting to the response. The response should be pasable by any JSON parser right away.
    The mnemonic should be personalized based on a different interest or profession from the provided lists (${interests}) and (${professions}), ensuring each word is paired with a unique interest or profession, when it's possible. 
    This will evoke stronger emotional engagement and make the word easier to remember. 

    The text for short mnemonic description (mnemonic_desc) for each translated word should be always in ${nativeLanguageName}.
    These examples are only for illustrating what the mnemonic_desc content should be like and are based on a native English speaker learning French. Do not include the text in parentheses in your response.
    Please adapt your response to the specific languages provided (${nativeLanguageName} and ${targetLanguageName}), and ensure that the total character count for each mnemonic description does not exceed 254 characters:

    1. The word "jouer" from French sounds like "jaguar." Here's a jaguar playing soccer on a field, skillfully dribbling the ball, surrounded by a stadium filled with cheering fans. (For someone interested in sports)
    2. The word "rêve" from French sounds like "raven." Imagine a raven flying through a dream, gliding silently over a surreal landscape. (For someone interested in poetry or gothic literature)
    3. The word "loup" from French sounds like "loop." Picture a wolf running in a continuous loop, chasing its tail in an endless circle. (For someone interested in filmmaking or video game design)
    4. The word "verre" from French sounds like "bear." Visualize a bear made entirely of glass, standing in a modern art gallery. (For someone interested in visual arts or museum curation)
    5. The word "livre" from French sounds like "liver." Imagine a book shaped like a liver, sitting on a shelf in a medical library. (For someone in the medical field or studying anatomy)
    
    So for each word:
    1. The first sentence should compare the word in ${targetLanguageName} with one or more words that sound similar in ${nativeLanguageName}. 
    2. The second sentence should briefly describe a vivid image or scenario based on this comparison, creating a memorable association. 
    
    Please follow this format for each word, make the associations creative, relevant, and memorable.
    The words: ${words.toString()}`;
};