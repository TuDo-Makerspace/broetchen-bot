const { Telegraf } = require("telegraf");
const { initDB, insertTime, calcMedian } = require("./db.js");
const { formattedDate, formattedTime } = require("./helpers");
const moment = require("moment-timezone");
moment().format();
moment.tz.setDefault("Europe/Berlin");
require("./server.js");
require("dotenv").config();

// initialize bot and db
const bot = new Telegraf(process.env.TOKEN);
initDB();

// start
bot.command("start", (context) => {
  bot.telegram.sendMessage(context.chat.id, "Na, brauchst du was?", {});
});

// hunger
bot.command("/hunger", (context) => {
  calcMedian((err, response) => {
    if (err) {
      return bot.telegram.sendMessage(
        context.chat.id,
        "Es ist ein Fehler aufgetreten: " + err.message,
        {}
      );
    }
    bot.telegram.sendMessage(
      context.chat.id,
      `Der Brötchenmann kommt durchschnittlich um ${response} Uhr.`,
      {}
    );
  });
});

// war da
bot.command("/warda", (context) => {
  const currentTime = moment();

  try {
    insertTime(currentTime);

    date = formattedDate(currentTime);
    time = formattedTime(currentTime);

    bot.telegram.sendMessage(
      context.chat.id,
      `Der Brötchenmann war am ${date} um ${time} Uhr da.`,
      {}
    );
  } catch (err) {
    console.error(err.message);
    bot.telegram.sendMessage(
      "Da ist wohl etwas schiefgelaufen, bitte mache einen Screenshot und informiere Ecki!"
    );
  }
});

bot.launch();
