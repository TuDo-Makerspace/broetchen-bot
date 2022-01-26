const { v4: uuidv4 } = require("uuid");
const { formattedDate, formattedTime } = require("./helpers");
const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database(
  path.resolve(__dirname, "./db/broetchenbot.db"),
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successfully conntected to the database.");
  }
);

const initDB = () => {
  db.prepare("CREATE TABLE IF NOT EXISTS zeiten (id TEXT, ts DATETIME)")
    .run()
    .finalize();
};

const insertTime = (time) => {
  const id = uuidv4();
  const query = "INSERT INTO zeiten(id, ts) VALUES(?, ?)";

  db.run(query, [id, time], (err) => {
    if (err) {
      throw err;
    }
    console.log(`The entry with ID ${id} was added to the database.`);
  });
};

let calcMedian = (callback) => {
  const query = "SELECT DISTINCT ts time FROM zeiten";
  let total = 0;
  let amount = 0;
  let error = null;

  db.all(query, [], (err, rows) => {
    if (err) {
      callback(err, null);
    }
    rows.forEach((row) => {
      total += row.time;
      amount++;
    });

    if (amount == 0)
      error = new Error(
        "Es sind noch keine Daten über die Zeiten des Brötchenmannes vorhanden."
      );

    const median = formattedTime(new Date(total / amount));

    callback(error, median);
  });
};

module.exports = {
  initDB,
  insertTime,
  calcMedian,
};
