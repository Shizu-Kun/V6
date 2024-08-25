// HALO TERIMA TELAH MENGGUNAKAN BOT ZEE MD. SUPPORT FALL SELALU YA. 

// TERIMAKASIH JUGA KEPADA 
// - FallXdz
// - Shizo The Teachie (NewZealand)
// - DAN PENYEDIA REST API 
// - SERTA PARA SUBSCRIBE DAN FOLL SALURAN WHATSAPP KU. 

// LINK CH : https://whatsapp.com/channel/0029VaBOlsv002TEjlntTE2D

// ---------- CREDIT JANGAN DIHAPUS -------- //
console.clear();
import fs from 'fs'
import {
  join,
  dirname
} from 'path'
import {
  createRequire
} from "module";
import {
  fileURLToPath
} from 'url'
import {
  setupMaster,
  fork
} from 'cluster'
import {
  watchFile,
  unwatchFile
} from 'fs'
import cfonts from 'cfonts';
import chalk from "chalk"
import {
  createInterface
} from 'readline'
import yargs from 'yargs'
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)
const {
  name,
  author
} = require(join(__dirname, './package.json'))
const {
  say
} = cfonts
const rl = createInterface(process.stdin, process.stdout)
console.log('Zee MD is starting 🚀')
say('Z̷e̷e̷-̷M̷u̷l̷t̷i̷D̷e̷v̷i̷c̷e̷', {
  font: 'chrome',
  align: 'center',
  gradient: ['red', 'magenta']})
say(`Si Gadis Tomboy Yang Semangat nya Meletup-letup`, {
  font: 'console',
  align: 'center',
  gradient: ['red', 'magenta']})

var isRunning = false
/**
* Start a js file
* @param {String} file `path/to/file`
*/
function start(file) {
  if (isRunning) return
  isRunning = true
  let args = [join(__dirname, file),
    ...process.argv.slice(2)]

  setupMaster({
    exec: args[0],
    args: args.slice(1),
  })
  let p = fork()
  p.on('message', data => {
    switch (data) {
      case 'reset':
        p.process.kill()
        isRunning = false
        start.apply(this, arguments)
        break
      case 'uptime':
        p.send(process.uptime())
        break
    }})
  p.on('exit', (_, code) => {
    isRunning = false
    console.error('⚠️ Unexpected error ⚠️', code)

    p.process.kill()
    isRunning = false
    start.apply(this, arguments)

    if (process.env.pm_id) {
      process.exit(1)
    } else {
      process.exit()
    }
  })
  let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
  if (!opts['test'])
    if (!rl.listenerCount()) rl.on('line', line => {
    p.emit('message', line.trim())})}
start('main.js')