
/*
 * @Wm By Indra
 * https://whatsapp.com/channel/0029VaYVlVP9hXF9Ig83hJ3L
 * Don't Delete My Wm
 */

const fetch = require('node-fetch');
let { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@whiskeysockets/baileys");

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        conn.sendPresenceUpdate("composing", m.chat);
        return conn.reply(m.chat, `Masukan URL!\n\ncontoh:\n${usedPrefix + command} https://www.capcut.com/template-detail/7273798219329441025?template_id=7273798219329441025&share_token=1ea9b68c-aa1b-4fc4-86c2-bf2b9136b6e0&enter_from=template_detail&region=ID&language=in&platform=copy_link&is_copy_link=1`, m);
    }

    if (!args[0].match(/capcut/gi)) {
        return conn.reply(m.chat, 'URL Tidak Ditemukan!', m);
    }

    await m.react('🕒');
    m.reply('*Mohon tunggu..*');

    try {
        const response = await fetch(`https://api.betabotz.eu.org/api/download/capcut?url=${args[0]}&apikey=${global.btc}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const res = await response.json();
        const { video_ori, title, digunakan, cover, author_profile } = res.result;

        let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({}),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: `Title: ${title}\nUkuran: ${digunakan}`
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            title: title,
                            hasMediaAttachment: true, 
                            ...(await prepareWAMessageMedia({ video: { url: video_ori } }, { upload: conn.waUploadToServer }))
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: [
                                {
                                    name: "quick_reply",
                                    buttonParamsJson: `{"display_text":"Download Audio","id": ".cca ${args[0]}"}`
                                },
                                {
                                    name: "quick_reply",
                                    buttonParamsJson: `{"display_text":"Foto thumbnail","id": ".get ${cover}"}`
                                },
                                {
                                    name: "quick_reply",
                                    buttonParamsJson: `{"display_text":"Foto Profile","id": ".get ${author_profile}"}`
                                }
                            ],
                        })
                    })
                }
            }
        }, { userJid: m.chat, quoted: m });

        conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });

    } catch (e) {
        console.log(e);
        throw 'Terjadi Kesalahan!';
    }
};

handler.help = ['capcut', 'cc', 'capcutdl', 'ccdl'].map(v => v + ' *<url>*');
handler.tags = ['downloader'];
handler.command = /^(capcut|cc|capcutdl|ccdl)$/i;
handler.limit = true;
handler.group = false;

module.exports = handler;