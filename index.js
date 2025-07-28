const mineflayer = require("mineflayer");
const express = require("express");

const app = express();
app.get("/", (req, res) => res.send("Bot de Jabs está activo 🚀"));
app.listen(10000, () => console.log("🌐 Web activa en el puerto 10000"));

const bot = mineflayer.createBot({
  host: "Itzzrealserver.aternos.me",
  port: 50983,
  username: "Aternos24_7", // puedes cambiar si está baneado
  auth: "offline",
  version: "1.20.4", // asegúrate que coincida con tu server
});

bot.on("spawn", () => {
  console.log("✅ Bot conectado");
  bot.chat("¡Listo para patrullar!");
});

bot.on("kicked", (reason) => {
  console.log("🤔 Bot fue expulsado:", reason);
});

bot.on("error", (err) => console.log("❌ Error:", err));
bot.on("end", () => console.log("🚫 Bot desconectado"));
