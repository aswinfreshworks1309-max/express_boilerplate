import { ObjectId } from "mongodb";
import { client } from "../index.js";
import config from "../config/index.js";

const MONGO_DATABASE = config.database;

const getAllScores = async () => {
  return await client
    .db(MONGO_DATABASE)
    .collection("world_cup")
    .find({})
    .toArray();
};

const getScoreById = async (id) => {
  try {
    const data = await client
      .db(MONGO_DATABASE)
      .collection("world_cup")
      .findOne({ _id: new ObjectId(id) });
    return data;
  } catch (err) {
    throw new Error("error", err);
  }
};

const createScore = async (scoreData) => {
  try {
    const { name, team, runs, balls } = scoreData;
    const temp = await client
      .db(MONGO_DATABASE)
      .collection("world_cup")
      .insertOne({
        name,
        team,
        runs,
        balls,
      });
    return temp;
  } catch (err) {
    throw new Error("error", err);
  }
};

const updateScore = async (id, updatedData) => {
  try {
    const { name, team, runs, balls } = updatedData;

    const temp = await client
      .db(MONGO_DATABASE)
      .collection("world_cup")
      .updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            name,
            team,
            runs,
            balls,
          },
        },
      );

    return temp.acknowledged !== false && temp.matchedCount > 0;
  } catch (err) {
    throw new Error("error", err);
  }
};

const deleteScore = async (id) => {
  try {
    const result = await client
      .db(MONGO_DATABASE)
      .collection("world_cup")
      .deleteOne({
        _id: new ObjectId(id),
      });
    return result.deletedCount > 0;
  } catch (err) {
    throw new Error("error", err);
  }
};

/**
 * Aggregation Training Placeholders
 * // todo: Implement these during the interactive session
 */

// 1. Find all players in the dataset.
const findAllPlayers = async () => {
  // todo:

  return await client
    .db(MONGO_DATABASE)
    .collection("world_cup")
    .find(
      {},
      {
        projection: { name: true, _id: 0 },
      },
    )
    .toArray();
};

// 2. Find players from the India team.
const findIndiaPlayers = async () => {
  // todo:
  return client
    .db(MONGO_DATABASE)
    .collection("world_cup")
    .find({ team: "India" }, { projection: { name: true } })
    .toArray();
};

// 3. Find players who scored more than 60 runs.
const findHighScorers = async () => {
  // todo:
  return client
    .db(MONGO_DATABASE)
    .collection("world_cup")
    .find(
      {
        runs: { $gt: 60 },
      },
      { projection: { name: true, runs: true } },
    )
    .toArray();
};

// 4. Find players who faced fewer than 40 balls.
const findQuickBatters = async () => {
  // todo:
  return client
    .db(MONGO_DATABASE)
    .collection("world_cup")
    .find({ balls: { $lt: 40 } }, { projection: { name: true } })
    .toArray();
};

// 5. Find players who hit more than 2 sixes.
const findPowerHitters = async () => {
  // todo:
  const answer = await client
    .db(MONGO_DATABASE)
    .collection("world_cup")
    .find({ sixes: { $gt: 2 } }, { projection: { name: true, sixes: true } })
    .toArray();
  return answer;
};

// 6. Display only the player's name and runs (projection).
const getPlayerNameAndRuns = async () => {
  // todo:
  const result = await client
    .db(MONGO_DATABASE)
    .collection("world_cup")
    .find({}, { projection: { name: true, runs: true, _id: 0 } })
    .toArray();
  return result;
};

// 7. Find players from Australia OR England.
const findAusOrEngPlayers = async () => {
  // todo:
  const result = await client
    .db(MONGO_DATABASE)
    .collection("world_cup")
    .find({ $or: [{ team: "Australia" }, { team: "England" }] })
    .toArray();
  return result;
};

// 8. Show the Top 3 run scorers.
const getTop3Scorers = async () => {
  // todo:
  const result = await client
    .db(MONGO_DATABASE)
    .collection("world_cup")
    .find({}, { projection: { _id: false, name: true, runs: true } })
    .sort({ runs: -1 })
    .limit(3)
    .toArray();
  return result;
};

// 9. Find the player who faced the most balls.
const getPlayerMostBalls = async () => {
  // todo:
  const result = await client
    .db(MONGO_DATABASE)
    .collection("world_cup")
    .find({}, { projection: { name: true, _id: false, balls: true } })
    .sort({ balls: -1 })
    .limit(1)
    .toArray();
  return result;
};

// 10. Calculate the total runs scored by all players.   
const getTotalRunsAll = async () => {
  //todo:
  try {
    const result = await client
      .db(MONGO_DATABASE)
      .collection("world_cup")
      .aggregate([
        {
          $group: {
            _id: null,
            totalRuns: { $sum: "$runs" },
          },
        },
      ])
      .toArray();

    return result;
  } catch {
    return "error while fetching data";
  }
};
// 11. Calculate the average runs scored.
const getAverageRunsAll = async () => {
  // todo:
};

// 12. Count the total number of players.
const getTotalPlayerCount = async () => {
  // todo:
};

// 13. Find the total runs scored by each team.
const getTotalRunsByTeam = async () => {
  // todo:
};

// 14. Find the number of players in each team.
const getPlayerCountByTeam = async () => {
  // todo:
};

const cricketServices = {
  getAllScores,
  getScoreById,
  createScore,
  updateScore,
  deleteScore,
  findAllPlayers,
  findIndiaPlayers,
  findHighScorers,
  findQuickBatters,
  findPowerHitters,
  getPlayerNameAndRuns,
  findAusOrEngPlayers,
  getTop3Scorers,
  getPlayerMostBalls,
  getTotalRunsAll,
  getAverageRunsAll,
  getTotalPlayerCount,
  getTotalRunsByTeam,
  getPlayerCountByTeam,
};

export default cricketServices;
