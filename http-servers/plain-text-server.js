const server = require("http").createServer();

server.on("request", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "plain/text"
  });
  res.end("Hello World");
});

server.listen(8080);
