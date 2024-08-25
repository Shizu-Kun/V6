import puppeteer from 'puppeteer'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let [user, msg] = text.split("|").map(item => item.trim())
  if (!user || !msg) {
    throw `Contoh: ${usedPrefix + command} username|message`
  }

  try {
    const url = `https://ngl.link/${user}`
    const resultUrl = await sendNglMessage(url, msg)
    await m.reply(`Berhasil mengirim NGL ke *"${user}"*\nPesan: *"${msg}"*\nLihat hasil: ${resultUrl}`)
  } catch (err) {
    await m.reply(`Gagal mengirim pesan: ${err.message}`)
  }
}

handler.help = ["ngl"]
handler.tags = ["tools"]
handler.command = /^ngl$/i
export default handler

async function sendNglMessage(url, message) {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle2' })
  await page.type('textarea#question', message)
  await page.click('button[type="submit"]')
  await page.waitForTimeout(3000)
  const resultUrl = page.url()
  await browser.close()
  return resultUrl
}
