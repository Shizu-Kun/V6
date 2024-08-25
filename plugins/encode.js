/*
made by ❤️ @khaelll
jgn hps wm njr
msih pemula puh
*/


import JavaScriptObfuscator from 'javascript-obfuscator';

let handler = async (m, { conn, text }) => {

    if (!text) {
        conn.reply(m.chat, 'Teks tidak boleh kosong! Silakan kirim teks untuk diobfuscate.', m);
        return;
    }

    let obfuscatedText = JavaScriptObfuscator.obfuscate(text, {
        compact: true,
        controlFlowFlattening: true,
        deadCodeInjection: true,
        debugProtection: false,
        debugProtectionInterval: false,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        renameGlobals: false,
        rotateStringArray: true,
        selfDefending: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.75,
        transformObjectKeys: true,
        unicodeEscapeSequence: false
    }).getObfuscatedCode();

    conn.reply(m.chat, obfuscatedText, m);
}

handler.help = ['encode'].map(v => v + ' <teks>')
handler.tags = ['tools']
handler.command = /^(encode|obfuscator)$/i

export default handler