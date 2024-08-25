/**
By: FuadXyro
Sumber: https://whatsapp.com/channel/0029Vai9MMj5vKABWrYzIJ2Z
*Note ( ! ):* run di tempat yang support launch
*/
import puppeteer from 'puppeteer'

let handler = async (m, { args }) => {
 const name = args.join(" ")
   const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto('https://oshi-fall.vercel.app')
    await page.type('#nameInput', name)
    await page.click('#cekButton')

    await page.waitForSelector('#oshiName')
    const oshiName = await page.$eval('#oshiName', el => el.innerText)
    const imageUrl = await page.$eval('#oshiImage', el => el.src)
    await browser.close()
    await conn.sendFile(m.chat, imageUrl, 'image.jpg', `Nama: ${name}\nOshi: ${oshiName}`, m)
}

handler.help = ['cekoshi *(nama)*']
handler.tags = ['fun']
handler.command = ['cekoshi']
handler.limit = true

export default handler