const router = new Bun.FileSystemRouter({
  style: "nextjs",
  dir: "./pages",
  origin: "https://mydomain.com",
  assetPrefix: "_next/static",
});

const server = Bun.serve({
  port: 3000,
  error(error) {
    return new Response(`<pre>${error}\n${error.stack}</pre>`, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
  fetch(req) {
    router.match(req);

    return new Response("Bun");
  },
  websocket: {
    // Called when a message is received
    async message(ws, message) {
      console.log(`Received ${message}`);

      ws.send(`Only nerds say: ${message}`);
    },
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
