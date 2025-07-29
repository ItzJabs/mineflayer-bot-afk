const mineflayer = require("mineflayer");
const express = require("express");

// 🌐 Web para UptimeRobot
const app = express();
const PORT = process.env.PORT || 10000;
app.get("/", (req, res) => res.send("Bot de Jabs está activo 🚀"));
app.listen(PORT, () => console.log(`🌐 Web activa en el puerto ${PORT}`));

// ⚙️ Configuración del bot
const config = {
  host: "Itzzrealserver.aternos.me", // Asegúrate que este host esté actualizado
  port: 50983,
  username: "Servercito_24h", // Cambia si lo deseas
  auth: "offline",
  version: "1.20.4",
};

let bot;

function iniciarBot() {
  bot = mineflayer.createBot(config);

  bot.on("spawn", () => {
    console.log("✅ Bot conectado");
    bot.chat("¡Listo para Mantener el Server!");

    patrullar();
  });

  function patrullar() {
    bot.setControlState("forward", true);
    bot.setControlState("jump", true);

    // Avanza y salta durante 5 segundos
    setTimeout(() => {
      bot.setControlState("forward", false);
      bot.setControlState("jump", false);

      // Gira 180° (π radianes)
      const nuevoYaw = bot.entity.yaw + Math.PI;
      bot.look(nuevoYaw, 0, true);

      // Espera 2 segundos y repite
      setTimeout(patrullar, 2000);
    }, 5000);
  }

  bot.on("error", (err) => {
    console.log("❌ Error:", err);
  });

  bot.on("end", () => {
    console.log("🚫 Bot desconectado. Reiniciando en 10s...");
    setTimeout(() => process.exit(1), 10000); // Render lo reinicia
  });

  bot.on("kicked", (reason) => {
    console.log("🤔 Bot fue expulsado:", reason);
  });

  bot.on("login", () => console.log("🔐 Login correcto"));
  bot.on("message", (msg) => console.log("💬 Chat:", msg.toString()));
}

iniciarBot();

