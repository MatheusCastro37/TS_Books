import { Book } from "../../models/book";
import { HttpResponse } from "../protocols";
import {
  IBookDetails,
  ICreateBookController,
  ICreateBookRepository,
} from "./protocols";

export class CreateBookController implements ICreateBookController {
  constructor(private readonly createBookRepository: ICreateBookRepository) {}
  async handle(
    bookDetails: IBookDetails
  ): Promise<HttpResponse<Book | string>> {
    const { author, name, publication_date } = bookDetails;

    if (!author) {
      return {
        statusCode: 400,
        body: "author is required!",
      };
    }

    if (!name) {
      return {
        statusCode: 400,
        body: "name book is required!",
      };
    }

    if (!publication_date) {
      return {
        statusCode: 400,
        body: "publication date is required!",
      };
    }

    const body = await this.createBookRepository.createBook(bookDetails);

    return {
      statusCode: 200,
      body,
    };
  }
}
