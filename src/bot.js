const { Telegraf } = require("telegraf");
const { initDB, insertTime } = require("./db.js");
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
  bot.telegram.sendMessage(
    context.chat.id,
    "Die Wahrscheinlichkeit, dass der Brötchenmann in den nächsten 30 Minuten kommt, beträgt x%. \n\n Zu y% wird er um xx:xx Uhr kommen.",
    {}
  );
});

// war da
bot.command("/warda", (context) => {
  const currentTime = new Date();

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

let formattedDate = (datetime) => {
  const locale = "de-DE";
  const dateFormat = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (formattedDate = datetime.toLocaleDateString(locale, dateFormat));
};

let formattedTime = (datetime) => {
  const locale = "de-DE";
  const timeFormat = {
    hour: "2-digit",
    minute: "2-digit",
  };

  return (formattedTime = datetime.toLocaleTimeString(locale, timeFormat));
};

bot.launch();
