const { v4: uuidv4 } = require("uuid");
const { formattedTime } = require("./helpers");
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();

const initDB = () => {
  const query = "CREATE TABLE IF NOT EXISTS zeiten(id TEXT, ts TIMESTAMPTZ)";
  client.query(query, [], (err, result) => {
    if (err) return console.error(err.message);
    console.log("Successfully connected to database.");
  });
};

const insertTime = (time) => {
  const id = uuidv4();
  const query = `INSERT INTO zeiten(id, ts) VALUES($1, $2)`;

  client.query(query, [id, time], (err, result) => {
    if (err) return console.error(err.message);
    console.log(`The entry with ID ${id} was added to the database.`);
  });
};

let calcMedian = (callback) => {
  const query = "SELECT * FROM zeiten";
  let total = 0;
  let amount = 0;
  let error = null;

  client.query(query, [], (err, res) => {
    if (err) {
      return callback(err, null);
    }

    res.rows.forEach((row) => {
      total += new Date(row.ts).getTime();
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
