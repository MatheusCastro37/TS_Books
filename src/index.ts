import fastify, { FastifyRequest } from "fastify";
import "dotenv/config";
import { client } from "./database/mongo";
import { CreateBookController } from "./controllers/create-book/create-book";
import { CreateBookRepository } from "./repositories/create-book/create-book";

const server = fastify();

const port = process.env.PORT as number | undefined;

client.connect();

interface IBodyType {
  name: string;
  author: string;
  publication_date: string;
}

server.post(
  "/createBook",
  async (request: FastifyRequest<{ Body: IBodyType }>, reply) => {
    const mongoCreateRepository = new CreateBookRepository();

    const createBookController = new CreateBookController(
      mongoCreateRepository
    );

    const { statusCode, body } = await createBookController.handle(
      request.body
    );

    reply.code(statusCode).send(body);
  }
);

server.listen({ port: port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
