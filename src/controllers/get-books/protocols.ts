import { Book } from "../../models/book";

export interface IGetBooksRepository {
  getBooks(): Promise<Book[]>;
}
