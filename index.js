const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const fs = require('fs');
const dateFormat = require('date-format');


//store authentication data to a file
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.initialize();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", () => {
  console.log("AUTHENTICATED");
});

client.on("ready", async function(){
     console.log("client is ready");
});

client.on("message", async function (msg) {
    if(msg.from === "120363084708306248@g.us"){
      console.log(msg);
      var timestamp = dateFormat('yyyyMMddhhmm', new Date())
      var directory = './media_files/'.concat(timestamp).concat('/');
      console.log(directory);
      var fileName; 
      if (msg.hasMedia && msg.type === "image") {
        const mediaData = await msg.downloadMedia();
        fileName = directory.concat(msg.id.id+".jpeg");
        writeIntoFile(mediaData.data , true,directory, fileName)      
      }else{
         fileName = directory.concat(msg.id.id+".txt");
        writeIntoFile(msg.body , false ,directory, fileName)      
      }
    }
   
});

function writeIntoFile(data, hasMedia, directory,fileName){
  console.log(fileName+"----------fileName");
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
  if(hasMedia){
    let bufferData = Buffer.from(data, 'base64');
    fs.writeFileSync(fileName, bufferData);
  }else{
    fs.writeFileSync(fileName, data);
  }
}