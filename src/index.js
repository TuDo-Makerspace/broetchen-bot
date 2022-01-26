const { Telegraf } = require("telegraf");
const { initDB, insertTime, calcProbability } = require("./db.js");
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
  bot.telegram.sendMessage(
    context.chat.id,
    "Die Wahrscheinlichkeit, dass der Brötchenmann in den nächsten 30 Minuten kommt, beträgt x%. \n\n Zu y% wird er um xx:xx Uhr kommen.",
    {}
  );
});

// war da
bot.command("/warda", (context) => {
  const currentTime = new Date();
  const locale = "de-DE";
  const dateFormat = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const timeFormat = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const formattedDate = currentTime.toLocaleDateString(locale, dateFormat);
  const formattedTime = currentTime.toLocaleTimeString(locale, timeFormat);

  try {
    insertTime(currentTime);
    bot.telegram.sendMessage(
      context.chat.id,
      `Der Brötchenmann war am ${formattedDate} um ${formattedTime} Uhr da.`,
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
