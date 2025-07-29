const mineflayer = require("mineflayer");
const { pathfinder, Movements } = require("mineflayer-pathfinder");
const pvp = require("mineflayer-pvp").plugin;
const autoeat = require("mineflayer-auto-eat").plugin;
const express = require("express");

const app = express();
const PORT = process.env.PORT || 10000;
app.get("/", (req, res) => res.send("Bot de Jabs está activo 🚀"));
app.listen(PORT, () => console.log(`🌐 Web activa en el puerto ${PORT}`));

const config = {
  host: "Itzzrealserver.aternos.me",
  port: 50983,
  username: "Servercito_24h_2",
  auth: "offline",
  version: "1.20.4",
};

let bot;

function iniciarBot() {
  bot = mineflayer.createBot(config);

  bot.loadPlugin(pathfinder);
  bot.loadPlugin(pvp);
  bot.loadPlugin(autoeat);

  bot.once("spawn", () => {
    console.log("✅ Bot conectado");
    bot.chat("¡Listo para Mantener el Server!");

    const mcData = require("minecraft-data")(bot.version);
    const movements = new Movements(bot, mcData);
    bot.pathfinder.setMovements(movements);

    patrullar();
    setInterval(detectarEnemigos, 3000);
  });

  function patrullar() {
    if (!bot.pvp.target) {
      bot.setControlState("forward", true);
      bot.setControlState("jump", true);

      setTimeout(() => {
        bot.setControlState("forward", false);
        bot.setControlState("jump", false);

        const nuevoYaw = bot.entity.yaw + Math.PI;
        bot.look(nuevoYaw, 0, true);

        setTimeout(patrullar, 2000);
      }, 5000);
    }
  }

  function detectarEnemigos() {
    if (bot.health < 8) {
      bot.chat("¡Ayuda! ¡Me estoy curando!");
      return;
    }

    const hostileMobs = ["zombie", "skeleton", "creeper", "spider", "witch"];
    const target = bot.nearestEntity(
      (e) => e.type === "mob" && hostileMobs.includes(e.name)
    );

    if (target) {
      bot.chat(`⚔️ Atacando a ${target.name}`);
      bot.pvp.attack(target);
    } else {
      bot.pvp.stop();
    }
  }

  // 🍗 Configuración del auto-eat
  bot.on("autoeat_enabled", () => {
    console.log("🍗 Auto-eat activado");
  });

  bot.on("autoeat_disabled", () => {
    console.log("❌ Auto-eat desactivado");
  });

  bot.on("health", () => {
    if (bot.health <= 10) {
      bot.autoEat.options.priority = "foodPoints";
      bot.autoEat.enable();
    } else {
      bot.autoEat.disable();
    }
  });

  bot.on("error", (err) => {
    console.log("❌ Error:", err);
  });

  bot.on("end", () => {
    console.log("🚫 Bot desconectado. Reiniciando en 10s...");
    setTimeout(() => process.exit(1), 10000);
  });

  bot.on("kicked", (reason) => {
    console.log("🤔 Bot fue expulsado:", reason);
  });

  bot.on("login", () => console.log("🔐 Login correcto"));
  bot.on("message", (msg) => console.log("💬 Chat:", msg.toString()));
}

iniciarBot();

