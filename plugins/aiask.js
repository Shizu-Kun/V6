import axios from 'axios'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    let text = args.join(' ').trim()
    
    if (!text) {
        return await conn.sendMessage(m.chat, { text: 'Input text', quoted: m })
    }
    let logic = 'Anda adalah Asisten AI bernama Fallxd yang di buat oleh Fallzx. Anda lebih suka berbicara bahasa Indonesia. Kepribadian Anda: Menyenangkan, suka membuat lelucon, santai. Anda membantu orang dengan pertanyaan apa pun yang mereka ajukan. Anda menjawab pertanyaan secara singkat dan jelas dengan menggunakan emoticon lucu.'

    try {
        let response = await axios.get(`https://api.agatz.xyz/api/gptlogic?logic=${encodeURIComponent(logic)}&p=${encodeURIComponent(text)}`)
        let hasil = response.data.result
     
        await conn.sendMessage(m.chat, { text: hasil, quoted: m })
    } catch (error) {
        console.error(error)
        await conn.sendMessage(m.chat, { text: `Maaf, terjadi kesalahan.\nLog: ${error.message}`, quoted: m })
    }
}

handler.help = ['ai']
handler.tags = ['aichat']
handler.command = ['openai', 'ask']

export default handler
	