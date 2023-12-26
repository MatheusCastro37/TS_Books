import { Book } from "../../models/book";
import { HttpResponse } from "../protocols";

export interface IBookDetails {
  name: string;
  author: string;
  publication_date: string;
}

export interface ICreateBookController {
  handle(bookDetails: IBookDetails): Promise<HttpResponse<Book | string>>;
}

export interface ICreateBookRepository {
  createBook(bookDetails: IBookDetails): Promise<Book>;
}
