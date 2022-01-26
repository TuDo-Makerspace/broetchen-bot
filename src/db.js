const { v4: uuidv4 } = require("uuid");
const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./db/broetchenbot.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successfully conntected to the database.");
});

const initDB = () => {
  db.prepare("CREATE TABLE IF NOT EXISTS zeiten (id TEXT, ts DATETIME)")
    .run()
    .finalize();
};

const insertTime = (time) => {
  // TODO: validate input
  const id = uuidv4();
  const query = "INSERT INTO zeiten(id, ts) VALUES(?, ?)";
  db.run(query, [id, time], (err) => {
    if (err) {
      throw err;
    }
    console.log(`The entry with ID ${id} was added to the database.`);
  });
  // TODO: insert into db
};

const calcProbability = (time) => {
  // TODO: calculate probability
};

module.exports = {
  initDB,
  insertTime,
  calcProbability,
};
