const mineflayer = require("mineflayer");
const express = require("express");

// 🌐 Web para UptimeRobot
const app = express();
app.get("/", (req, res) => res.send("Bot de Jabs está activo 🚀"));

// ✅ Esta línea usa el puerto correcto para que Replit lo exponga
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌐 Web activa en el puerto ${PORT}`));

const bot = mineflayer.createBot({
  host: "cuis.aternos.host",
  port: 50983,
  username: "MasterChief",
  auth: "offline",
  version: "1.20.4", // Ajusta si cambias la versión del server
});

bot.on("spawn", () => {
  console.log("✅ Bot conectado");
  bot.chat("¡Listo para patrullar!");

  let forward = true;

  function patrullar() {
    bot.setControlState("forward", true);
    bot.setControlState("jump", true);

    setTimeout(() => {
      bot.setControlState("forward", false);
      bot.setControlState("jump", false);

      setTimeout(() => {
        bot.look(bot.entity.yaw + Math.PI, 0, true);
        forward = !forward;
        setTimeout(patrullar, 1000);
      }, 2000);
    }, 5000);
  }

  patrullar();
});

// 🧠 Capturar razón del kick
bot.on("kicked", (reason, loggedIn) => {
  console.log("🤔 Bot fue expulsado:", reason);
});

bot.on("error", (err) => console.log("❌ Error:", err));
bot.on("end", () => console.log("🚫 Bot desconectado"));
