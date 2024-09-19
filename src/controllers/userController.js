const db = require("../db");

const checkUserInterests = async (req, res) => {
  try {
    const userId = req.user.id;
    const interests = await db("users_interests").where("user_id", userId);

    if (interests.length > 0) {
      res.json({ hasInterests: true });
    } else {
      res.json({ hasInterests: false });
    }
  } catch (error) {
    console.error("Error checking interests:", error);
    res.status(500).json({ error: "Failed to check interests" });
  }
};

const getAllInterests = async (req, res) => {
  try {
    const interests = await db("interests").select("*");
    res.json(interests);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Failed to fetch interests" });
  }
};

const saveUserInterests = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body; 

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No interests provided' });
    }

    await db("users_interests").where("user_id", userId).del(); 

    const userInterests = items.map((interestId) => ({
      user_id: userId,
      interest_id: interestId,
    }));

    await db("users_interests").insert(userInterests); 

    res.json({ success: true });
  } catch (error) {
    console.error("Error saving interests", error);
    res.status(500).json({ error: "Failed to save interests" });
  }
};

const checkUserProfessions = async (req, res) => {
  try {
    const userId = req.user.id;
    const professions = await db("users_professions").where("user_id", userId);

    if (professions.length > 0) {
      res.json({ hasProfessions: true });
    } else {
      res.json({ hasProfessions: false });
    }
  } catch (error) {
    console.error("Error checking professions:", error);
    res.status(500).json({ error: "Failed to check professions" });
  }
};

const getAllProfessions = async (req, res) => {
  try {
    const professions = await db("professions").select("*");
    res.json(professions);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Failed to fetch professions" });
  }
};


const saveUserProfessions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;  

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No professions provided' });
    }

    await db("users_professions").where("user_id", userId).del(); 

    const userProfessions = items.map((professionId) => ({
      user_id: userId,
      profession_id: professionId,
    }));

    await db("users_professions").insert(userProfessions); 

    res.json({ success: true });
  } catch (error) {
    console.error("Error saving professions", error);
    res.status(500).json({ error: "Failed to save professions" });
  }
};


const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await db("users").where("id", userId).first();

    const interests = await db("users_interests")
      .join("interests", "users_interests.interest_id", "=", "interests.id")
      .where("user_id", userId)
      .select("interests.name");

    const professions = await db("users_professions")
      .join("professions", "users_professions.profession_id", "=", "professions.id")
      .where("user_id", userId)
      .select("professions.name");

    res.json({
      user,
      interests: interests.map((interest) => interest.name), 
      professions: professions.map((profession) => profession.name), 
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};


const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { interests, professions } = req.body;

    
    const allInterests = await db("interests").select("*");
    const allProfessions = await db("professions").select("*");

   
    const interestIds = interests.map((interest) => {
      const foundInterest = allInterests.find((i) => i.name === interest);
      return foundInterest ? foundInterest.id : null;
    }).filter(id => id !== null); 

   
    const professionIds = professions.map((profession) => {
      const foundProfession = allProfessions.find((p) => p.name === profession);
      return foundProfession ? foundProfession.id : null;
    }).filter(id => id !== null);

    await db("users_interests").where("user_id", userId).del();
    await db("users_professions").where("user_id", userId).del();

    if (interestIds.length > 0) {
      const userInterests = interestIds.map((interestId) => ({
        user_id: userId,
        interest_id: interestId,
      }));
      await db("users_interests").insert(userInterests);
    }
    if (professionIds.length > 0) {
      const userProfessions = professionIds.map((professionId) => ({
        user_id: userId,
        profession_id: professionId,
      }));
      await db("users_professions").insert(userProfessions);
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await db('users').select('id', 'email');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    
    await db('users').where('id', userId).del();

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

const getUserRole = async (req, res) => {
  res.json({ is_admin: req.user.is_admin });
} 

module.exports = {
  checkUserInterests,
  getAllInterests,
  saveUserInterests,
  checkUserProfessions,
  getAllProfessions,
  saveUserProfessions,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserRole,
};