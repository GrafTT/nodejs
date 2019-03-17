const server = require("http").createServer();

server.on("request", (req, res) => {
  req.pipe(res);
});

server.listen(8080);
