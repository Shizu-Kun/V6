import sharp from 'sharp';

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted;
  if (!q) {
    return m.reply(`*[ ⚠️ ] Usage*\n${usedPrefix + command} <reply to an image>\n\n*HANYA BISA REPLY*`);
  }

  let mime = (q.msg || q).mimetype || '';

  if (!mime.startsWith('image/')) {
    return m.reply(`*[ ⚠️ ] Usage*\n${usedPrefix + command} <reply to an image>\n\n*HANYA BISA REPLY*`);
  }
  try {
    // Download gambar
    let media = await q.download();
    console.log('Media downloaded successfully.');

    // memuat gambar dengan sharp
    const image = sharp(media);

    // mendapatkan metadata gambar
    const metadata = await image.metadata();

    // naikin dimensi
    const newWidth = metadata.width * 4;
    const newHeight = metadata.height * 4;

    image.resize(newWidth, newHeight);

    // effect to enhance sharpness
    image.sharpen();

    // JPEG format with 80% quality
    const buffer = await image.jpeg({ quality: 80 }).toBuffer();

    // Send the enhanced image as a file with the caption "Ini Foto HD nya kak"
    conn.sendFile(m.chat, buffer, 'enhanced_image.jpg', 'Ini Foto HD nya kak', m);
    console.log('Enhanced image sent to user.');
  } catch (error) {
    console.error('Error in enhancing:', error);
    m.reply('Failed to enhance the image.');
  }
};

handler.help = ['hade <reply to an image>'];
handler.tags = ['tools'];
handler.command = /^(hade|hd2|jernih2)$/i;

export default handler;