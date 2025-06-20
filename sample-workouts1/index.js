const fs = require("fs");
const os = require("os");

var osInfo = os.userInfo();
console.log("Username " +  osInfo.username);

fs.appendFile("log.txt", "Hello, Node.js\n", (err)=> {
if (err) {
    console.error("Error writing to file:", err);
  }
    else {
        console.log("Log entry added successfully!");
    }
})

console.log(process.argv[2]);