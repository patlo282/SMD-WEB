const { makeid } = require('./gen-id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const { default: makeWASocket, useMultiFileAuthState, delay, Browsers, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys')

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;

    async function GIFTED_MD_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            // 🔹 Random Browser Selector
            const browserOptions = [
                Browsers.windows('Edge'),
                Browsers.windows('Chrome'),
                Browsers.macOS('Safari'),
                Browsers.macOS('Chrome'),
                Browsers.ubuntu('Firefox'),
                Browsers.ubuntu('Chrome'),
                Browsers.ubuntu('Opera')
            ];
            const randomBrowser = browserOptions[Math.floor(Math.random() * browserOptions.length)];

            let sock = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                generateHighQualityLinkPreview: true,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                syncFullHistory: false,
                browser: randomBrowser
            });

            if (!sock.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
function generateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

const custom = generateCode();
                const code = await sock.requestPairingCode(num, custom);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            sock.ev.on('creds.update', saveCreds);

            sock.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;

                if (connection == "open") {
                    await delay(5000);
                    let rf = __dirname + `/temp/${id}/creds.json`;

                    function generateRandomText() {
                        const prefix = "3EB";
                        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                        let randomText = prefix;
                        for (let i = prefix.length; i < 22; i++) {
                            const randomIndex = Math.floor(Math.random() * characters.length);
                            randomText += characters.charAt(randomIndex);
                        }
                        return randomText;
                    }
                    const randomText = generateRandomText();

                    try {
                        // 🔹 Base64 system with validation
                        if (!fs.existsSync(rf)) {
                            throw new Error("❌ creds.json not found after pairing!");
                        }

                        const fileBuffer = fs.readFileSync(rf);
                        const base64Data = fileBuffer.toString('base64');

                        // Debug checks
                        console.log("📦 Base64 Session Generated, Length:", base64Data.length);
                        if (base64Data.length < 500) {
                            console.log("⚠️ WARNING: Session looks incomplete, try pairing again!");
                        }

                        const decoded = Buffer.from(base64Data, 'base64').toString('utf-8');
                        if (!decoded.includes("noiseKey")) {
                            console.log("⚠️ WARNING: creds.json content corrupted or incomplete!");
                        } else {
                            console.log("✅ creds.json validated successfully.");
                        }

                        let md = "SMD~" + base64Data;
                        let code = await sock.sendMessage(sock.user.id, { text: md });

                        await sock.newsletterFollow("120363358310754973@newsletter");
                        await sock.newsletterFollow("120363421542539978@newsletter");
                        sock.newsletterUnmute("120363421542539978@newsletter");
                        await sock.newsletterUnmute("120363358310754973@newsletter");
                        await sock.newsletterFollow("120363421135776492@newsletter");
                        await sock.newsletterUnmute("120363421135776492@newsletter");
                        await sock.newsletterFollow("120363315182578784@newsletter");
                        await sock.newsletterFollow("120363336009581155@newsletter");

                        let desc = `*┏━━━━━━━━━━━━━━*
*┃SHABAN-MD SESSION IS*
*┃SUCCESSFULLY*
*┃CONNECTED ✅🔥*
*┗━━━━━━━━━━━━━━━*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❶ || Creator = MR SHABAN 👨🏻‍💻*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❷ || WhatsApp Channel =* https://whatsapp.com/channel/0029Vb6aq4cCHDygiEqJZl0S
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❸ || Owner =* MR SHABAN
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❹ || Repo =* https://github.com/MRSHABAN45/SHABAN-MD
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❺ || You Tube =* https://youtube.com/@mrshaban282?si=UzxrTKrBzDHa09a4
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*POWERD BY MR SHABAN*`;
                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: "MR SHABAN",
                                    thumbnailUrl: "https://i.ibb.co/FbyCnmMX/shaban-md.jpg",
                                    sourceUrl: "https://shaban.lovestoblog.com/",
                                    mediaType: 1,
                                    renderLargerThumbnail: true
                                }
                            }
                        },
                        { quoted: code });

                    } catch (e) {
                        let ddd = sock.sendMessage(sock.user.id, { text: e.toString() });
                        let desc = `*┏━━━━━━━━━━━━━━*
*┃SHABAN-MD SESSION IS*
*┃SUCCESSFULLY*
*┃CONNECTED ✅🔥*
*┗━━━━━━━━━━━━━━━*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❶ || Creator = MR SHABAN 👨🏻‍💻*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❷ || WhatsApp Channel =* https://whatsapp.com/channel/0029Vb6aq4cCHDygiEqJZl0S
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❸ || Owner =* MR SHABAN
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❹ || Repo =* https://github.com/MRSHABAN45/SHABAN-MD
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❺ || You Tube =* https://youtube.com/@mrshaban282?si=UzxrTKrBzDHa09a4
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*POWERD BY MR SHABAN*`;
                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: "MR SHABAN",
                                    thumbnailUrl: "https://i.ibb.co/FbyCnmMX/shaban-md.jpg",
                                    sourceUrl: "https://shaban.lovestoblog.com/",
                                    mediaType: 2,
                                    renderLargerThumbnail: true,
                                    showAdAttribution: true
                                }
                            }
                        },
                        { quoted: ddd });
                    }

                    await delay(10);
                    await sock.ws.close();
                    await removeFile('./temp/' + id);
                    console.log(`👤 ${sock.user.id} Connected ✅ Restarting process...`);
                    await delay(10);
                    process.exit();

                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10);
                    GIFTED_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "❗ Service Unavailable" });
            }
        }
    }
    return await GIFTED_MD_PAIR_CODE();
});

module.exports = router;
