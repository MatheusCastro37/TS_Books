import fastify, { FastifyRequest } from "fastify";
import "dotenv/config";
import { client } from "./database/mongo";
import { CreateBookController } from "./controllers/create-book/create-book";
import { CreateBookRepository } from "./repositories/create-book/create-book";
import { GetBooksRepository } from "./repositories/get-books/get-books";
import { GetBooksController } from "./controllers/get-books/get-books";

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
    const createBookRepository = new CreateBookRepository();

    const createBookController = new CreateBookController(createBookRepository);

    const { statusCode, body } = await createBookController.handle(
      request.body
    );

    reply.code(statusCode).send(body);
  }
);

server.get("/books", async (request, reply) => {
  const getBooksRepository = new GetBooksRepository();

  const getBooksController = new GetBooksController(getBooksRepository);

  const { statusCode, body } = await getBooksController.handle();

  reply.code(statusCode).send(body);
});

server.listen({ port: port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
