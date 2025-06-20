const http = require('http');

console.log("Starting server...");

const server = http.createServer((req, res) => {
  console.log("Request received:");
  console.log("Method:", req.method);
  console.log("URL:", req.url);

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!\n');
});

const port = 3001;
server.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
 