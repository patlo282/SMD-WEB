import { makeid } from './gen-id.js';
import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pino from "pino";
import makeWASocket from '@whiskeysockets/baileys';
import { useMultiFileAuthState, delay, Browsers } from '@whiskeysockets/baileys';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let router = express.Router();

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
                auth: state, // 🔹 DIRECT STATE USE KAREN - makeCacheableSignalKeyStore hata den
                printQRInTerminal: false,
                generateHighQualityLinkPreview: true,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                syncFullHistory: false,
                browser: randomBrowser
            });

            if (!sock.authState.creds.registered) {
                await delay(1500);
                if (num) {
                    num = num.replace(/[^0-9]/g, '');
                    try {
                        const code = await sock.requestPairingCode(num);
                        if (!res.headersSent) {
                            await res.send({ code });
                        }
                    } catch (pairError) {
                        console.error('❌ Pairing error:', pairError);
                        if (!res.headersSent) {
                            await res.send({ error: 'Pairing failed' });
                        }
                    }
                }
            }

            sock.ev.on('creds.update', saveCreds);

            sock.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect, qr } = s;

                // 🔹 QR CODE SHOW KARNE KA LOGIC ADD KAREN
                if (qr && !res.headersSent) {
                    try {
                        const QRCode = await import('qrcode');
                        const qrBuffer = await QRCode.default.toBuffer(qr);
                        res.setHeader('Content-Type', 'image/png');
                        res.end(qrBuffer);
                        console.log('✅ QR Code sent to browser');
                    } catch (qrError) {
                        console.error('❌ QR Generation error:', qrError);
                    }
                }

                if (connection == "open") {
                    await delay(5000);
                    let rf = __dirname + `/temp/${id}/creds.json`;

                    try {
                        // 🔹 Base64 system with validation
                        if (!fs.existsSync(rf)) {
                            throw new Error("❌ creds.json not found after pairing!");
                        }

                        const fileBuffer = fs.readFileSync(rf);
                        const base64Data = fileBuffer.toString('base64');

                        console.log("📦 Base64 Session Generated, Length:", base64Data.length);
                        
                        // Validate session
                        const decoded = Buffer.from(base64Data, 'base64').toString('utf-8');
                        if (!decoded.includes("noiseKey")) {
                            console.log("⚠️ WARNING: Session incomplete!");
                        } else {
                            console.log("✅ Session validated successfully.");
                        }

                        let md = "SMD~" + base64Data;
                        let codeMsg = await sock.sendMessage(sock.user.id, { text: md });

                        // Newsletter follows (optional - agar error de toh comment karen)
                        try {
                            await sock.newsletterFollow("120363358310754973@newsletter");
                            await sock.newsletterFollow("120363421542539978@newsletter");
                            // ... rest of newsletter code
                        } catch (newsError) {
                            console.log('⚠️ Newsletter error (ignoring):', newsError.message);
                        }

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
                        }, { quoted: codeMsg });

                    } catch (e) {
                        console.error('❌ Session send error:', e);
                        try {
                            let ddd = await sock.sendMessage(sock.user.id, { text: e.toString() });
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
                            }, { quoted: ddd });
                        } catch (finalError) {
                            console.error('❌ Final error:', finalError);
                        }
                    }

                    await delay(100);
                    try {
                        await sock.ws.close();
                    } catch (closeError) {
                        console.log('⚠️ Close error:', closeError.message);
                    }
                    await removeFile('./temp/' + id);
                    console.log(`👤 ${sock.user.id} Connected ✅ Restarting process...`);
                    await delay(100);
                    process.exit();

                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    console.log('🔁 Reconnecting...');
                    await delay(10000);
                    GIFTED_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("❌ Service restarted due to error:", err.message);
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "Service restarting..." });
            }
        }
    }
    
    return await GIFTED_MD_PAIR_CODE();
});

export default router;
