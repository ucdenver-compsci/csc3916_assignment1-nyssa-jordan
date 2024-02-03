const http = require("http");
const port = 8080;

http
  .createServer((req, res) => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT",
      "Access-Control-Max-Age": 2592000, // 30 days
      "Access-Control-Allow-Headers": "*",
      /** add other headers as per requirement */
    };

    if (req.method === "OPTIONS") {
      res.writeHead(204, headers);
      res.end();
      return;
    }

    if (["GET", "POST", "PUT"].indexOf(req.method) > -1) {
      res.writeHead(200, headers);
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.log(`==== ${req.method} ${req.url}`);
    console.log('> Headers');
        console.log(req.headers);

    console.log('> Body');
    console.log(body);

        res.write(body);
        res.end();
      });
      // res.end("Hello World");
      return;
    }

    res.writeHead(405, headers);
    res.end(`${req.method} is not allowed for the request.`);
  })
  .listen(port);
console.log("listening on port " + port);
