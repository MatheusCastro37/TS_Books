import { Book } from "../../models/book";
import { HttpResponse } from "../protocols";
import { IGetBooksController, IGetBooksRepository } from "./protocols";

export class GetBooksController implements IGetBooksController {
  constructor(private readonly getBooksRepository: IGetBooksRepository) {}

  async handle(): Promise<HttpResponse<Book[]>> {
    const books = await this.getBooksRepository.getBooks();

    return {
      statusCode: 200,
      body: books,
    };
  }
}
