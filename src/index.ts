import fastify from "fastify";
import "dotenv/config";

const server = fastify();

const port = process.env.PORT as number | undefined;

server.get("/ping", async (request, reply) => {
  return "pong?\n";
});

server.listen({ port: port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
