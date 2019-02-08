const server = require("http").createServer();
const fs = require("fs");

server.on("request", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html"
  });
  // fs.createReadStream('index.html').pipe(res)
  const indexHtml = fs.readFileSync("index.html");
  res.end(indexHtml);
});

server.listen(8080);
