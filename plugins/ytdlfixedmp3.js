// HALO TERIMA TELAH MENGGUNAKAN BOT ZEE MD. SUPPORT FALL SELALU YA. 

// TERIMAKASIH JUGA KEPADA 
// - FallXdz
// - Shizo The Teachie (NewZealand)
// - DAN PENYEDIA REST API 
// - SERTA PARA SUBSCRIBE DAN FOLL SALURAN WHATSAPP KU. 

// LINK CH : https://whatsapp.com/channel/0029VaBOlsv002TEjlntTE2D

// ---------- CREDIT JANGAN DIHAPUS -------- //
//Versi ytmp3
/*
SCRIPT BY © RAPIKZ
•• recode by YOUSOO
*/

var handler = async (m, { conn, text, usedPrefix }) => {
    if (!text) {
        throw 'Please provide a valid YouTube link!';
    }

    if (!text.includes('youtube.com') && !text.includes('youtu.be')) {
        conn.reply(m.chat, 'Link salah kocak. Masukin yang bener gausah ngawur', m);
        return;
    }

    try {
        var audioUrl;
        try {
            audioUrl = `https://widipe.com/downloadAudio?URL=${text}&videoName=ytdl`;
        } catch (e) {
            conn.reply(m.chat, 'Please wait...', m);
            audioUrl = `https://widipe.com/youtube?url=${text}&filter=audioonly&quality=highestaudio&contenttype=audio/mpeg`;
        }

        var caption = `∘ Url : ${text}\n∘ Sabar cik tw download audio. gak sabar download manual aja`;

        var pesan = conn.relayMessage(m.chat, {
            extendedTextMessage: {
                text: caption,
                contextInfo: {
                    externalAdReply: {
                        title: "Zee-MD",
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: "https://telegra.ph/file/5f3b1ff506d6b55729b42.mp4",
                        sourceUrl: 'https://youtu.be/A8Zy_H6QafI?si=Mj4i6sc2uetJm_xu'
                    }
                },
                mentions: [m.sender]
            }
        }, {});

        conn.sendMessage(m.chat, {
            audio: { url: audioUrl },
            mimetype: 'audio/mpeg',
            contextInfo: {
                externalAdReply: {
                    title: "Btw Tanggal 25 ",
                    body: "© Zee-MD ",
                    thumbnailUrl: "https://telegra.ph/file/5f3b1ff506d6b55729b42.mp4",
                    sourceUrl: 'https://youtu.be/A8Zy_H6QafI?si=Mj4i6sc2uetJm_xu',
                    mediaType: 1,
                    showAdAttribution: true,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });
    } catch (e) {
        conn.reply(m.chat, `*Error:* ${e.message}`, m);
    }
};

handler.help = ['ngeteh'];
handler.tags = ['downloader'];
handler.command = /^(ngeteh)$/i;
handler.limit = false;

export default handler;