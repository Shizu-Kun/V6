// HALO TERIMA TELAH MENGGUNAKAN BOT ZEE MD. SUPPORT FALL SELALU YA. 

// TERIMAKASIH JUGA KEPADA 
// - FallXdz
// - Shizo The Teachie (NewZealand)
// - DAN PENYEDIA REST API 
// - SERTA PARA SUBSCRIBE DAN FOLL SALURAN WHATSAPP KU. 

// LINK CH : https://whatsapp.com/channel/0029VaBOlsv002TEjlntTE2D

// ---------- CREDIT JANGAN DIHAPUS -------- //
let axios = (await import('axios')) 
let cheerio = (await import('cheerio'))
let handler = async (m, { conn, usedPrefix, command, text }) => {
  if(!text) throw `Use ${usedPrefix + command} [!url]`
  conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
try {
  let response = await axios.get(text) 
  let $ = cheerio.load(response.data) 
  let videoSrc = $('source[type="video/mp4"]').attr('src') 
  conn.sendFile(m.chat, videoSrc, 'videy.mp4', '', m)
 } catch (e) {
    console.log(e)
    m.reply('failed') 
  }
}
handler.help = ['videy']
handler.tags = ['downloader']
handler.command = /^(videy)$/i
export default handler
/*
dosa tanggung sendiri
*/