const mineflayer = require("mineflayer");
const express = require("express");

// 🌐 Web para UptimeRobot
const app = express();
const PORT = process.env.PORT || 10000;
app.get("/", (req, res) => res.send("Bot de Jabs está activo 🚀"));
app.listen(PORT, () => console.log(`🌐 Web activa en el puerto ${PORT}`));

const bot = mineflayer.createBot({
  host: "Itzzrealserver.aternos.me", // Asegúrate que este host y puerto estén actualizados
  port: 50983,
  username: "Servercito_24h", // Cambia si lo deseas
  auth: "offline",
  version: "1.20.4",
});

bot.on("spawn", () => {
  console.log("✅ Bot conectado");
  bot.chat("¡Listo para Mantener el Server!");

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

  patrullar();
});

// Captura errores y desconexiones
bot.on("error", (err) => console.log("❌ Error:", err));
bot.on("end", () => console.log("🚫 Bot desconectado"));
bot.on("kicked", (reason) => {
  console.log("🤔 Bot fue expulsado:", reason);
});
bot.on("login", () => console.log("🔐 Login correcto"));
bot.on("message", (msg) => console.log("💬 Chat:", msg.toString()));

