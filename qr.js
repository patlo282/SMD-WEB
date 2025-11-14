import { makeid } from './gen-id.js';
import express from 'express';
import QRCode from 'qrcode';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pino from "pino";
import makeWASocket from "@whiskeysockets/baileys";
import { useMultiFileAuthState, delay, Browsers } from "@whiskeysockets/baileys";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let router = express.Router();

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let responseSent = false;
    
    async function GIFTED_MD_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        
        try {
            let sock = makeWASocket({
                auth: state,
                printQRInTerminal: false,
                logger: pino({ level: "silent" }),
                browser: Browsers.macOS("Desktop"),
            });
            
            sock.ev.on('creds.update', saveCreds);
            
            sock.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect, qr } = s;
                
                // 🔹 QR CODE HANDLING - RESPONSE ALREADY SEND NA HO
                if (qr && !responseSent) {
                    try {
                        const qrBuffer = await QRCode.toBuffer(qr);
                        res.setHeader('Content-Type', 'image/png');
                        res.end(qrBuffer);
                        responseSent = true;
                        console.log('✅ QR Code sent to browser');
                    } catch (qrError) {
                        console.error('❌ QR Generation error:', qrError);
                        if (!responseSent) {
                            res.status(500).send('QR Generation Failed');
                            responseSent = true;
                        }
                    }
                }
                
                if (connection == "open") {
                    console.log('✅ WhatsApp Connected!');
                    await delay(3000);
                    let rf = __dirname + `/temp/${id}/creds.json`;
                    
                    try {
                        // 🔹 DIRECT BASE64 SYSTEM
                        if (!fs.existsSync(rf)) {
                            throw new Error("❌ creds.json not found!");
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

                        // 🔹 DIRECT BASE64 SESSION ID
                        let md = "SHABAN-MD~" + base64Data;
                        let codeMsg = await sock.sendMessage(sock.user.id, { text: md });
                        
                        let desc = `*┏━━━━━━━━━━━━━━*
*┃SHABAN-MD SESSION IS*
*┃SUCCESSFULLY*
*┃CONNECTED ✅🔥*
*┗━━━━━━━━━━━━━━━*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❶ || Creator = MR SHABAN⁴⁰👨🏻‍💻*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❷ || WhatsApp Channel =* https://whatsapp.com/channel/0029VazjYjoDDmFZTZ9Ech3O
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❸ || Owner =* https://wa.me/+923059395959
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❹ || Repo =* https://github.com/MRSHABAN40/SHABAN-MD-V5
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❺ || You Tube =* https://youtube.com/@mrshaban282?si=UzxrTKrBzDHa09a4
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*💙POWERD BY MR SHABAN⁴⁰💛*`;
                        
                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: "MR SHABAN⁴⁰",
                                    thumbnailUrl: "https://i.ibb.co/RT2k3nHG/shaban-md.jpg",
                                    sourceUrl: "https://whatsapp.com/channel/0029VazjYjoDDmFZTZ9Ech3O",
                                    mediaType: 1,
                                    renderLargerThumbnail: true
                                }  
                            }
                        }, { quoted: codeMsg });
                        
                    } catch (e) {
                        console.error("❌ Session error:", e);
                        try {
                            let errorMsg = await sock.sendMessage(sock.user.id, { text: "Error: " + e.message });
                            
                            let desc = `*┏━━━━━━━━━━━━━━*
*┃SHABAN-MD SESSION IS*
*┃SUCCESSFULLY*
*┃CONNECTED ✅🔥*
*┗━━━━━━━━━━━━━━━*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❶ || Creator = MR SHABAN⁴⁰👨🏻‍💻*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❷ || WhatsApp Channel =* https://whatsapp.com/channel/0029VazjYjoDDmFZTZ9Ech3O
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❸ || Owner =* https://wa.me/+923059395959
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❹ || Repo =* https://github.com/MRSHABAN40/SHABAN-MD-V5
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❺ || You Tube =* https://youtube.com/@mrshaban282?si=UzxrTKrBzDHa09a4
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*💙POWERD BY MR SHABAN⁴⁰💛*`;
                            
                            await sock.sendMessage(sock.user.id, {
                                text: desc,
                                contextInfo: {
                                    externalAdReply: {
                                        title: "MR SHABAN⁴⁰",
                                        thumbnailUrl: "https://i.ibb.co/RT2k3nHG/shaban-md.jpg",
                                        sourceUrl: "https://whatsapp.com/channel/0029VazjYjoDDmFZTZ9Ech3O",
                                        mediaType: 2,
                                        renderLargerThumbnail: true,
                                        showAdAttribution: true
                                    }  
                                }
                            }, { quoted: errorMsg });
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
                    console.log(`👤 ${sock.user.id} Connected ✅ Restarting...`);
                    await delay(100);
                    process.exit();
                    
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    console.log('🔁 Reconnecting...');
                    await delay(5000);
                    GIFTED_MD_PAIR_CODE();
                }
            });
            
        } catch (err) {
            console.log("❌ Service error:", err.message);
            await removeFile('./temp/' + id);
            if (!responseSent) {
                res.status(500).send("Service Error");
                responseSent = true;
            }
        }
    }
    
    await GIFTED_MD_PAIR_CODE();
});

// 🔹 AUTO RESTART REMOVE KAREN - PROBLEM CREATE KAR RAHA THA
// setInterval(() => {
//     console.log("☘️ 𝗥𝗲𝘀𝘁𝗮𝗿𝘁𝗶𝗻𝗴 𝗽𝗿𝗼𝗰𝗲𝘀𝘀...");
//     process.exit();
// }, 180000);

export default router;
