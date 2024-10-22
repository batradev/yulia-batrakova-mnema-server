const db = require("../db");
const isAdmin = require("../utils/admin");

const saveUserInterests = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No interests provided" });
    }

    const existingInterests = await db("users_interests")
      .where("user_id", userId)
      .pluck("interest_id");

    const newInterests = items.filter(
      (interestId) => !existingInterests.includes(interestId)
    );

    if (newInterests.length > 0) {
      const userInterests = newInterests.map((interestId) => ({
        user_id: userId,
        interest_id: interestId,
      }));
      await db("users_interests").insert(userInterests);
    }

    const updatedInterests = await db("users_interests")
      .join("interests", "users_interests.interest_id", "=", "interests.id")
      .where("user_id", userId)
      .select("interests.name");

    res.json({ interests: updatedInterests.map((interest) => interest.name) });
  } catch (error) {
    console.error("Error saving interests", error);
    res.status(500).json({ error: "Failed to save interests" });
  }
};

const removeUserInterest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { interestId } = req.params;
    console.log(userId, interestId);

    await db("users_interests")
      .where({ user_id: userId, interest_id: interestId })
      .del();

    res.json({ success: true });
  } catch (error) {
    console.error("Error removing interest", error);
    res.status(500).json({ error: "Failed to remove interest" });
  }
};

const saveUserProfessions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No professions provided" });
    }

    const existingProfessions = await db("users_professions")
      .where("user_id", userId)
      .pluck("profession_id");

    const newProfessions = items.filter(
      (professionId) => !existingProfessions.includes(professionId)
    );

    if (newProfessions.length > 0) {
      const userProfessions = newProfessions.map((professionId) => ({
        user_id: userId,
        profession_id: professionId,
      }));
      await db("users_professions").insert(userProfessions);
    }

    const updatedProfessions = await db("users_professions")
      .join(
        "professions",
        "users_professions.profession_id",
        "=",
        "professions.id"
      )
      .where("user_id", userId)
      .select("professions.name");

    res.json({
      professions: updatedProfessions.map((profession) => profession.name),
    });
  } catch (error) {
    console.error("Error saving professions", error);
    res.status(500).json({ error: "Failed to save professions" });
  }
};

const removeUserProfession = async (req, res) => {
  try {
    const userId = req.user.id;
    const { professionId } = req.params;

    await db("users_professions")
      .where({ user_id: userId, profession_id: professionId })
      .del();

    res.json({ success: true });
  } catch (error) {
    console.error("Error removing profession", error);
    res.status(500).json({ error: "Failed to remove profession" });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await db("users").where("id", userId).first();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user: { ...user, is_admin: isAdmin(user.email) } });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

const getUserInterests = async (req, res) => {
  try {
    const { userId } = req.params;
    const interests = await db("users_interests")
      .join("interests", "users_interests.interest_id", "=", "interests.id")
      .where("user_id", userId)
      .select("interests.name");

    res.json({ interests: interests.map((interest) => interest.name) });
  } catch (error) {
    console.error("Error fetching user interests:", error);
    res.status(500).json({ error: "Failed to fetch user interests" });
  }
};
const getUserProfessions = async (req, res) => {
  try {
    const { userId } = req.params;
    const professions = await db("users_professions")
      .join(
        "professions",
        "users_professions.profession_id",
        "=",
        "professions.id"
      )
      .where("user_id", userId)
      .select("professions.name");

    res.json({ professions: professions.map((profession) => profession.name) });
  } catch (error) {
    console.error("Error fetching user professions:", error);
    res.status(500).json({ error: "Failed to fetch user professions" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { interests, professions } = req.body;

    const allInterests = await db("interests").select("*");
    const allProfessions = await db("professions").select("*");

    const interestIds = interests
      .map((interest) => {
        const foundInterest = allInterests.find((i) => i.name === interest);
        return foundInterest ? foundInterest.id : null;
      })
      .filter((id) => id !== null);

    const professionIds = professions
      .map((profession) => {
        const foundProfession = allProfessions.find(
          (p) => p.name === profession
        );
        return foundProfession ? foundProfession.id : null;
      })
      .filter((id) => id !== null);

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
    const users = await db("users").select("id", "email");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    await db("users").where("id", userId).del();

    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

module.exports = {
  getUser,
  getUserInterests,
  getUserProfessions,
  saveUserInterests,
  saveUserProfessions,
  updateUserProfile,
  getUsers,
  deleteUser,
  removeUserInterest,
  removeUserProfession,
};
