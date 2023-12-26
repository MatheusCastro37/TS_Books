import { Book } from "../../models/book";
import { HttpResponse } from "../protocols";

export interface IGetBooksRepository {
  getBooks(): Promise<Book[]>;
}

export interface IGetBooksController {
  handle(): Promise<HttpResponse<Book[]>>;
}
