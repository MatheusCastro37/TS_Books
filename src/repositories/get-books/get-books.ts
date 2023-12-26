import { IGetBooksRepository } from "../../controllers/get-books/protocols";
import { Book } from "../../models/book";
import { db } from "../../database/mongo";

export class GetBooksRepository implements IGetBooksRepository {
  async getBooks(): Promise<Book[]> {
    const books = await db
      .collection<Omit<Book, "id">>("books")
      .find({})
      .toArray();

    return books.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
